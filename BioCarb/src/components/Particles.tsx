import { useEffect, useRef } from "react";

type P = { x: number; y: number; r: number; vx: number; vy: number; ph: number; c: string };

const CORES = ["#8A7450", "#6F5C3C", "#A58B5E", "#5B4B32", "#C2A676"];

/**
 * Sólidos em suspensão: partículas marrons que flutuam sobre a parte "turva" do site.
 * A opacidade cai conforme o visitante se aproxima da seção do carvão (#poros).
 */
export function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let parts: P[] = [];
    let raf = 0;
    let fade = 1;

    const seed = () => {
      const n = Math.round(Math.min(160, (w * h) / 9000));
      parts = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() < 0.12 ? 2.2 + Math.random() * 2.6 : 0.6 + Math.random() * 1.6,
        vx: (Math.random() - 0.5) * 0.12,
        vy: 0.05 + Math.random() * 0.22,
        ph: Math.random() * Math.PI * 2,
        c: CORES[Math.floor(Math.random() * CORES.length)],
      }));
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const measureFade = () => {
      const alvo = document.getElementById("poros");
      if (!alvo) return;
      const topo = alvo.getBoundingClientRect().top + window.scrollY;
      const fim = Math.max(1, topo - window.innerHeight * 0.35);
      fade = 1 - Math.min(1, Math.max(0, window.scrollY / fim));
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      if (fade > 0.01) {
        for (const p of parts) {
          if (!reduce) {
            p.x += p.vx + Math.sin(t / 2400 + p.ph) * 0.08;
            p.y += p.vy;
            if (p.y > h + 6) {
              p.y = -6;
              p.x = Math.random() * w;
            }
            if (p.x < -6) p.x = w + 6;
            if (p.x > w + 6) p.x = -6;
          }
          ctx.globalAlpha = fade * (p.r > 2 ? 0.55 : 0.8);
          ctx.fillStyle = p.c;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      if (!reduce) raf = requestAnimationFrame(draw);
    };

    resize();
    measureFade();
    const onScroll = () => {
      measureFade();
      if (reduce) draw(0);
    };
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return <canvas ref={ref} className="particulas" aria-hidden="true" />;
}
