import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef, useState } from "react";
import { etapas } from "../data";

const N = etapas.length;

// Paleta das ilustrações
const K = {
  texto: "#E9E4DC",
  suave: "#A39C90",
  linha: "#5A544C",
  fibra: "#D2A56B",
  fibraEsc: "#8C6A42",
  caroco: "#B08A5B",
  graos: "#3E3933",
  graos2: "#2A2723",
  fosfato: "#2D6B66",
  agua: "#CFE3DD",
  fogo: "#E0782E",
  erro: "#B5533C",
};

type LP = { lp: MotionValue<number> };
const traco = { fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

/* ---------- utilitários ---------- */

// Faixa local: devolve 0..1 entre a e b do progresso da etapa
function useFaixa(lp: MotionValue<number>, a: number, b: number) {
  return useTransform(lp, [a, b], [0, 1]);
}
function Texto({ mv, ...rest }: { mv: MotionValue<string> } & React.SVGProps<SVGTextElement>) {
  return <motion.text {...(rest as object)}>{mv}</motion.text>;
}
function useTexto(lp: MotionValue<number>, faixa: [number, number], de: number, ate: number, fmt: (n: number) => string) {
  return useTransform(lp, (v) => {
    const t = Math.min(1, Math.max(0, (v - faixa[0]) / (faixa[1] - faixa[0])));
    return fmt(de + (ate - de) * t);
  });
}

function Termometro({ lp, x, y, faixa, de, ate, rotulo }: LP & { x: number; y: number; faixa: [number, number]; de: number; ate: number; rotulo?: string }) {
  const h = useTransform(lp, faixa, [18, 118]);
  const yy = useTransform(h, (v) => y + 130 - v);
  const txt = useTexto(lp, faixa, de, ate, (n) => `${Math.round(n)} °C`);
  return (
    <g>
      <rect x={x - 9} y={y} width="18" height="140" rx="9" stroke={K.texto} strokeWidth="2" {...traco} />
      <circle cx={x} cy={y + 150} r="16" fill={K.erro} />
      <motion.rect x={x - 4} width="8" rx="4" fill={K.erro} style={{ y: yy, height: h }} />
      <Texto mv={txt} x={x + 24} y={y + 20} className="ilu-num" />
      {rotulo && (
        <text x={x + 24} y={y + 42} className="ilu-rot">
          {rotulo}
        </text>
      )}
    </g>
  );
}

function Relogio({ lp, cx, cy, voltas = 2, rotulo }: LP & { cx: number; cy: number; voltas?: number; rotulo: string }) {
  const rot = useTransform(lp, [0, 1], [0, 360 * voltas]);
  return (
    <g>
      <circle cx={cx} cy={cy} r="26" stroke={K.texto} strokeWidth="2" {...traco} />
      <motion.line x1={cx} y1={cy} x2={cx} y2={cy - 18} stroke={K.fibra} strokeWidth="3" strokeLinecap="round" style={{ rotate: rot, originX: 0.5, originY: 1 }} />
      <circle cx={cx} cy={cy} r="3" fill={K.texto} />
      <text x={cx} y={cy + 48} textAnchor="middle" className="ilu-rot">
        {rotulo}
      </text>
    </g>
  );
}

/* ---------- 1. Coleta e seleção ---------- */
const itens1 = [
  { tipo: "fibra", x0: 90, x1: 96, y1: 262, ok: true },
  { tipo: "caroco", x0: 150, x1: 128, y1: 270, ok: true },
  { tipo: "ruim", x0: 210, x1: 300, y1: 272, ok: false },
  { tipo: "fibra", x0: 120, x1: 150, y1: 252, ok: true },
  { tipo: "caroco", x0: 260, x1: 108, y1: 246, ok: true },
  { tipo: "ruim", x0: 170, x1: 322, y1: 262, ok: false },
  { tipo: "fibra", x0: 230, x1: 124, y1: 232, ok: true },
  { tipo: "caroco", x0: 70, x1: 160, y1: 236, ok: true },
];
function Item1({ lp, it, k }: LP & { it: (typeof itens1)[number]; k: number }) {
  const a = 0.04 + k * 0.08;
  const t = useFaixa(lp, a, a + 0.32);
  const x = useTransform(t, [0, 0.55, 1], [it.x0, it.x0 + (it.x1 - it.x0) * 0.2, it.x1]);
  const y = useTransform(t, [0, 0.55, 1], [-30, 150, it.y1]);
  const r = useTransform(t, [0, 1], [0, it.ok ? 40 : 160]);
  const op = useTransform(t, [0, 0.08], [0, 1]);
  return (
    <motion.g style={{ x, y, rotate: r, opacity: op }}>
      {it.tipo === "fibra" && <path d="M-16 0 q8 -8 16 0 t16 0" stroke={K.fibra} strokeWidth="5" {...traco} />}
      {it.tipo === "caroco" && <ellipse rx="11" ry="8" fill={K.caroco} />}
      {it.tipo === "ruim" && (
        <g>
          <ellipse rx="12" ry="9" fill="#6E5A3E" />
          <circle cx="-4" cy="-2" r="2.5" fill="#2C241A" />
          <circle cx="4" cy="3" r="2" fill="#2C241A" />
        </g>
      )}
    </motion.g>
  );
}
function Etapa1({ lp }: LP) {
  const x = useFaixa(lp, 0.75, 0.95);
  return (
    <svg viewBox="0 0 400 360">
      <line x1="40" y1="150" x2="360" y2="150" stroke={K.linha} strokeWidth="1.5" strokeDasharray="6 6" />
      <text x="200" y="140" textAnchor="middle" className="ilu-rot">
        triagem
      </text>
      <path d="M60 220 L80 300 H190 L210 220" stroke={K.texto} strokeWidth="2.5" {...traco} />
      <path d="M260 230 L272 300 H348 L360 230" stroke={K.erro} strokeWidth="2.5" strokeDasharray="7 5" {...traco} />
      {itens1.map((it, k) => (
        <Item1 key={k} lp={lp} it={it} k={k} />
      ))}
      <text x="135" y="330" textAnchor="middle" className="ilu-rot">
        aproveita
      </text>
      <text x="310" y="330" textAnchor="middle" className="ilu-rot">
        terra, sal, podre
      </text>
      <motion.g style={{ opacity: x }}>
        <path d="M296 198 l20 20 M316 198 l-20 20" stroke={K.erro} strokeWidth="4" strokeLinecap="round" />
      </motion.g>
    </svg>
  );
}

/* ---------- 2. Trituração e secagem ---------- */
const frag2 = Array.from({ length: 22 }, (_, k) => ({
  cx: 105 + (k % 5) * 9,
  cy: 150 + Math.floor(k / 5) * 9,
  tx: 60 + ((k * 53) % 190),
  ty: 262 + ((k * 17) % 26),
  r: (k * 47) % 180,
}));
function Frag2({ lp, f, k }: LP & { f: (typeof frag2)[number]; k: number }) {
  const t = useFaixa(lp, 0.08 + (k % 6) * 0.02, 0.45);
  const x = useTransform(t, [0, 1], [f.cx, f.tx]);
  const y = useTransform(t, [0, 0.6, 1], [f.cy, f.cy - 20, f.ty]);
  const rot = useTransform(t, [0, 1], [0, f.r]);
  const sc = useTransform(t, [0, 1], [1.6, 0.7]);
  const cor = useTransform(lp, [0.5, 1], [K.caroco, "#9A7A52"]);
  return <motion.rect width="10" height="6" rx="2" x={-5} y={-3} style={{ x, y, rotate: rot, scale: sc, fill: cor }} />;
}
function Etapa2({ lp }: LP) {
  const lamina = useTransform(lp, [0, 0.45], [0, 900]);
  const opLamina = useTransform(lp, [0.4, 0.5], [1, 0]);
  const vapor = useTransform(lp, [0.55, 0.75], [0, 0.8]);
  const vy = useTransform(lp, [0.55, 1], [0, -26]);
  const estufa = useTransform(lp, [0.45, 0.6], [0, 1]);
  return (
    <svg viewBox="0 0 400 360">
      <motion.g style={{ opacity: opLamina }}>
        <motion.g style={{ rotate: lamina }}>
          <path d="M128 168 L178 150 M128 168 L78 186 M128 168 L110 118 M128 168 L146 218" stroke={K.texto} strokeWidth="3" strokeLinecap="round" />
        </motion.g>
        <text x="128" y="96" textAnchor="middle" className="ilu-rot">
          triturando
        </text>
      </motion.g>
      <motion.rect x="40" y="228" width="240" height="84" rx="6" stroke={K.texto} strokeWidth="2" {...traco} style={{ opacity: estufa }} />
      <motion.text x="48" y="222" className="ilu-rot" style={{ opacity: estufa }}>
        estufa
      </motion.text>
      <path d="M50 296 H270" stroke={K.fibra} strokeWidth="3" strokeLinecap="round" />
      {frag2.map((f, k) => (
        <Frag2 key={k} lp={lp} f={f} k={k} />
      ))}
      <motion.g style={{ opacity: vapor, y: vy }}>
        {[100, 150, 200].map((x) => (
          <path key={x} d={`M${x} 250 q 8 -12 0 -24 q -8 -12 0 -24`} stroke={K.texto} strokeWidth="1.8" {...traco} />
        ))}
      </motion.g>
      <text x="92" y="340" className="ilu-rot">
        pedaços menores que 5 mm
      </text>
      <Termometro lp={lp} x={330} y={100} faixa={[0.5, 0.95]} de={25} ate={105} rotulo="24 h" />
    </svg>
  );
}

/* ---------- 3. Impregnação ---------- */
function Etapa3({ lp }: LP) {
  const inclina = useTransform(lp, [0, 0.25], [0, -58]);
  const jato = useTransform(lp, [0.2, 0.32, 0.62, 0.7], [0, 205, 205, 0]);
  const nivel = useTransform(lp, [0.22, 0.7], [0, 86]);
  const nivelY = useTransform(nivel, (v) => 300 - v);
  const corBio = useTransform(lp, [0.35, 0.9], [K.caroco, "#3D3428"]);
  const giro = useTransform(lp, [0, 1], [0, 1440]);
  const rot = useTransform(lp, [0.72, 0.85], [0, 1]);
  return (
    <svg viewBox="0 0 400 360">
      <defs>
        <clipPath id="bq3">
          <path d="M120 150 V290 Q120 304 134 304 H266 Q280 304 280 290 V150 Z" />
        </clipPath>
      </defs>
      {/* frasco que inclina */}
      <motion.g style={{ rotate: inclina, originX: 0.05, originY: 1 }}>
        <path d="M284 40 V70 L262 110 Q258 120 268 120 H332 Q342 120 338 110 L316 70 V40 Z" fill={K.fosfato} opacity=".9" />
        <path d="M284 40 V70 L262 110 Q258 120 268 120 H332 Q342 120 338 110 L316 70 V40" stroke={K.texto} strokeWidth="2" {...traco} />
        <text x="300" y="104" textAnchor="middle" className="ilu-formula-p">
          H₃PO₄
        </text>
      </motion.g>
      <motion.rect x="210" y="52" width="7" rx="3.5" fill={K.fosfato} style={{ height: jato }} />
      <g clipPath="url(#bq3)">
        <motion.rect x="118" width="164" fill={K.fosfato} opacity=".75" style={{ y: nivelY, height: nivel }} />
        {Array.from({ length: 12 }).map((_, k) => (
          <motion.rect key={k} x={132 + ((k * 29) % 130)} y={256 + ((k * 13) % 38)} width="12" height="7" rx="2" style={{ fill: corBio }} />
        ))}
      </g>
      <path d="M120 130 V290 Q120 304 134 304 H266 Q280 304 280 290 V130" stroke={K.texto} strokeWidth="2.5" {...traco} />
      <motion.g style={{ rotate: giro }}>
        <rect x="184" y="290" width="32" height="8" rx="4" fill={K.texto} />
      </motion.g>
      <rect x="120" y="318" width="160" height="14" rx="4" fill={K.linha} />
      <text x="200" y="352" textAnchor="middle" className="ilu-rot">
        agitação
      </text>
      <motion.g style={{ opacity: rot }}>
        <text x="60" y="200" textAnchor="middle" className="ilu-num">
          1 : 1
        </text>
        <text x="60" y="222" textAnchor="middle" className="ilu-rot">
          ácido : biomassa
        </text>
      </motion.g>
    </svg>
  );
}

/* ---------- 4. Secagem pós-impregnação ---------- */
function Gota4({ lp, k }: LP & { k: number }) {
  const a = 0.1 + (k % 5) * 0.12;
  const t = useFaixa(lp, a, a + 0.3);
  const y = useTransform(t, [0, 1], [250, 150]);
  const op = useTransform(t, [0, 0.2, 1], [0, 1, 0]);
  return <motion.path d="M0 -7 C4 -1 5 2 5 4 A5 5 0 0 1 -5 4 C-5 2 -4 -1 0 -7 Z" fill={K.agua} style={{ x: 70 + k * 22, y, opacity: op }} />;
}
function Etapa4({ lp }: LP) {
  const brilho = useTransform(lp, [0.2, 0.9], [0.55, 0]);
  const cor = useTransform(lp, [0, 1], ["#2E2A25", "#4A4036"]);
  return (
    <svg viewBox="0 0 400 360">
      <rect x="40" y="90" width="250" height="220" rx="10" stroke={K.texto} strokeWidth="2" {...traco} />
      <text x="165" y="80" textAnchor="middle" className="ilu-rot">
        estufa
      </text>
      <path d="M58 262 H272 V282 H58 Z" fill={K.linha} />
      <motion.path d="M62 262 Q90 244 120 256 T180 252 T240 254 T270 262 Z" style={{ fill: cor }} />
      <motion.path d="M84 252 q20 -8 40 -2 M160 250 q20 -8 40 -2" stroke="#fff" strokeWidth="3" {...traco} style={{ opacity: brilho }} />
      {Array.from({ length: 9 }).map((_, k) => (
        <Gota4 key={k} lp={lp} k={k} />
      ))}
      <Termometro lp={lp} x={338} y={70} faixa={[0, 0.8]} de={105} ate={130} />
      <Relogio lp={lp} cx={338} cy={300} voltas={2} rotulo="12 a 24 h" />
    </svg>
  );
}

/* ---------- 5. Ativação sem oxigênio ---------- */
function Etapa5({ lp }: LP) {
  const brasa = useTransform(lp, [0, 0.45, 0.75, 0.95], ["#2B2825", K.fogo, "#FFB35C", "#3A3530"]);
  const halo = useTransform(lp, [0.2, 0.6, 0.8, 1], [0, 0.55, 0.55, 0]);
  const agulha = useTransform(lp, [0, 0.7, 0.8, 1], [-90, 18, 18, -60]);
  const temp = useTransform(lp, (v) => {
    if (v > 0.84) return "esfriando";
    const t = Math.min(1, v / 0.7);
    return `${Math.round(25 + t * 575)} °C`;
  });
  const barraQ = useTransform(lp, [0.3, 0.75], [0, 1]);
  return (
    <svg viewBox="0 0 400 360">
      <rect x="40" y="50" width="190" height="170" rx="10" fill="#2B2825" stroke={K.texto} strokeWidth="2" />
      <rect x="62" y="72" width="146" height="116" rx="6" fill="#1D1B19" />
      <motion.circle cx="135" cy="150" r="54" style={{ fill: K.fogo, opacity: halo }} />
      <motion.path d="M100 160 H170 L162 182 H108 Z" style={{ fill: brasa }} />
      <text x="135" y="210" textAnchor="middle" className="ilu-rot">
        ambiente sem oxigênio
      </text>
      {/* mostrador */}
      <path d="M262 150 A58 58 0 0 1 378 150" stroke={K.linha} strokeWidth="10" {...traco} />
      <path d="M309 94 A58 58 0 0 1 347 97" stroke={K.fibra} strokeWidth="10" {...traco} />
      <motion.line x1="320" y1="150" x2="320" y2="104" stroke={K.texto} strokeWidth="3" strokeLinecap="round" style={{ rotate: agulha, originX: 0.5, originY: 1 }} />
      <circle cx="320" cy="150" r="6" fill={K.texto} />
      <Texto mv={temp} x={320} y={184} textAnchor="middle" className="ilu-num" />
      {/* comparação */}
      <text x="40" y="262" className="ilu-rot">
        ativação química
      </text>
      <rect x="40" y="270" width="320" height="14" rx="7" fill={K.linha} opacity=".5" />
      <motion.rect x="40" y="270" width="192" height="14" rx="7" fill={K.fibra} style={{ scaleX: barraQ, originX: 0 }} />
      <text x="360" y="262" textAnchor="end" className="ilu-rot">
        400 a 600 °C
      </text>
      <text x="40" y="314" className="ilu-rot">
        ativação física
      </text>
      <rect x="40" y="322" width="320" height="14" rx="7" fill="none" stroke={K.suave} strokeDasharray="5 4" />
      <text x="360" y="314" textAnchor="end" className="ilu-rot">
        700 a 1.000 °C
      </text>
    </svg>
  );
}

/* ---------- 6. Lavagem e neutralização ---------- */
function Gota6({ lp, k }: LP & { k: number }) {
  const y = useTransform(lp, (v) => {
    const c = (v * 6 + k / 4) % 1;
    return 60 + c * 110;
  });
  const op = useTransform(lp, [0, 0.05, 0.85, 0.95], [0, 1, 1, 0]);
  return <motion.circle cx={200} r="5" fill={K.agua} style={{ y, opacity: op }} />;
}
function Etapa6({ lp }: LP) {
  const x = useTransform(lp, [0.1, 0.9], [60, 256]);
  const ph = useTransform(lp, (v) => {
    const t = Math.min(1, Math.max(0, (v - 0.1) / 0.8));
    return `pH ${(2 + t * 5).toFixed(1).replace(".", ",")}`;
  });
  const cor = useTransform(lp, [0.1, 0.9], ["#B5533C", "#5E8F6B"]);
  const nivel = useTransform(lp, [0.1, 0.9], [4, 40]);
  const nivelY = useTransform(nivel, (v) => 300 - v);
  return (
    <svg viewBox="0 0 400 360">
      <path d="M170 30 H230 V50 H212 V56 H188 V50 H170 Z" fill={K.linha} />
      {[0, 1, 2, 3].map((k) => (
        <Gota6 key={k} lp={lp} k={k} />
      ))}
      <path d="M130 170 H270 L214 236 V256 H186 V236 Z" stroke={K.texto} strokeWidth="2.5" {...traco} />
      {Array.from({ length: 14 }).map((_, k) => (
        <rect key={k} x={150 + ((k * 31) % 98)} y={178 + ((k * 7) % 18)} width="11" height="7" rx="2" fill={k % 2 ? K.graos : K.graos2} />
      ))}
      <path d="M150 250 V300 Q150 310 160 310 H240 Q250 310 250 300 V250" stroke={K.texto} strokeWidth="2" {...traco} />
      <motion.rect x="152" width="96" rx="3" style={{ y: nivelY, height: nivel, fill: cor }} opacity=".7" />
      <defs>
        <linearGradient id="ph6" x1="0" x2="1">
          <stop offset="0" stopColor="#B5533C" />
          <stop offset=".5" stopColor="#D2A56B" />
          <stop offset="1" stopColor="#5E8F6B" />
        </linearGradient>
      </defs>
      <rect x="60" y="330" width="196" height="10" rx="5" fill="url(#ph6)" />
      <motion.path d="M0 -12 L7 0 H-7 Z" fill={K.texto} style={{ x, y: 326 }} />
      <Texto mv={ph} x={270} y={340} className="ilu-num" />
      <text x="60" y="320" className="ilu-rot">
        ácido
      </text>
      <text x="256" y="320" textAnchor="end" className="ilu-rot">
        neutro
      </text>
    </svg>
  );
}

/* ---------- 7. Secagem final ---------- */
function Etapa7({ lp }: LP) {
  const bandeja = useTransform(lp, [0, 0.3, 0.75, 1], [-150, 0, 0, 0]);
  const porta = useTransform(lp, [0.28, 0.4, 0.72, 0.84], [0, 1, 1, 0]);
  const calor = useTransform(lp, [0.4, 0.5, 0.68, 0.74], [0, 1, 1, 0]);
  const cy = useTransform(lp, [0.4, 0.74], [0, -18]);
  const brilho = useTransform(lp, [0.3, 0.7], [0.7, 0]);
  const pronto = useTransform(lp, [0.84, 0.95], [0, 1]);
  return (
    <svg viewBox="0 0 400 360">
      <rect x="90" y="80" width="240" height="200" rx="10" stroke={K.texto} strokeWidth="2" {...traco} />
      <motion.g style={{ x: bandeja }}>
        <rect x="120" y="222" width="180" height="12" rx="3" fill={K.linha} />
        {Array.from({ length: 16 }).map((_, k) => (
          <rect key={k} x={126 + k * 10.5} y={210 + (k % 3) * 3} width="9" height="7" rx="2" fill={k % 2 ? K.graos : K.graos2} />
        ))}
        <motion.path d="M132 208 h24 M190 206 h28 M250 208 h22" stroke={K.agua} strokeWidth="3" strokeLinecap="round" style={{ opacity: brilho }} />
      </motion.g>
      <motion.g style={{ opacity: calor, y: cy }}>
        {[150, 200, 250].map((x) => (
          <path key={x} d={`M${x} 190 q 8 -14 0 -28 q -8 -14 0 -28 q 8 -14 0 -28`} stroke={K.fogo} strokeWidth="2" {...traco} />
        ))}
      </motion.g>
      <motion.rect x="90" y="80" width="240" height="200" rx="10" fill="#2B2825" stroke={K.texto} strokeWidth="2" style={{ scaleX: porta, originX: 1, opacity: porta }} />
      <motion.circle cx="110" cy="180" r="6" fill={K.texto} style={{ opacity: porta }} />
      <motion.g style={{ opacity: pronto }}>
        <text x="210" y="320" textAnchor="middle" className="ilu-num">
          seco e pronto para moer
        </text>
      </motion.g>
      <text x="210" y="66" textAnchor="middle" className="ilu-rot">
        estufa, só para tirar a água da lavagem
      </text>
    </svg>
  );
}

/* ---------- 8. Moagem e peneiramento ---------- */
function Grao8({ lp, k }: LP & { k: number }) {
  const a = 0.35 + (k % 8) * 0.06;
  const t = useFaixa(lp, a, a + 0.18);
  const x0 = 150 + ((k * 23) % 100);
  const y = useTransform(t, [0, 1], [150, 300 - (k % 3) * 7]);
  const x = useTransform(t, [0, 1], [x0, 140 + ((k * 37) % 120)]);
  const op = useTransform(t, [0, 0.05], [0, 1]);
  return <motion.rect width="6" height="5" rx="1.5" x={-3} y={-2.5} fill={K.graos} style={{ x, y, opacity: op }} />;
}
function Pedra8({ lp, k }: LP & { k: number }) {
  const t = useFaixa(lp, k * 0.04, 0.28 + k * 0.03);
  const y = useTransform(t, [0, 1], [-40, 128 - (k % 2) * 8]);
  const x = 150 + k * 22;
  const sc = useTransform(lp, [0.4, 0.95], [1, 0.55]);
  const op = useTransform(t, [0, 0.1], [0, 1]);
  return <motion.rect width="18" height="14" rx="4" x={-9} y={-7} fill={K.graos} style={{ x, y, scale: sc, opacity: op }} />;
}
function Etapa8({ lp }: LP) {
  const env = useTransform(lp, (v) => (v > 0.3 && v < 0.92 ? Math.sin(v * 90) * 7 : 0));
  return (
    <svg viewBox="0 0 400 360">
      <motion.g style={{ x: env }}>
        {Array.from({ length: 6 }).map((_, k) => (
          <Pedra8 key={k} lp={lp} k={k} />
        ))}
        <path d="M120 140 H290 L276 170 H134 Z" stroke={K.texto} strokeWidth="2.5" {...traco} />
        <path d="M130 146 H282" stroke={K.texto} strokeWidth="1" strokeDasharray="3 3" />
        <path d="M134 162 H276" stroke={K.texto} strokeWidth="1" strokeDasharray="3 3" />
      </motion.g>
      <path d="M130 250 V304 Q130 312 138 312 H272 Q280 312 280 304 V250" stroke={K.texto} strokeWidth="2" {...traco} />
      {Array.from({ length: 28 }).map((_, k) => (
        <Grao8 key={k} lp={lp} k={k} />
      ))}
      <text x="205" y="118" textAnchor="middle" className="ilu-rot">
        peneira
      </text>
      <text x="205" y="340" textAnchor="middle" className="ilu-num">
        8x30 mesh
      </text>
      <text x="310" y="160" className="ilu-rot">
        fica o grosso
      </text>
      <text x="288" y="286" className="ilu-rot">
        passa o grão certo
      </text>
    </svg>
  );
}

/* ---------- 9. Controle de qualidade ---------- */
function Etapa9({ lp }: LP) {
  const azul = useTransform(lp, [0.2, 0.75], ["#2E5FA8", "#D7E6EC"]);
  const iodo = useTransform(lp, [0.3, 0.85], ["#8A5A1C", "#EFE3C8"]);
  const cai = useTransform(lp, [0, 0.2], [-60, 0]);
  const opCai = useTransform(lp, [0, 0.05, 0.25, 0.3], [0, 1, 1, 0]);
  const curva = useTransform(lp, [0.35, 0.95], [0, 1]);
  return (
    <svg viewBox="0 0 400 360">
      {[
        { x: 70, cor: azul, rot: "azul de metileno" },
        { x: 160, cor: iodo, rot: "número de iodo" },
      ].map((t, k) => (
        <g key={k}>
          <motion.g style={{ y: cai, opacity: opCai }}>
            {[0, 1, 2].map((j) => (
              <rect key={j} x={t.x + 10 + j * 9} y={60 + j * 6} width="7" height="6" rx="1.5" fill={K.graos} />
            ))}
          </motion.g>
          <path d={`M${t.x} 90 V250 A24 24 0 0 0 ${t.x + 48} 250 V90`} stroke={K.texto} strokeWidth="2.5" {...traco} />
          <motion.path d={`M${t.x + 3} 130 V250 A21 21 0 0 0 ${t.x + 45} 250 V130 Z`} style={{ fill: t.cor }} />
          <text x={t.x + 24} y={306} textAnchor="middle" className="ilu-rot">
            {t.rot.split(" ").slice(0, 2).join(" ")}
          </text>
          <text x={t.x + 24} y={324} textAnchor="middle" className="ilu-rot">
            {t.rot.split(" ").slice(2).join(" ")}
          </text>
        </g>
      ))}
      <rect x="240" y="110" width="130" height="140" rx="8" fill="#2B2825" stroke={K.texto} strokeWidth="2" />
      <rect x="252" y="122" width="106" height="80" rx="4" fill="#141312" />
      <motion.path d="M258 134 C280 136 290 170 310 184 S346 194 352 195" stroke={K.agua} strokeWidth="2.5" {...traco} style={{ pathLength: curva }} />
      <circle cx="274" cy="226" r="8" fill={K.fosfato} />
      <rect x="292" y="220" width="60" height="10" rx="3" fill={K.linha} />
      <text x="305" y="276" textAnchor="middle" className="ilu-rot">
        espectrofotômetro
      </text>
    </svg>
  );
}

/* ---------- 10. Embalagem e entrega ---------- */
function Etapa10({ lp }: LP) {
  const f1 = useTransform(lp, [0.05, 0.35], [0, 58]);
  const f1y = useTransform(f1, (v) => 214 - v);
  const f2 = useTransform(lp, [0.2, 0.55], [0, 88]);
  const f2y = useTransform(f2, (v) => 214 - v);
  const jato = useTransform(lp, [0, 0.05, 0.5, 0.56], [0, 1, 1, 0]);
  const jx = useTransform(lp, [0.05, 0.3, 0.32, 0.55], [115, 115, 225, 225]);
  const van = useTransform(lp, [0.6, 1], [-150, 420]);
  const selo1 = useTransform(lp, [0.36, 0.42], [0, 1]);
  const selo2 = useTransform(lp, [0.56, 0.62], [0, 1]);
  return (
    <svg viewBox="0 0 400 360">
      <path d="M100 30 H240 L200 70 H140 Z" fill={K.linha} />
      <motion.rect width="6" y="70" height="80" rx="3" fill={K.graos} style={{ x: jx, opacity: jato }} />
      <defs>
        <clipPath id="s1">
          <path d="M80 150 L90 128 H140 L150 150 V214 H80 Z" />
        </clipPath>
        <clipPath id="palco10">
          <rect x="0" y="0" width="400" height="360" />
        </clipPath>
        <clipPath id="s2">
          <path d="M180 120 L194 92 H256 L270 120 V214 H180 Z" />
        </clipPath>
      </defs>
      <path d="M80 150 L90 128 H140 L150 150 V214 H80 Z" fill={K.texto} />
      <path d="M180 120 L194 92 H256 L270 120 V214 H180 Z" fill={K.texto} />
      <g clipPath="url(#s1)">
        <motion.rect x="78" width="74" fill={K.graos} style={{ y: f1y, height: f1 }} />
      </g>
      <g clipPath="url(#s2)">
        <motion.rect x="178" width="94" fill={K.graos} style={{ y: f2y, height: f2 }} />
      </g>
      {/* selagem */}
      <motion.path d="M89 134 H141" stroke={K.fibra} strokeWidth="3" strokeDasharray="4 3" style={{ opacity: selo1 }} />
      <motion.path d="M192 100 H258" stroke={K.fibra} strokeWidth="3" strokeDasharray="4 3" style={{ opacity: selo2 }} />
      <text x="175" y="238" textAnchor="middle" className="ilu-rot">
        embalado e selado
      </text>
      <line x1="0" y1="330" x2="400" y2="330" stroke={K.linha} strokeWidth="2" strokeDasharray="12 8" />
      <g clipPath="url(#palco10)">
      <motion.g style={{ x: van }}>
        <rect x="0" y="282" width="78" height="36" rx="4" fill={K.fibra} />
        <path d="M78 290 H100 L112 304 V318 H78 Z" fill={K.fibra} />
        <rect x="84" y="294" width="14" height="10" rx="2" fill="#1D1B19" />
        <circle cx="20" cy="322" r="8" fill={K.texto} />
        <circle cx="92" cy="322" r="8" fill={K.texto} />
      </motion.g>
      </g>
      <text x="200" y="356" textAnchor="middle" className="ilu-rot">
        entrega dentro do Espírito Santo
      </text>
    </svg>
  );
}

const ILUSTRACOES = [Etapa1, Etapa2, Etapa3, Etapa4, Etapa5, Etapa6, Etapa7, Etapa8, Etapa9, Etapa10];

/* ---------- camadas ---------- */
function useCamada(p: MotionValue<number>, i: number) {
  const a = i / N;
  const b = (i + 1) / N;
  const f = 0.08 / N;
  const entrada = i === 0 ? [0, 0] : [a - f, a + f];
  const saida = i === N - 1 ? [1, 1] : [b - f, b + f];
  const opacity = useTransform(
    p,
    [entrada[0], entrada[1], saida[0], saida[1]],
    [i === 0 ? 1 : 0, 1, 1, i === N - 1 ? 1 : 0]
  );
  return { opacity, a, b };
}

function Camada({ p, i, reduce }: { p: MotionValue<number>; i: number; reduce: boolean }) {
  const { opacity, a, b } = useCamada(p, i);
  const lp = useTransform(p, [a, a + (b - a) * 0.86], reduce ? [1, 1] : [0, 1]);
  const Ilu = ILUSTRACOES[i];
  return (
    <motion.div className="p10-camada" style={{ opacity }} aria-hidden="true">
      <Ilu lp={lp} />
    </motion.div>
  );
}

function TextoEtapa({ p, i }: { p: MotionValue<number>; i: number }) {
  // Texto sai antes do próximo entrar, para nunca sobrepor
  const a = i / N;
  const b = (i + 1) / N;
  const f = 0.1 / N;
  const opacity = useTransform(
    p,
    [i === 0 ? 0 : a, i === 0 ? 0 : a + f, i === N - 1 ? 1 : b - f, i === N - 1 ? 1 : b],
    [i === 0 ? 1 : 0, 1, 1, i === N - 1 ? 1 : 0]
  );
  const y = useTransform(opacity, [0, 1], [18, 0]);
  const e = etapas[i];
  return (
    <motion.div className="p10-texto" style={{ opacity, y }}>
      <p className="p10-num">{String(i + 1).padStart(2, "0")}</p>
      <h3>{e.titulo}</h3>
      <p className="p10-dado">{e.dado}</p>
      <p className="p10-desc">{e.texto}</p>
    </motion.div>
  );
}

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = !!useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [ativo, setAtivo] = useState(0);
  useMotionValueEvent(p, "change", (v) => {
    const i = Math.min(N - 1, Math.max(0, Math.floor(v * N)));
    setAtivo((old) => (old === i ? old : i));
  });
  const barra = useTransform(p, [0, 1], [0, 1]);

  const irPara = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const topo = el.getBoundingClientRect().top + window.scrollY;
    const curso = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: topo + curso * ((i + 0.45) / N), behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section className="processo" id="processo" aria-labelledby="processo-titulo">
      <div className="processo-cabeca">
        <h2 id="processo-titulo" className="titulo-secao">
          Da feira ao filtro em dez etapas:
        </h2>
      </div>

      {/* Versão acessível: lista completa para leitores de tela */}
      <ol className="sr-only">
        {etapas.map((e) => (
          <li key={e.titulo}>
            {e.titulo}. {e.dado}. {e.texto}
          </li>
        ))}
      </ol>

      <div className="p10-trilha" ref={ref} style={{ ["--n" as string]: N }}>
        <div className="p10-palco">
          <div className="p10-visual">
            {etapas.map((_, i) => (
              <Camada key={i} p={p} i={i} reduce={reduce} />
            ))}
          </div>
          <div className="p10-info" aria-hidden="true">
            <div className="p10-progresso">
              <motion.span style={{ scaleX: barra }} />
            </div>
            <ol className="p10-trilho">
              {etapas.map((e, i) => (
                <li key={e.titulo}>
                  <button
                    type="button"
                    tabIndex={-1}
                    className={i === ativo ? "ativo" : i < ativo ? "feito" : ""}
                    onClick={() => irPara(i)}
                    aria-label={`Ir para a etapa ${i + 1}, ${e.titulo}`}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
            </ol>
            <div className="p10-textos">
              {etapas.map((_, i) => (
                <TextoEtapa key={i} p={p} i={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
