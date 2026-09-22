import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const ROTAS = {
  sp: { nome: "São Paulo", km: 880 },
  rj: { nome: "Rio de Janeiro", km: 520 },
} as const;
type Rota = keyof typeof ROTAS;

const VELOCIDADE = 80; // km/h, média de caminhão em rodovia

const fmt = (n: number, casas = 2) =>
  n.toLocaleString("pt-BR", { minimumFractionDigits: casas, maximumFractionDigits: casas });

export function Truck() {
  const ref = useRef<HTMLDivElement>(null);
  const visivel = useInView(ref, { once: true, amount: 0.4 });
  const [rota, setRota] = useState<Rota>("sp");
  const [seg, setSeg] = useState(0);
  const inicio = useRef<number | null>(null);

  useEffect(() => {
    if (!visivel) return;
    if (inicio.current === null) inicio.current = performance.now();
    let raf = 0;
    const tick = () => {
      setSeg((performance.now() - (inicio.current ?? 0)) / 1000);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visivel]);

  const total = ROTAS[rota].km;
  const rodado = Math.min(total, (seg / 3600) * VELOCIDADE);
  const falta = total - rodado;
  const horas = falta / VELOCIDADE;
  const pct = rodado / total;
  const min = Math.floor(seg / 60);
  const s = Math.floor(seg % 60);

  return (
    <div className="caminhao" ref={ref}>
      <div className="caminhao-topo">
        <p className="caminhao-intro">
          Quando você chegou aqui, um caminhão com carvão ativado saiu de{" "}
          <span className="troca">
            {(Object.keys(ROTAS) as Rota[]).map((k) => (
              <button key={k} className={k === rota ? "ativo" : ""} onClick={() => setRota(k)} aria-pressed={k === rota}>
                {ROTAS[k].nome}
              </button>
            ))}
          </span>{" "}
          rumo a uma estação de tratamento no Espírito Santo.
        </p>
      </div>

      <svg className="estrada" viewBox="0 0 1000 90" preserveAspectRatio="none" aria-hidden="true">
        <line x1="20" y1="45" x2="980" y2="45" className="estrada-linha" />
        <line x1="20" y1="45" x2={20 + 960 * pct} y2="45" className="estrada-feito" />
        <circle cx="20" cy="45" r="7" className="estrada-ponto" />
        <circle cx="980" cy="45" r="7" className="estrada-ponto" />
        <g transform={`translate(${20 + 960 * pct} 45)`}>
          <circle r="11" className="estrada-caminhao" />
        </g>
      </svg>
      <div className="estrada-legenda">
        <span>{ROTAS[rota].nome}</span>
        <span>Vitória, cerca de {total} km</span>
      </div>

      <dl className="caminhao-numeros">
        <div>
          <dt>Tempo desde que você chegou</dt>
          <dd>
            {String(min).padStart(2, "0")}:{String(s).padStart(2, "0")}
          </dd>
        </div>
        <div>
          <dt>Quilômetros rodados</dt>
          <dd>{fmt(rodado)}</dd>
        </div>
        <div>
          <dt>Quilômetros que faltam</dt>
          <dd>{fmt(falta, 1)}</dd>
        </div>
        <div>
          <dt>Chegada prevista em</dt>
          <dd>{fmt(horas, 1)} h</dd>
        </div>
      </dl>
      <p className="caminhao-fecho">
        Você termina de ler esta página antes de ele sair da região metropolitana. A fibra de coco que a BioCarb usa está na feira do bairro.
      </p>
      <p className="caminhao-nota">Simulação a {VELOCIDADE} km/h, sem paradas. Distâncias rodoviárias aproximadas.</p>
    </div>
  );
}
