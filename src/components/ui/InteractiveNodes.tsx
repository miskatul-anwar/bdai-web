import React, { useEffect, useRef } from "react";
import { cn } from "../../lib/utils";

export const InteractiveNodes = ({
  children,
  className,
  containerClassName,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    let w = (canvas.width = parent.clientWidth);
    let h = (canvas.height = parent.clientHeight);

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile 
      ? Math.min(Math.floor((w * h) / 32000), 20)
      : Math.min(Math.floor((w * h) / 16000), 60);
    
    const connectionRadius = isMobile ? 200 : 350;
    const colors = ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"];
    const particles: Particle[] = [];

    // Pre-render particle textures for performance
    const particleTexture = document.createElement("canvas");
    const textureSize = 32;
    particleTexture.width = textureSize;
    particleTexture.height = textureSize;
    const tCtx = particleTexture.getContext("2d");
    if (tCtx) {
      const gradient = tCtx.createRadialGradient(
        textureSize * 0.4,
        textureSize * 0.4,
        0,
        textureSize * 0.5,
        textureSize * 0.5,
        textureSize * 0.5
      );
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.4, "rgba(255, 255, 255, 0.6)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      tCtx.fillStyle = gradient;
      tCtx.fillRect(0, 0, textureSize, textureSize);
    }

    class Particle {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      size: number;
      baseSize: number;
      color: string;

      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.z = Math.random() * 400;
        this.vx = (Math.random() - 0.5) * 0.02;
        this.vy = (Math.random() - 0.5) * 0.02;
        this.vz = (Math.random() - 0.5) * 0.02;
        this.baseSize = Math.random() * 8 + 4;
        this.size = this.baseSize;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.z += this.vz;

        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - this.x;
          const dy = mouseRef.current.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 250) {
            const force = (250 - dist) / 25000; // Increased force for more noticeable repulsion
            this.vx -= dx * force; 
            this.vy -= dy * force;
          }
        }

        const perspective = 400 / (400 + this.z);
        this.size = this.baseSize * perspective;

        // Wrap around with buffer
        const buffer = 50;
        if (this.x < -buffer) this.x = w + buffer;
        if (this.x > w + buffer) this.x = -buffer;
        if (this.y < -buffer) this.y = h + buffer;
        if (this.y > h + buffer) this.y = -buffer;
        
        if (this.z < 0 || this.z > 500) this.vz *= -1;

        // Add a tiny bit of base speed to prevent clumping
        this.vx *= 0.99;
        this.vy *= 0.99;
        
        // Ensure minimum motion
        const minSpeed = 0.05;
        if (Math.abs(this.vx) < minSpeed) this.vx += (Math.random() - 0.5) * 0.1;
        if (Math.abs(this.vy) < minSpeed) this.vy += (Math.random() - 0.5) * 0.1;
      }

      draw() {
        if (!ctx) return;
        const opacity = Math.max(0.2, 0.9 - this.z / 500);
        
        ctx.globalAlpha = opacity;
        ctx.drawImage(
          particleTexture, 
          this.x - this.size, 
          this.y - this.size, 
          this.size * 2, 
          this.size * 2
        );
        ctx.globalAlpha = 1.0;
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let animationId: number;
    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      particles.sort((a, b) => b.z - a.z);

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.update();
        p1.draw();

        const connectionRadiusSq = connectionRadius * connectionRadius;

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dz = p1.z - p2.z;
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < connectionRadiusSq) {
            const dist = Math.sqrt(distSq);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            
            const alpha = (1 - dist / connectionRadius) * 0.35;
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 1.2 * (400 / (400 + (p1.z + p2.z) / 2));
            ctx.stroke();
          }
        }

        if (mouseRef.current.active) {
            const dx = p1.x - mouseRef.current.x;
            const dy = p1.y - mouseRef.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 400) {
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
                const alpha = (1 - dist / 400) * 0.4;
                ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
                ctx.lineWidth = 1.5 * (400 / (400 + p1.z));
                ctx.stroke();
            }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!parent) return;
        w = canvas.width = parent.clientWidth;
        h = canvas.height = parent.clientHeight;
      }, 100);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
        mouseRef.current.active = false;
    };

    window.addEventListener("resize", handleResize);
    parent.addEventListener("mousemove", handleMouseMove);
    parent.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      parent.removeEventListener("mousemove", handleMouseMove);
      parent.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className={cn("relative w-full min-h-[95vh] flex flex-col items-center justify-center py-20 md:py-32 overflow-hidden", containerClassName)}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 w-full h-full pointer-events-none"
      />
      <div className={cn("relative z-10 w-full", className)}>{children}</div>
    </div>
  );
};
