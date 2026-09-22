// npm run dev → servidor local com recarga automática em http://localhost:5173
import * as esbuild from "esbuild";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const PORTA = 5173;
mkdirSync("dev-out", { recursive: true });

// Gera o HTML de desenvolvimento a partir do mesmo template do build
const html = readFileSync("index.template.html", "utf8")
  .replace("<style>/*CSS*/</style>", '<link rel="stylesheet" href="/main.css">')
  .replace(
    "<script>/*JS*/</script>",
    '<script src="/main.js"></script>\n<script>new EventSource("/esbuild").addEventListener("change", () => location.reload());</script>'
  );
writeFileSync("dev-out/index.html", html);

const ctx = await esbuild.context({
  entryPoints: ["src/main.tsx"],
  bundle: true,
  format: "iife",
  target: "es2019",
  outdir: "dev-out",
  sourcemap: true,
  jsx: "automatic",
  define: { "process.env.NODE_ENV": '"development"' },
  logLevel: "info",
});
await ctx.watch();
await ctx.serve({ servedir: "dev-out", port: PORTA });
console.log(`\n  BioCarb rodando em http://localhost:${PORTA}\n  Salvou um arquivo em src/? A página recarrega sozinha.\n  Ctrl + C para parar.\n`);
