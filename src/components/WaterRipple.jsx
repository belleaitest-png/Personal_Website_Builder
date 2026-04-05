import { useEffect, useRef, useCallback } from 'react'

export default function WaterRipple({
  rippleColor = '#1a4a8a', speed = 2, damping = 0.96,
  backgroundColor = '#06111e', rippleSize = 3,
  autoRipple = true, autoRippleInterval = 2000,
}) {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const animationRef = useRef(0)
  const buffer1Ref = useRef(null)
  const buffer2Ref = useRef(null)
  const tempDataRef = useRef(null)

  const parseColor = useCallback((color) => {
    const canvas = document.createElement('canvas')
    canvas.width = 1; canvas.height = 1
    const ctx = canvas.getContext('2d')
    if (!ctx) return { r: 6, g: 17, b: 30 }
    ctx.fillStyle = color; ctx.fillRect(0, 0, 1, 1)
    const data = ctx.getImageData(0, 0, 1, 1).data
    return { r: data[0], g: data[1], b: data[2] }
  }, [])

  const initBuffers = useCallback((width, height) => {
    const size = width * height
    buffer1Ref.current = new Int16Array(size)
    buffer2Ref.current = new Int16Array(size)
  }, [])

  const createRipple = useCallback((x, y, size) => {
    const canvas = canvasRef.current
    if (!canvas || !buffer1Ref.current) return
    const { width, height } = canvas
    const buffer = buffer1Ref.current
    for (let j = -size; j <= size; j++) {
      for (let i = -size; i <= size; i++) {
        const px = Math.floor(x + i), py = Math.floor(y + j)
        if (px >= 0 && px < width && py >= 0 && py < height) {
          const dist = Math.sqrt(i * i + j * j)
          if (dist <= size) {
            const idx = py * width + px
            buffer[idx] = Math.min(buffer[idx] + Math.floor(500 * (1 - dist / size)), 1000)
          }
        }
      }
    }
  }, [])

  const processRipples = useCallback((width, height, damp) => {
    const b1 = buffer1Ref.current, b2 = buffer2Ref.current
    if (!b1 || !b2) return
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const i = y * width + x
        const val = (b1[i-1] + b1[i+1] + b1[i-width] + b1[i+width]) >> 1
        b2[i] = Math.floor((val - b2[i]) * damp)
      }
    }
    buffer1Ref.current = b2; buffer2Ref.current = b1
  }, [])

  const renderRipples = useCallback((width, height, color) => {
    const canvas = canvasRef.current, buffer = buffer1Ref.current, tempData = tempDataRef.current
    if (!canvas || !buffer || !tempData) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const data = tempData.data, bg = parseColor(backgroundColor)
    for (let i = 0; i < width * height; i++) {
      const x = i % width, y = Math.floor(i / width)
      let shade = 0
      if (x > 0 && x < width-1 && y > 0 && y < height-1)
        shade = (buffer[i-1] - buffer[i+1] + buffer[i-width] - buffer[i+width]) >> 3
      const idx = i * 4
      data[idx]   = Math.max(0, Math.min(255, bg.r + shade + (buffer[i] * color.r >> 8)))
      data[idx+1] = Math.max(0, Math.min(255, bg.g + shade + (buffer[i] * color.g >> 8)))
      data[idx+2] = Math.max(0, Math.min(255, bg.b + shade + (buffer[i] * color.b >> 8)))
      data[idx+3] = 255
    }
    ctx.putImageData(tempData, 0, 0)
  }, [backgroundColor, parseColor])

  const handleInteraction = useCallback((e) => {
    const canvas = canvasRef.current; if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    createRipple(
      Math.floor((clientX - rect.left) * canvas.width / rect.width),
      Math.floor((clientY - rect.top) * canvas.height / rect.height),
      rippleSize
    )
  }, [createRipple, rippleSize])

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext('2d'); if (!ctx) return
    const container = containerRef.current
    if (container) { const r = container.getBoundingClientRect(); canvas.width = Math.floor(r.width); canvas.height = Math.floor(r.height) }
    const { width, height } = canvas
    initBuffers(width, height)
    tempDataRef.current = ctx.createImageData(width, height)
    const bg = parseColor(backgroundColor), data = tempDataRef.current.data
    for (let i = 0; i < width * height; i++) { const idx=i*4; data[idx]=bg.r; data[idx+1]=bg.g; data[idx+2]=bg.b; data[idx+3]=255 }
    ctx.putImageData(tempDataRef.current, 0, 0)
    let frame = 0; const color = parseColor(rippleColor)
    let timer = autoRipple ? setInterval(() => createRipple(Math.random()*width, Math.random()*height, rippleSize), autoRippleInterval) : null
    const animate = () => {
      frame++
      if (frame % (5 - Math.min(speed, 4)) === 0) { processRipples(width, height, damping); renderRipples(width, height, color) }
      animationRef.current = requestAnimationFrame(animate)
    }
    animate()
    return () => { cancelAnimationFrame(animationRef.current); if (timer) clearInterval(timer) }
  }, [initBuffers, processRipples, renderRipples, createRipple, damping, speed, rippleColor, backgroundColor, autoRipple, autoRippleInterval, parseColor, rippleSize])

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current, container = containerRef.current
      if (!canvas || !container) return
      const r = container.getBoundingClientRect()
      canvas.width = Math.floor(r.width); canvas.height = Math.floor(r.height)
      initBuffers(canvas.width, canvas.height)
      const ctx = canvas.getContext('2d')
      if (ctx) { tempDataRef.current = ctx.createImageData(canvas.width, canvas.height); const bg=parseColor(backgroundColor),data=tempDataRef.current.data; for(let i=0;i<canvas.width*canvas.height;i++){const idx=i*4;data[idx]=bg.r;data[idx+1]=bg.g;data[idx+2]=bg.b;data[idx+3]=255}; ctx.putImageData(tempDataRef.current,0,0) }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [initBuffers, backgroundColor, parseColor])

  return (
    <div ref={containerRef} style={{ width:'100%', height:'100%', position:'relative', overflow:'hidden', backgroundColor }}>
      <canvas ref={canvasRef} style={{ width:'100%', height:'100%', display:'block', cursor:'crosshair', touchAction:'none' }}
        onMouseDown={handleInteraction} onMouseMove={e => { if (e.buttons===1) handleInteraction(e) }}
        onTouchStart={handleInteraction} onTouchMove={handleInteraction} />
    </div>
  )
}
