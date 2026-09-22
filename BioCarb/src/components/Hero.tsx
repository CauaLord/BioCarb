import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

const linhas = ["O Espírito Santo", "joga fora o que", "compra de outro", "estado."];

function FilterColumn() {
  // Grãos de carvão gerados uma vez, com leve variação de forma
  const graos = useMemo(() => {
    const out: { x: number; y: number; r: number; rot: number; s: number }[] = [];
    let seed = 7;
    const rnd = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    for (let row = 0; row < 11; row++) {
      for (let col = 0; col < 9; col++) {
        out.push({
          x: 56 + col * 24 + (row % 2 ? 12 : 0) + (rnd() - 0.5) * 6,
          y: 262 + row * 17 + (rnd() - 0.5) * 5,
          r: 8 + rnd() * 4,
          rot: rnd() * 360,
          s: rnd(),
        });
      }
    }
    return out.filter((g) => g.x < 272);
  }, []);

  return (
    <svg className="coluna" viewBox="0 0 420 620" role="img" aria-label="Coluna de filtro: água turva em cima, leito de carvão no meio e água limpa saindo embaixo">
      <defs>
        <clipPath id="vidro">
          <rect x="40" y="40" width="240" height="470" rx="26" />
        </clipPath>
        <linearGradient id="turva" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8D7447" />
          <stop offset="1" stopColor="#6A5634" />
        </linearGradient>
        <linearGradient id="limpa" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#CFE3DD" />
          <stop offset="1" stopColor="#EAF2EF" />
        </linearGradient>
      </defs>

      <g clipPath="url(#vidro)">
        <rect x="40" y="40" width="240" height="470" fill="#2A241B" />
        {/* água turva com superfície ondulando */}
        <path className="onda" d="M40 92 Q80 82 120 92 T200 92 T280 92 T360 92 V256 H40 Z" fill="url(#turva)" />
        {Array.from({ length: 26 }).map((_, i) => (
          <circle
            key={i}
            className="solido"
            cx={52 + ((i * 37) % 220)}
            cy={110 + ((i * 53) % 130)}
            r={i % 5 === 0 ? 2.6 : 1.4}
            fill="#4B3C25"
            style={{ animationDelay: `${(i % 7) * -0.9}s` }}
          />
        ))}
        {/* leito de carvão */}
        <rect x="40" y="250" width="240" height="196" fill="#1D1B19" />
        {graos.map((g, i) => (
          <rect
            key={i}
            x={g.x - g.r}
            y={g.y - g.r * 0.7}
            width={g.r * 2}
            height={g.r * 1.4}
            rx={g.r * 0.45}
            transform={`rotate(${g.rot} ${g.x} ${g.y})`}
            fill={g.s > 0.66 ? "#34302B" : g.s > 0.33 ? "#2A2723" : "#3E3933"}
          />
        ))}
        {/* água limpa */}
        <rect x="40" y="446" width="240" height="64" fill="url(#limpa)" />
      </g>
      <rect x="40" y="40" width="240" height="470" rx="26" fill="none" stroke="#EFE6D6" strokeOpacity=".55" strokeWidth="2" />
      <path d="M150 510 V548 H170 V510" fill="none" stroke="#EFE6D6" strokeOpacity=".55" strokeWidth="2" />
      <circle className="gota" cx="160" cy="556" r="5" fill="#CFE3DD" />
      <circle className="gota g2" cx="160" cy="556" r="5" fill="#CFE3DD" />

      <text x="298" y="170" className="coluna-nota">água turva</text>
      <text x="298" y="350" className="coluna-nota">carvão ativado</text>
      <text x="298" y="482" className="coluna-nota">água limpa</text>
    </svg>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <header className="hero" id="inicio">
      <div className="hero-texto">
        <h1 className="hero-titulo">
          {linhas.map((l, i) => (
            <span className="linha" key={l}>
              <motion.span
                initial={reduce ? false : { y: "105%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.9, ease, delay: 0.25 + i * 0.12 }}
              >
                {l}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.95 }}
        >
          <p className="hero-lead">
            Fibra de coco e caroço de fruta vão para o lixo aqui, enquanto o carvão ativado que trata a nossa água chega de São Paulo e do Rio. A
            BioCarb quer fechar essa conta produzindo carvão ativado com esse resíduo, no laboratório de Química da UVV.
          </p>
          <div className="hero-acoes">
            <a className="botao botao-claro" href="#processo">
              Ver como funciona
            </a>
            <a className="link-sublinhado" href="#contato">
              Quero saber mais
            </a>
          </div>
        </motion.div>
      </div>
      <motion.div
        className="hero-visual"
        initial={reduce ? false : { opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease, delay: 0.5 }}
      >
        <FilterColumn />
      </motion.div>
      <p className="hero-dica">Esta página funciona como um filtro. Role e acompanhe a água.</p>
    </header>
  );
}
