import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../useReveal'

// Raw WebGL. A library would cost more than the effect is worth: three.js is
// 22MB unpacked for what amounts to one textured triangle and a fragment shader.

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`

const FRAG = `
precision mediump float;
uniform sampler2D uTex;
uniform vec2  uRes;
uniform vec2  uImg;       // natural texture size, for cover-fit
uniform vec2  uPointer;   // lerped, 0..1
uniform float uTime;
uniform float uEnter;     // 0..1 intro fade
uniform float uMode;      // 0 spotlight, 1 focus pull, 2 colour reveal
varying vec2 vUv;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float luma(vec3 c) { return dot(c, vec3(0.2126, 0.7152, 0.0722)); }

void main() {
  // background-size: cover, in the shader so the photo never stretches.
  float canvasA = uRes.x / uRes.y;
  float imgA    = uImg.x / uImg.y;
  vec2 uv = vUv;
  if (canvasA > imgA) {
    uv.y = (uv.y - 0.5) * (imgA / canvasA) + 0.5;
  } else {
    uv.x = (uv.x - 0.5) * (canvasA / imgA) + 0.5;
  }

  // Distance to the cursor, aspect-corrected so the falloff stays circular.
  vec2 toP = uv - uPointer;
  toP.x *= canvasA;
  float d = length(toP);

  // The pool of influence. Breathes very slightly so it feels alive at rest.
  float well = exp(-d * d * 5.2);
  well *= 0.92 + 0.08 * sin(uTime * 0.7);
  well *= uEnter;

  vec3 col;

  if (uMode < 0.5) {
    // ── 0. Spotlight. A key light that follows the cursor. ──
    col = texture2D(uTex, uv).rgb;
    col *= mix(0.60, 1.30, well);
    col = mix(col, col * vec3(1.12, 0.95, 0.88), well * 0.55);   // warm the light
    float l = luma(col);
    col = mix(vec3(l), col, mix(0.86, 1.20, well));              // lift saturation
  } else if (uMode < 1.5) {
    // ── 1. Focus pull. Sharp under the cursor, soft away from it. ──
    float r = (1.0 - well) * 0.0032;
    col = vec3(0.0);
    col += texture2D(uTex, uv).rgb * 0.22;
    col += texture2D(uTex, uv + vec2( r,  0.0)).rgb * 0.13;
    col += texture2D(uTex, uv + vec2(-r,  0.0)).rgb * 0.13;
    col += texture2D(uTex, uv + vec2(0.0,  r)).rgb * 0.13;
    col += texture2D(uTex, uv + vec2(0.0, -r)).rgb * 0.13;
    col += texture2D(uTex, uv + vec2( r,  r) * 0.72).rgb * 0.065;
    col += texture2D(uTex, uv + vec2(-r,  r) * 0.72).rgb * 0.065;
    col += texture2D(uTex, uv + vec2( r, -r) * 0.72).rgb * 0.065;
    col += texture2D(uTex, uv + vec2(-r, -r) * 0.72).rgb * 0.065;
    col *= mix(0.80, 1.10, well);
  } else {
    // ── 2. Colour reveal. Cool near-mono, true colour under the cursor. ──
    col = texture2D(uTex, uv).rgb;
    float l = luma(col);
    vec3 mono = vec3(l) * vec3(0.86, 0.89, 0.98);
    col = mix(mono, col, mix(0.10, 1.0, well));
    col *= mix(0.78, 1.16, well);
    col = mix(col, col * vec3(1.10, 0.94, 0.90), well * 0.4);
  }

  // Vignette, then grain. Both keep the left column legible.
  float vig = smoothstep(1.35, 0.28, length((vUv - 0.5) * vec2(canvasA, 1.0)));
  col *= mix(0.44, 1.0, vig);
  col += (hash(vUv * uRes + uTime) - 0.5) * 0.042;

  gl_FragColor = vec4(col, 1.0);
}`

// Cursor effect. Spotlight is the default: it changes lighting only, so the
// photo's geometry is never altered. ?fx=focus and ?fx=colour preview the
// alternatives on the live site without needing a deploy.
const MODES = { spotlight: 0, focus: 1, colour: 2 }
const DEFAULT_MODE = MODES.spotlight

function compile(gl, type, src) {
  const sh = gl.createShader(type)
  gl.shaderSource(sh, src)
  gl.compileShader(sh)
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error('shader compile failed:', gl.getShaderInfoLog(sh))
    gl.deleteShader(sh)
    return null
  }
  return sh
}

export default function HeroShader({ src = '/photos/hero.webp', fallbackSrc = '/photos/hero.png' }) {
  const canvasRef = useRef(null)
  const wrapRef = useRef(null)
  const [failed, setFailed] = useState(false)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    // Reduced motion never starts a loop. The photo still shows, via the
    // CSS layer underneath.
    if (reduced) return

    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return

    const gl = canvas.getContext('webgl', { antialias: false, alpha: false })
      || canvas.getContext('experimental-webgl', { antialias: false, alpha: false })
    if (!gl) { setFailed(true); return }

    const vs = compile(gl, gl.VERTEX_SHADER, VERT)
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG)
    if (!vs || !fs) { setFailed(true); return }

    const prog = gl.createProgram()
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error('program link failed:', gl.getProgramInfoLog(prog))
      setFailed(true)
      return
    }
    gl.useProgram(prog)

    // One triangle covering the viewport beats two for a full-screen pass.
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(prog, 'aPos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const U = {
      tex:     gl.getUniformLocation(prog, 'uTex'),
      res:     gl.getUniformLocation(prog, 'uRes'),
      img:     gl.getUniformLocation(prog, 'uImg'),
      pointer: gl.getUniformLocation(prog, 'uPointer'),
      time:    gl.getUniformLocation(prog, 'uTime'),
      enter:   gl.getUniformLocation(prog, 'uEnter'),
      mode:    gl.getUniformLocation(prog, 'uMode'),
    }

    const tex = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, tex)
    // 1px placeholder so the first frames have something bound.
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 1, 1, 0, gl.RGB, gl.UNSIGNED_BYTE,
      new Uint8Array([25, 26, 26]))
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.uniform1i(U.tex, 0)
    gl.uniform2f(U.img, 1, 1)

    let ready = false
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, tex)
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img)
      gl.uniform2f(U.img, img.naturalWidth, img.naturalHeight)
      ready = true
    }
    let triedFallback = false
    img.onerror = () => {
      if (!triedFallback && fallbackSrc) { triedFallback = true; img.src = fallbackSrc }
      else setFailed(true)
    }
    img.src = src

    // Pointer target and its lerped follower, so distortion trails the cursor.
    const target = { x: 0.5, y: 0.55 }
    const cur = { x: 0.5, y: 0.55 }
    const onMove = e => {
      const r = wrap.getBoundingClientRect()
      target.x = (e.clientX - r.left) / r.width
      target.y = 1 - (e.clientY - r.top) / r.height
    }
    const onLeave = () => { target.x = 0.5; target.y = 0.55 }
    wrap.addEventListener('pointermove', onMove, { passive: true })
    wrap.addEventListener('pointerleave', onLeave, { passive: true })

    let dpr = 1
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = Math.round(wrap.clientWidth * dpr)
      const h = Math.round(wrap.clientHeight * dpr)
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        gl.viewport(0, 0, w, h)
      }
    }
    resize()
    window.addEventListener('resize', resize)

    // Only render while the hero is actually on screen, and while the tab is
    // visible. No point warping a photo three sections above the fold.
    let onScreen = true
    const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting }, { threshold: 0 })
    io.observe(wrap)

    const mode = MODES[new URLSearchParams(window.location.search).get('fx')] ?? DEFAULT_MODE

    let raf = 0
    let enter = 0
    const t0 = performance.now()

    function frame(now) {
      raf = requestAnimationFrame(frame)
      if (!onScreen || document.hidden || !ready) return
      resize()
      cur.x += (target.x - cur.x) * 0.055
      cur.y += (target.y - cur.y) * 0.055
      enter = Math.min(1, enter + 0.012)
      gl.uniform2f(U.res, canvas.width, canvas.height)
      gl.uniform2f(U.pointer, cur.x, cur.y)
      gl.uniform1f(U.time, (now - t0) / 1000)
      gl.uniform1f(U.enter, enter)
      gl.uniform1f(U.mode, mode)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', resize)
      wrap.removeEventListener('pointermove', onMove)
      wrap.removeEventListener('pointerleave', onLeave)
      gl.deleteTexture(tex)
      gl.deleteBuffer(buf)
      gl.deleteProgram(prog)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
    }
  }, [src, fallbackSrc, reduced])

  const showCanvas = !reduced && !failed

  return (
    <div ref={wrapRef} style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {/* Always painted. It is the reduced-motion and no-WebGL fallback, and it
          gives the shader something to fade up over on slow connections. */}
      <div
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url('${fallbackSrc}')`,
        }}
      />
      <div
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: `image-set(url('${src}') type('image/webp'), url('${fallbackSrc}') type('image/png'))`,
          backgroundColor: '#191A1A',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      {showCanvas && (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
        />
      )}
      {/* Legibility scrim under the left column. */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(100deg, rgba(25,26,26,0.86) 0%, rgba(25,26,26,0.55) 34%, rgba(25,26,26,0.10) 62%, rgba(25,26,26,0.0) 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}

/*
  ── Video slot, for when the Signal → Action recording exists ────────────────
  Swap <HeroShader /> for <HeroVideo /> in Hero.jsx. hero.png is the poster, so
  the first paint is identical and nothing shifts.

  export function HeroVideo({ src = '/media/signal-to-action.mp4' }) {
    return (
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <video
          autoPlay muted loop playsInline preload="none"
          poster="/photos/hero.webp"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        >
          <source src={src} type="video/mp4" />
        </video>
      </div>
    )
  }
*/
