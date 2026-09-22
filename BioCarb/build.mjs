// npm run build → gera dist/index.html, um arquivo único pronto para o GitHub Pages
import { build } from "esbuild";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

mkdirSync("dist", { recursive: true });
await build({
  entryPoints: ["src/main.tsx"],
  bundle: true,
  minify: true,
  format: "iife",
  target: "es2019",
  outdir: "dist/tmp",
  define: { "process.env.NODE_ENV": '"production"' },
  jsx: "automatic",
  loader: { ".css": "css", ".png": "dataurl" },
  logLevel: "info",
});
const js = readFileSync("dist/tmp/main.js", "utf8").replace(/<\/script/g, "<\\/script");
const css = readFileSync("dist/tmp/main.css", "utf8");
const html = readFileSync("index.template.html", "utf8")
  .replace("/*CSS*/", () => css)
  .replace("/*JS*/", () => js);
writeFileSync("dist/index.html", html);
console.log("dist/index.html pronto:", (html.length / 1024).toFixed(0), "KB");
