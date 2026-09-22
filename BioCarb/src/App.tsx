import { useEffect, useState } from "react";
import { Particles } from "./components/Particles";
import { Hero } from "./components/Hero";
import { Pores } from "./components/Pores";
import { Process } from "./components/Process10";
import {
  Problema, Ideia, Saida, Aplicacoes, Diferenciais, Modelo, Cadeia, Roadmap, Contato, Rodape,
} from "./components/Sections";
import logo from "./assets/logo-biocarb.png";
import logoEscuro from "./assets/logo-biocarb-escuro.png";

// Logo original (Carb em branco) no fundo escuro; nas seções claras troca pela versão com Carb escuro
function Marca() {
  return (
    <a href="#inicio" className="marca" aria-label="BioCarb, voltar ao início">
      <img src={logo} alt="" className="marca-clara" />
      <img src={logoEscuro} alt="" className="marca-escura" />
    </a>
  );
}

function Nav() {
  const [claro, setClaro] = useState(false);
  const [rolou, setRolou] = useState(false);
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
    <nav className={`nav ${claro ? "nav-claro" : ""} ${rolou ? "nav-rolou" : ""}`} aria-label="Principal">
      <Marca />
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
          <Contato />
        </div>
      </main>
      <Rodape />
    </>
  );
}
