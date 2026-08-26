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
uniform float uEnter;     // 0..1 intro wipe
varying vec2 vUv;

// Cheap value noise. Good enough for a slow liquid warp; no texture lookup.
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

void main() {
  // background-size: cover, done in the shader so the photo never distorts.
  float canvasA = uRes.x / uRes.y;
  float imgA    = uImg.x / uImg.y;
  vec2 uv = vUv;
  if (canvasA > imgA) {
    float s = imgA / canvasA;
    uv.y = (uv.y - 0.5) * s + 0.5;
  } else {
    float s = canvasA / imgA;
    uv.x = (uv.x - 0.5) * s + 0.5;
  }

  // Slow ambient drift, so the image breathes even without a pointer.
  float t = uTime * 0.06;
  vec2 drift = vec2(
    noise(uv * 2.6 + vec2(t, 0.0)) - 0.5,
    noise(uv * 2.6 + vec2(0.0, t + 4.7)) - 0.5
  ) * 0.010;

  // Pointer well: displacement falls off with distance, strongest under cursor.
  vec2  toP  = uv - uPointer;
  toP.x *= canvasA;
  float d    = length(toP);
  float well = exp(-d * d * 9.0);
  vec2  push = normalize(toP + 1e-5) * well * 0.038
             * (0.65 + 0.35 * sin(uTime * 0.9 - d * 9.0));

  vec2 warped = uv + (drift + push) * uEnter;

  // Light chromatic split along the push, which reads as glass rather than blur.
  float split = well * 0.0018 * uEnter;
  vec3 col;
  col.r = texture2D(uTex, warped + vec2(split, 0.0)).r;
  col.g = texture2D(uTex, warped).g;
  col.b = texture2D(uTex, warped - vec2(split, 0.0)).b;

  // Coral lifts where the displacement is strongest, so the brand accent lives
  // in the motion and not only in the type.
  col = mix(col, col * vec3(1.26, 0.70, 0.63), well * 0.34 * uEnter);

  // Vignette, then grain. Keeps the left column legible over the photo.
  float vig = smoothstep(1.35, 0.28, length((vUv - 0.5) * vec2(canvasA, 1.0)));
  col *= mix(0.44, 1.0, vig);
  col += (hash(vUv * uRes + uTime) - 0.5) * 0.045;

  gl_FragColor = vec4(col, 1.0);
}`

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
