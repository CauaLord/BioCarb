import { motion, useScroll, useTransform, useReducedMotion, MotionValue } from "framer-motion";
import { useMemo, useRef } from "react";

function Caption({ p, de, ate, children }: { p: MotionValue<number>; de: number; ate: number; children: React.ReactNode }) {
  const opacity = useTransform(p, [de, de + 0.06, ate - 0.06, ate], [0, 1, 1, 0]);
  const y = useTransform(p, [de, de + 0.06, ate - 0.06, ate], [24, 0, 0, -24]);
  return (
    <motion.div className="poro-legenda" style={{ opacity, y }}>
      {children}
    </motion.div>
  );
}

function Quadras({ p }: { p: MotionValue<number> }) {
  const opacity = useTransform(p, [0.7, 0.8], [0, 1]);
  return (
    <motion.div className="quadras" style={{ opacity }} aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 110 50" className={i < 2 ? "quadra cheia" : "quadra faixa"}>
          <rect x="1" y="1" width="108" height="48" />
          <line x1="55" y1="1" x2="55" y2="49" />
          <line x1="1" y1="7" x2="109" y2="7" />
          <line x1="1" y1="43" x2="109" y2="43" />
          <line x1="25" y1="7" x2="25" y2="43" />
          <line x1="85" y1="7" x2="85" y2="43" />
          <line x1="25" y1="25" x2="85" y2="25" />
        </svg>
      ))}
    </motion.div>
  );
}

export function Pores() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const scale = useTransform(p, [0, 0.62], reduce ? [1, 1] : [1, 16]);
  const rotate = useTransform(p, [0, 0.62], reduce ? [0, 0] : [0, 28]);
  const grainOpacity = useTransform(p, [0.66, 0.76], [1, 0.12]);

  // Poros: círculos aninhados distribuídos de forma determinística
  const poros = useMemo(() => {
    const out: { x: number; y: number; r: number }[] = [];
    let seed = 11;
    const rnd = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    for (let i = 0; i < 70; i++) {
      const ang = rnd() * Math.PI * 2;
      const dist = Math.sqrt(rnd()) * 118;
      out.push({ x: 200 + Math.cos(ang) * dist, y: 200 + Math.sin(ang) * dist * 0.82, r: 2 + rnd() * 9 });
    }
    return out;
  }, []);

  return (
    <section className="poros" id="poros" ref={ref} aria-labelledby="poros-titulo">
      <div className="poros-palco">
        <h2 id="poros-titulo" className="sr-only">
          O que acontece dentro de um grão de carvão ativado
        </h2>
        <motion.svg className="grao" viewBox="0 0 400 400" style={{ scale, rotate, opacity: grainOpacity }} aria-hidden="true">
          <path
            d="M92 150 C96 96 160 62 222 70 C290 78 338 120 334 188 C330 250 300 312 226 330 C160 346 96 312 76 254 C66 222 90 196 92 150 Z"
            fill="#2B2825"
          />
          {poros.map((o, i) => (
            <g key={i}>
              <circle cx={o.x} cy={o.y} r={o.r} fill="#141312" />
              <circle cx={o.x + o.r * 0.18} cy={o.y - o.r * 0.12} r={o.r * 0.55} fill="#0A0A09" />
              <circle cx={o.x + o.r * 0.28} cy={o.y - o.r * 0.2} r={o.r * 0.22} fill="#000" />
            </g>
          ))}
        </motion.svg>

        <div className="poros-textos">
          <Caption p={p} de={0} ate={0.3}>
            <p className="poro-grande">Isto é um grão de carvão ativado.</p>
            <p>Continue rolando. Vamos entrar nele.</p>
          </Caption>
          <Caption p={p} de={0.3} ate={0.66}>
            <p className="poro-grande">Por dentro, ele é quase todo buraco.</p>
            <p>
              São poros microscópicos, túneis dentro de túneis. Quando a água passa, os contaminantes grudam nas paredes desses poros e ficam
              ali. O nome disso é adsorção.
            </p>
          </Caption>
          <Caption p={p} de={0.66} ate={1.3}>
            <p className="poro-grande">Um grama pode ter de 500 a 1.500 m² de superfície interna.</p>
            <p>Dá de duas a cinco quadras de tênis escondidas em meia colher de chá.</p>
            <p className="poro-nota">
              Faixa típica da literatura para carvão ativado. A área do carvão da BioCarb vai ser medida por BET depois do lote piloto.
            </p>
            <Quadras p={p} />
          </Caption>
        </div>
      </div>
    </section>
  );
}
