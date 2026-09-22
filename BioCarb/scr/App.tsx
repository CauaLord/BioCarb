import { useEffect, useState } from "react";
import { nav } from "./data";
import { Particles } from "./components/Particles";
import { Hero } from "./components/Hero";
import { Pores } from "./components/Pores";
import { Process } from "./components/Process10";
import {
  Problema, Ideia, Saida, Aplicacoes, Diferenciais, Modelo, Cadeia, Roadmap, Pendencias, Equipe, Contato, Rodape,
} from "./components/Sections";

function Marca() {
  return (
    <a href="#inicio" className="marca" aria-label="BioCarb, voltar ao início">
      <svg viewBox="0 0 28 28" aria-hidden="true">
        <path d="M6 9 C7 5 12 3 16 4 C21 5 24 9 23 14 C22 19 19 23 14 24 C9 25 5 21 4 17 C3 14 5 12 6 9 Z" fill="currentColor" />
        <circle cx="11" cy="12" r="1.8" className="furo" />
        <circle cx="16.5" cy="10.5" r="1.3" className="furo" />
        <circle cx="15" cy="17" r="2.2" className="furo" />
      </svg>
      <span>BioCarb</span>
    </a>
  );
}

function Nav() {
  const [claro, setClaro] = useState(false);
  const [rolou, setRolou] = useState(false);
  const [aberto, setAberto] = useState(false);
  useEffect(() => {
    const fechar = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    window.addEventListener("keydown", fechar);
    return () => window.removeEventListener("keydown", fechar);
  }, []);
  useEffect(() => {
    const onScroll = () => {
      const alvo = document.getElementById("aplicacoes");
      const limite = alvo ? alvo.getBoundingClientRect().top : Infinity;
      setClaro(limite < 60);
      setRolou(window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className={`nav ${claro ? "nav-claro" : ""} ${rolou || aberto ? "nav-rolou" : ""} ${aberto ? "nav-aberto" : ""}`} aria-label="Seções">
      <Marca />
      <button
        type="button"
        className="nav-botao"
        aria-expanded={aberto}
        aria-controls="nav-lista"
        onClick={() => setAberto((a) => !a)}
      >
        <span className="nav-icone" aria-hidden="true"><i /><i /></span>
        {aberto ? "Fechar" : "Menu"}
      </button>
      <ul id="nav-lista">
        {nav.map((n) => (
          <li key={n.id}><a href={`#${n.id}`} onClick={() => setAberto(false)}>{n.label}</a></li>
        ))}
      </ul>
    </nav>
  );
}

// Tecla A: rolagem automática para apresentar sem tocar no mouse. Esc para.
function useAutoScroll() {
  useEffect(() => {
    let raf = 0;
    let ativo = false;
    let ultimo = 0;
    const PX_POR_SEG = 70;
    const passo = (t: number) => {
      if (!ativo) return;
      const dt = ultimo ? (t - ultimo) / 1000 : 0;
      ultimo = t;
      window.scrollBy(0, PX_POR_SEG * dt);
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) ativo = false;
      else raf = requestAnimationFrame(passo);
    };
    const onKey = (e: KeyboardEvent) => {
      const alvo = e.target as HTMLElement;
      if (alvo && ["INPUT", "TEXTAREA"].includes(alvo.tagName)) return;
      if (e.key.toLowerCase() === "a" && !e.metaKey && !e.ctrlKey) {
        ativo = !ativo;
        ultimo = 0;
        document.documentElement.style.scrollBehavior = ativo ? "auto" : "";
        if (ativo) raf = requestAnimationFrame(passo);
      }
      if (e.key === "Escape") { ativo = false; document.documentElement.style.scrollBehavior = ""; }
    };
    const parar = () => { ativo = false; document.documentElement.style.scrollBehavior = ""; };
    window.addEventListener("keydown", onKey);
    window.addEventListener("wheel", parar, { passive: true });
    window.addEventListener("touchstart", parar, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", parar);
      window.removeEventListener("touchstart", parar);
    };
  }, []);
}

export function App() {
  useAutoScroll();
  return (
    <>
      <a className="pular" href="#problema">Pular para o conteúdo</a>
      <Nav />
      <main>
        <div className="zona zona-turva">
          <Particles />
          <Hero />
          <Problema />
          <Ideia />
        </div>
        <div className="zona zona-carvao">
          <Pores />
          <Process />
        </div>
        <Saida />
        <div className="zona zona-limpa">
          <Aplicacoes />
          <Diferenciais />
          <Modelo />
          <Cadeia />
          <Roadmap />
          <Pendencias />
          <Equipe />
          <Contato />
        </div>
      </main>
      <Rodape />
    </>
  );
}
