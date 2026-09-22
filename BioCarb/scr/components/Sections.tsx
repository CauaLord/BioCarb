import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import {
  objetivos,
  aplicacoes,
  diferenciais,
  canvas,
  cadeia,
  personas,
  roadmap,
  metasAno1,
  pendencias,
  equipe,
  FASE_ATUAL,
  CONTATO,
} from "../data";
import { Truck } from "./Truck";

export function Problema() {
  return (
    <section className="problema" id="problema" aria-labelledby="problema-titulo">
      <h2 id="problema-titulo" className="titulo-secao">
        Todo o carvão ativado do estado vem de fora
      </h2>
      <div className="problema-colunas">
        <div>
          <p className="problema-dado">
            No levantamento da equipe, 100% do carvão ativado consumido no Espírito Santo vem de São Paulo e do Rio de Janeiro. Não achamos nenhum
            fornecedor capixaba.
          </p>
          <p>
            Para quem opera uma ETE ou uma indústria, isso quer dizer prazo e preço diferentes a cada pedido. Quando o carregamento atrasa, o
            tratamento trabalha no limite.
          </p>
        </div>
        <div>
          <p className="problema-dado">Do outro lado, sobra matéria-prima.</p>
          <p>
            Vendedores de coco, feiras e mercados descartam toneladas de fibra e caroço sem valor nenhum. Material rico em lignina e celulose,
            justamente o que a literatura aponta como bom precursor de carvão ativado.
          </p>
        </div>
      </div>
      <Truck />
    </section>
  );
}

export function Ideia() {
  return (
    <section className="ideia" id="objetivos" aria-labelledby="ideia-titulo">
      <div className="ideia-cabeca">
        <h2 id="ideia-titulo" className="titulo-secao">
          Resíduo daqui, carvão daqui
        </h2>
        <p className="texto-apoio">
          Nosso objetivo é montar uma cadeia produtiva de carvão ativado no Espírito Santo, transformando resíduo em produto de valor e reduzindo a
          dependência de fornecedores de outros estados.
        </p>
      </div>
      <dl className="ideia-lista">
        {objetivos.map((o) => (
          <div key={o.titulo}>
            <dt>{o.titulo}</dt>
            <dd>{o.texto}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function Saida() {
  return (
    <div className="saida" aria-hidden="true">
      <div className="saida-gotas">
        {Array.from({ length: 9 }).map((_, i) => (
          <span key={i} style={{ left: `${8 + i * 10.5}%`, animationDelay: `${(i * 0.37) % 2}s` }} />
        ))}
      </div>
      <p className="saida-texto">Passou pelo carvão.</p>
    </div>
  );
}

export function Aplicacoes() {
  return (
    <section className="aplicacoes" id="aplicacoes" aria-labelledby="aplicacoes-titulo">
      <h2 id="aplicacoes-titulo" className="titulo-secao">
        Onde esse carvão entra
      </h2>
      <div className="aplicacoes-grade">
        {aplicacoes.agora.map((a, i) => (
          <article key={a.titulo} className={i === 0 ? "aplicacao principal" : "aplicacao"}>
            {i === 0 && <p className="selo">Mercado prioritário</p>}
            <h3>{a.titulo}</h3>
            <p>{a.texto}</p>
          </article>
        ))}
        <aside className="aplicacao depois">
          <h3>Fica para o ano 2</h3>
          <ul>
            {aplicacoes.depois.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
          <p>Exigem processamento extra e ficaram fora do primeiro ciclo de propósito.</p>
        </aside>
      </div>
    </section>
  );
}

export function Diferenciais() {
  return (
    <section className="diferenciais" aria-labelledby="dif-titulo">
      <h2 id="dif-titulo" className="titulo-secao">
        Por que a BioCarb
      </h2>
      <div className="dif-grade">
        <p className="mercado">
          O mercado nacional de carvão ativado passa de <strong>R$ 1,5 bilhão</strong> por ano, e o Espírito Santo não tem um fornecedor sequer.
          <span className="mercado-nota">Estimativa da equipe, em refinamento com dados de mercado.</span>
        </p>
        <ol className="dif-lista">
          {diferenciais.map((d) => (
            <li key={d.titulo}>
              <h3>{d.titulo}</h3>
              <p>{d.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Bloco({ titulo, itens, area }: { titulo: string; itens: string[]; area: string }) {
  return (
    <div className={`bmc-bloco bmc-${area}`}>
      <h3>{titulo}</h3>
      <ul>
        {itens.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
}

export function Modelo() {
  return (
    <section className="modelo" id="modelo" aria-labelledby="modelo-titulo">
      <div className="modelo-cabeca">
        <h2 id="modelo-titulo" className="titulo-secao">
          Modelo de negócio
        </h2>
        <p className="texto-apoio">Business Model Canvas do projeto, das parcerias às fontes de receita.</p>
      </div>
      <div className="bmc">
        <Bloco area="par" titulo="Parcerias principais" itens={canvas.parcerias} />
        <Bloco area="ati" titulo="Atividades principais" itens={canvas.atividades} />
        <Bloco area="rec" titulo="Recursos principais" itens={canvas.recursos} />
        <Bloco area="pro" titulo="Proposta de valor" itens={canvas.proposta} />
        <Bloco area="rel" titulo="Relacionamento" itens={canvas.relacionamento} />
        <Bloco area="can" titulo="Canais" itens={canvas.canais} />
        <Bloco area="seg" titulo="Segmentos de clientes" itens={canvas.segmentos} />
        <Bloco area="cus" titulo="Estrutura de custos" itens={canvas.custos} />
        <Bloco area="rev" titulo="Fontes de receita" itens={canvas.receitas} />
      </div>
    </section>
  );
}

export function Cadeia() {
  return (
    <section className="cadeia" id="parceiros" aria-labelledby="cadeia-titulo">
      <div className="cadeia-col">
        <h2 id="cadeia-titulo" className="titulo-secao">
          Quem faz a cadeia girar
        </h2>
        <ul className="cadeia-lista">
          {cadeia.map((c) => (
            <li key={c.nome}>
              <strong>{c.nome}</strong>
              <span>{c.papel}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="cadeia-col">
        <h2 className="titulo-secao">Para quem vendemos</h2>
        <p className="texto-apoio">ETEs e prefeituras capixabas, indústrias com tratamento de efluentes e empresas com metas ESG/GRI. Na prática, duas pessoas decidem essa compra.</p>
        <div className="personas">
          {personas.map((p) => (
            <figure key={p.nome} className="persona">
              <blockquote>“{p.fala}”</blockquote>
              <figcaption>
                <strong>{p.nome}</strong>, {p.papel.toLowerCase()}
              </figcaption>
              <p className="persona-resposta">
                <span>O que a gente entrega:</span> {p.resposta}
              </p>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Roadmap() {
  const ref = useRef<HTMLOListElement>(null);
  const visto = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();
  const progresso = (FASE_ATUAL - 0.5) / roadmap.length;

  return (
    <section className="roadmap" id="roadmap" aria-labelledby="roadmap-titulo">
      <h2 id="roadmap-titulo" className="titulo-secao">
        Os próximos 12 meses
      </h2>
      <div className="roadmap-barra" aria-hidden="true">
        <motion.span
          initial={{ scaleX: reduce ? progresso : 0 }}
          animate={{ scaleX: visto ? progresso : reduce ? progresso : 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <ol className="roadmap-fases" ref={ref}>
        {roadmap.map((f, i) => (
          <li key={f.fase} className={i + 1 === FASE_ATUAL ? "atual" : i + 1 < FASE_ATUAL ? "feita" : ""}>
            <p className="roadmap-meses">
              Fase {i + 1}, {f.meses.toLowerCase()}
            </p>
            <h3>{f.fase}</h3>
            {i + 1 === FASE_ATUAL && <p className="aqui">Estamos aqui</p>}
            <ul>
              {f.itens.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
      <div className="metas">
        <h3>Ao fim do primeiro ano</h3>
        <ul>
          {metasAno1.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Pendencias() {
  return (
    <section className="pendencias" aria-labelledby="pend-titulo">
      <h2 id="pend-titulo" className="titulo-secao">
        O que ainda não sabemos
      </h2>
      <p className="texto-apoio">
        Quem compra carvão ativado para tratar efluente não troca de fornecedor por promessa. Então a gente prefere mostrar o que ainda falta provar.
      </p>
      <ul className="pend-lista">
        {pendencias.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    </section>
  );
}

export function Equipe() {
  return (
    <section className="equipe" id="equipe" aria-labelledby="equipe-titulo">
      <h2 id="equipe-titulo" className="titulo-secao">
        Quem está por trás
      </h2>
      <p className="texto-apoio">Quatro estudantes da UVV, na disciplina de Inovação e Design Thinking.</p>
      <ul className="equipe-lista">
        {equipe.map((m) => (
          <li key={m.nome}>
            <span className="inicial" aria-hidden="true">
              {m.nome
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
            <h3>{m.nome}</h3>
            <p className="papel">{m.papel}</p>
            <p>{m.faz}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Contato() {
  const zap = `https://wa.me/${CONTATO.whatsapp}?text=${encodeURIComponent("Oi! Vi o site da BioCarb e quero saber sobre o teste gratuito.")}`;
  return (
    <section className="contato" id="contato" aria-labelledby="contato-titulo">
      <div className="contato-texto">
        <h2 id="contato-titulo" className="titulo-secao">
          Teste no seu efluente antes de decidir
        </h2>
        <p>
          Estamos procurando as primeiras ETEs e indústrias capixabas para o teste gratuito. Você recebe o kit de demonstração, com amostra e folder,
          e a gente acompanha o teste e monta a comparação de custo com o carvão que você usa hoje.
        </p>
        <p className="contato-formatos">Embalagens previstas de 1 kg e 5 kg.</p>
      </div>
      <div className="contato-acoes">
        <a className="botao botao-escuro" href={zap} target="_blank" rel="noopener noreferrer">
          Falar no WhatsApp
        </a>
        <a className="link-sublinhado escuro" href={`mailto:${CONTATO.email}`}>
          {CONTATO.email}
        </a>
      </div>
    </section>
  );
}

export function Rodape() {
  return (
    <footer className="rodape">
      <p className="rodape-marca">BioCarb</p>
      <p>Carvão ativado a partir de resíduo capixaba. Projeto do Inova Week 2026, Universidade Vila Velha.</p>
      <p className="rodape-dica">Apresentando? Aperte a tecla A para a página rolar sozinha e Esc para parar.</p>
    </footer>
  );
}
