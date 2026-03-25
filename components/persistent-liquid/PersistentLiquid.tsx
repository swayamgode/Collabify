"use client";

import { useEffect, useRef } from "react";

export default function PersistentLiquid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorFollowerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;
    
    // Store particle data
    type Particle = { x: number, y: number, vx: number, vy: number, r: number, ox: number, oy: number };
    const particles: Particle[] = [];
    const numParticles = 70;

    for(let i=0; i<numParticles; i++) {
        const angle = Math.random() * Math.PI * 2;
        particles.push({
            x: -10000, // offscreen
            y: -10000,
            vx: 0, vy: 0,
            r: Math.random() * 45 + 50,
            ox: Math.cos(angle) * Math.sqrt(Math.random()) * 220, 
            oy: Math.sin(angle) * Math.sqrt(Math.random()) * 220
        });
    }
    
    const resize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      if (width === 0) return; // Wait for real layout
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    
    resize();
    window.addEventListener("resize", resize);

    let mouseX = 0;
    let mouseY = 0;
    let isMouseIn = false;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const targetX = e.clientX - rect.left;
      const targetY = e.clientY - rect.top;
      mouseX = targetX;
      mouseY = targetY;
      
      if (cursorFollowerRef.current) {
         cursorFollowerRef.current.style.transform = `translate(${targetX}px, ${targetY}px) translate(-50%, -50%) scale(1)`;
      }
    };

    const handleMouseLeave = () => {
      isMouseIn = false;
      if (cursorFollowerRef.current) {
         cursorFollowerRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%) scale(0)`;
      }
    };

    const handleMouseEnter = () => {
        isMouseIn = true;
    };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("mouseenter", handleMouseEnter);

    let rafId: number;
    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.03;

      if (width === 0) {
         rafId = requestAnimationFrame(render);
         return;
      }

      const anchorX = width * 0.70; // Shifted right to make room for 3D can
      const anchorY = height * 0.5;

      for(let i=0; i<particles.length; i++) {
          const p = particles[i];

          // Initialize instantly if uninitialized
          if (p.x === -10000) {
             p.x = anchorX + p.ox;
             p.y = anchorY + p.oy;
          }
          
          // 1. Spring back to default shape (with subtle organic breathing)
          const homeX = anchorX + p.ox + Math.sin(time + p.oy * 0.05) * 15;
          const homeY = anchorY + p.oy + Math.cos(time + p.ox * 0.05) * 15;
          
          p.vx += (homeX - p.x) * 0.035; 
          p.vy += (homeY - p.y) * 0.035;

          // 2. Magnetic Mouse Interaction (Dense Sticky Pull)
          if (isMouseIn) {
              const dx = mouseX - p.x;
              const dy = mouseY - p.y;
              const dist = Math.sqrt(dx*dx + dy*dy);
              const maxPullDist = 350;
              if (dist < maxPullDist) {
                  const pullStrength = (1 - dist / maxPullDist) * 3.5;
                  p.vx += (dx / dist) * pullStrength;
                  p.vy += (dy / dist) * pullStrength;
              }
          }

          // 3. Keep particles clumped (Soft Body Collisions/Repulsion)
          for(let j=i+1; j<particles.length; j++) {
              const p2 = particles[j];
              const dx = p.x - p2.x;
              const dy = p.y - p2.y;
              const dist = Math.sqrt(dx*dx + dy*dy);
              const minDist = p.r + p2.r - 40; // Overlap allowance for density
              
              if (dist < minDist && dist > 0) {
                  const force = (minDist - dist) * 0.08;
                  const nx = (dx / dist) * force;
                  const ny = (dy / dist) * force;
                  p.vx += nx;
                  p.vy += ny;
                  p2.vx -= nx;
                  p2.vy -= ny;
              }
          }

          p.vx *= 0.75; // Thick viscosity damping
          p.vy *= 0.75;
          p.x += p.vx;
          p.y += p.vy;
      }

      const baseColorRGB = "255, 60, 150";

      // Draw Particles into a giant metaball structure
      particles.forEach((p) => {
         const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
         grad.addColorStop(0, `rgba(${baseColorRGB}, 1)`);
         grad.addColorStop(0.65, `rgba(${baseColorRGB}, 1)`); // Critical for solid filter output
         grad.addColorStop(1, `rgba(${baseColorRGB}, 0)`);
         
         ctx.fillStyle = grad;
         ctx.beginPath();
         ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
         ctx.fill();
         
         // Inner specular shine mapped slightly upward
         ctx.beginPath();
         ctx.arc(p.x, p.y - p.r * 0.35, p.r * 0.35, 0, Math.PI * 2);
         const shineGrad = ctx.createRadialGradient(p.x, p.y - p.r * 0.35, 0, p.x, p.y - p.r * 0.35, p.r * 0.35);
         shineGrad.addColorStop(0, "rgba(255, 255, 255, 0.2)");
         shineGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
         ctx.fillStyle = shineGrad;
         ctx.fill();
      });

      rafId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const textStyle: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "70%",
    transform: "translate(-50%, -50%)",
    fontSize: "clamp(4rem, 8vw, 7rem)",
    fontWeight: 900,
    fontFamily: "var(--font-hero, sans-serif)",
    whiteSpace: "nowrap",
    textAlign: "center",
    pointerEvents: "none",
  };

  return (
    <div ref={containerRef} style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "auto", overflow: "hidden" }}>
        
        {/* Spilled Can Image */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", backgroundColor: "#ffffff" }}>
            <img src="/spilled1.png" alt="Spilled Can" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>

        {/* Layer 1: Elastic Liquid Jelly */}
        <div style={{ 
            position: "absolute", inset: 0, zIndex: 1,
            filter: "url(#liquid-goo) drop-shadow(0px 20px 40px rgba(255, 60, 150, 0.4))",
            opacity: 0.60
        }}>
            <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", cursor: "none" }} />
        </div>

        {/* Layer 2: Text perfectly centered on the right-aligned liquid */}
        <div style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none" }}>
            <h2 style={{ ...textStyle, color: "#fff", mixBlendMode: "normal" }}>
                Let it flow.
            </h2>
        </div>

        <svg style={{ visibility: "hidden", position: "absolute", width: 0, height: 0 }}>
            <defs>
                <filter id="liquid-goo">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="25" result="blur" />
                    <feColorMatrix in="blur" mode="matrix" values="
                        1 0 0 0 0
                        0 1 0 0 0
                        0 0 1 0 0
                        0 0 0 70 -30" result="goo" />
                </filter>
            </defs>
        </svg>

        {/* Custom cursor follower */}
        <div ref={cursorFollowerRef} style={{
            position: "absolute", top: 0, left: 0, width: "150px", height: "150px", borderRadius: "50%",
            backgroundColor: "rgba(255, 60, 150, 0.25)", border: "2px solid rgba(255, 60, 150, 0.5)",
            backdropFilter: "blur(4px)",
            pointerEvents: "none", zIndex: 100, transform: "scale(0)", transition: "transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)"
        }} />
    </div>
  );
}
