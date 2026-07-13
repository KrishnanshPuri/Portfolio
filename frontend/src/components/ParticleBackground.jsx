import { useEffect, useRef } from "react"


export const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const count = Math.min(70, Math.floor(width / 22));
    const nodes = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
    }));

    const mouse = { x: -9999, y: -9999 };
    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        if (!prefersReduced) {
          n.x += n.vx;
          n.y += n.vy;
        }
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 255, 163, 0.55)";
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.strokeStyle = `rgba(0, 255, 163, ${0.12 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }

        const mdx = n.x - mouse.x;
        const mdy = n.y - mouse.y;
        const mdist = Math.hypot(mdx, mdy);
        if (mdist < 170) {
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(79, 70, 229, ${0.3 * (1 - mdist / 170)})`;
          ctx.lineWidth = 0.9;
          ctx.stroke();
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      data-testid="particle-canvas"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      aria-hidden="true"
    />
  );
};
