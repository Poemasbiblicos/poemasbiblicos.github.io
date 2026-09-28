/**
 * Pines de estilo "color": sin foto, fondos de color vivo, letra manuscrita
 * y dibujos a mano alzada. Alternativa informal al estilo editorial.
 *
 * Uso:
 *   node pinterest/generar-pines-color.cjs --muestras   -> 6 muestras en pinterest/muestras-color
 *   node pinterest/generar-pines-color.cjs              -> todos, en pinterest/pines-color
 */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const W = 1000, H = 1500;
const DOMINIO = "poemasbiblicos.github.io";
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Paletas: fondo (degradado a -> b), mancha, tinta del texto, acento de dibujos
const PALETAS = [
  { a: "#ffd6e0", b: "#ffb4a2", mancha: "#fff1e6", tinta: "#6d2e46", acento: "#e5989b" },
  { a: "#caf0f8", b: "#90e0ef", mancha: "#ffffff", tinta: "#03045e", acento: "#0077b6" },
  { a: "#fefae0", b: "#e9edc9", mancha: "#ccd5ae", tinta: "#3a5a40", acento: "#bc6c25" },
  { a: "#fde68a", b: "#fca5a5", mancha: "#fff7ed", tinta: "#7c2d12", acento: "#f97316" },
  { a: "#e0c3fc", b: "#8ec5fc", mancha: "#f8f9ff", tinta: "#3c096c", acento: "#7b2cbf" },
  { a: "#b7e4c7", b: "#74c69d", mancha: "#f1faee", tinta: "#1b4332", acento: "#f4a261" },
  { a: "#ffcad4", b: "#f4acb7", mancha: "#fff0f3", tinta: "#590d22", acento: "#c9184a" },
  { a: "#ffe5b4", b: "#ffb347", mancha: "#fff8ec", tinta: "#5c3d00", acento: "#d62828" },
];

const FUENTES = [
  { titulo: "Bradley Hand ITC", versos: "Segoe Print", escala: 1.0 },
  { titulo: "Kristen ITC", versos: "Ink Free", escala: 0.9 },
  { titulo: "Brush Script MT", versos: "Segoe Print", escala: 1.25 },
  { titulo: "Segoe Print", versos: "Tempus Sans ITC", escala: 0.9 },
  { titulo: "Mistral", versos: "Ink Free", escala: 1.2 },
  { titulo: "Ink Free", versos: "Segoe Print", escala: 1.0 },
];

// Dibujos a mano alzada (trazos simples, ligeramente irregulares)
const DIBUJOS = {
  corazon: (x, y, s, c) => `<path d="M ${x} ${y + s * 0.35} C ${x - s} ${y - s * 0.4}, ${x - s * 0.35} ${y - s}, ${x} ${y - s * 0.35} C ${x + s * 0.35} ${y - s}, ${x + s} ${y - s * 0.4}, ${x} ${y + s * 0.35} Z" fill="${c}" opacity=".85"/>`,
  estrella: (x, y, s, c) => `<path d="M ${x} ${y - s} L ${x + s * 0.25} ${y - s * 0.25} L ${x + s} ${y} L ${x + s * 0.25} ${y + s * 0.25} L ${x} ${y + s} L ${x - s * 0.25} ${y + s * 0.25} L ${x - s} ${y} L ${x - s * 0.25} ${y - s * 0.25} Z" fill="${c}" opacity=".9"/>`,
  hoja: (x, y, s, c) => `<g transform="rotate(${(x * 7) % 60 - 30} ${x} ${y})"><path d="M ${x} ${y - s} Q ${x + s * 0.7} ${y} ${x} ${y + s} Q ${x - s * 0.7} ${y} ${x} ${y - s} Z" fill="${c}" opacity=".75"/><line x1="${x}" y1="${y - s}" x2="${x}" y2="${y + s}" stroke="#ffffff" stroke-width="2" opacity=".6"/></g>`,
  espiral: (x, y, s, c) => `<path d="M ${x} ${y} q ${s * 0.3} ${-s * 0.3} ${s * 0.5} 0 q ${s * 0.2} ${s * 0.6} ${-s * 0.6} ${s * 0.6} q ${-s * 0.8} ${-s * 0.1} ${-s * 0.6} ${-s * 0.9}" fill="none" stroke="${c}" stroke-width="5" stroke-linecap="round" opacity=".8"/>`,
  punto: (x, y, s, c) => `<circle cx="${x}" cy="${y}" r="${s * 0.35}" fill="${c}" opacity=".7"/>`,
};
const TIPOS = Object.keys(DIBUJOS);

// pseudoaleatorio estable por semilla
function rnd(seed) { let s = seed % 2147483647; if (s <= 0) s += 2147483646; return () => (s = (s * 16807) % 2147483647) / 2147483647; }

function envolver(texto, max) {
  const out = []; let l = "";
  for (const p of texto.split(" ")) {
    if ((l + " " + p).trim().length <= max) l = (l + " " + p).trim(); else { if (l) out.push(l); l = p; }
  }
  if (l) out.push(l); return out;
}

function leerPoema(file) {
  const t = fs.readFileSync(file, "utf8");
  const partes = t.split(/^---\s*$/m);
  const fm = partes[1] || "", cuerpo = partes.slice(2).join("---");
  const campo = (k) => { for (const l of fm.split(/\r?\n/)) { const i = l.indexOf(":"); if (i > 0 && !/^\s/.test(l) && l.slice(0, i).trim() === k) return l.slice(i + 1).trim().replace(/^"|"$/g, ""); } return ""; };
  const h1 = (cuerpo.match(/^# (.+)$/m) || [])[1] || campo("title");
  const estrofas = []; let b = [];
  for (const linea of cuerpo.split(/\r?\n/)) {
    const s = linea.trim();
    if (s.endsWith("<br>")) b.push(s.replace(/<br>$/, "").trim());
    else if (b.length) { estrofas.push(b); b = []; }
  }
  if (b.length) estrofas.push(b);
  return { h1, categoria: campo("category"), estrofas };
}

function svgColor({ titulo, versos, semilla }) {
  const r = rnd(semilla + 7);
  const P = PALETAS[semilla % PALETAS.length];
  const F = FUENTES[(semilla * 3) % FUENTES.length];
  const inclin = (r() * 6 - 3).toFixed(1);

  // manchas organicas de fondo
  const manchas = [0, 1, 2].map((k) => {
    const cx = 150 + r() * 700, cy = 200 + r() * 1100, rx = 220 + r() * 200, ry = 180 + r() * 220;
    return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${P.mancha}" opacity="${0.35 + k * 0.1}" transform="rotate(${r() * 90} ${cx} ${cy})"/>`;
  }).join("");

  // dibujos repartidos por los bordes
  const dibujos = [];
  for (let k = 0; k < 14; k++) {
    const lado = k % 4;
    const x = lado === 0 ? 40 + r() * 110 : lado === 1 ? 850 + r() * 110 : 60 + r() * 880;
    const y = lado < 2 ? 120 + r() * 1250 : lado === 2 ? 40 + r() * 110 : 1330 + r() * 120;
    const tipo = TIPOS[Math.floor(r() * TIPOS.length)];
    dibujos.push(DIBUJOS[tipo](x, y, 18 + r() * 26, k % 3 === 0 ? P.tinta : P.acento));
  }

  // titulo manuscrito, ligeramente inclinado
  const tam = Math.round(104 * F.escala);
  const lt = envolver(titulo, Math.round(14 / F.escala));
  const yT = 280;
  const tit = lt.map((l, i) => `<text x="${W / 2}" y="${yT + i * tam * 1.1}" text-anchor="middle" font-family="${F.titulo}" font-size="${tam}" fill="${P.tinta}">${esc(l)}</text>`).join("");
  const finT = yT + (lt.length - 1) * tam * 1.1;

  // subrayado a mano bajo el titulo
  const sub = `<path d="M ${W / 2 - 200} ${finT + 40} q 100 ${-14 + r() * 8} 200 0 t 200 ${-6 + r() * 10}" fill="none" stroke="${P.acento}" stroke-width="7" stroke-linecap="round"/>`;

  // versos
  const largo = Math.max(...versos.map((v) => v.length));
  const fs_ = largo <= 38 ? 46 : largo <= 46 ? 41 : largo <= 54 ? 37 : 33;
  const env = versos.flatMap((v) => envolver(v, Math.floor(760 / (fs_ * 0.44))));
  const salto = Math.round(fs_ * 1.7);
  const alto = env.length * salto;
  const yV = Math.max(finT + 230, 860 - alto / 2);
  const tarjeta = `<rect x="110" y="${yV - 90}" width="780" height="${alto + 120}" rx="46" fill="#ffffff" opacity=".55" transform="rotate(${(-inclin / 2).toFixed(1)} 500 ${yV + alto / 2})"/>`;
  const ver = env.map((l, i) => `<text x="${W / 2}" y="${yV + i * salto}" text-anchor="middle" font-family="${F.versos}" font-size="${fs_}" fill="${P.tinta}">${esc(l)}</text>`).join("");

  return Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${P.a}"/><stop offset="1" stop-color="${P.b}"/></linearGradient></defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  ${manchas}
  ${dibujos.join("")}
  <g transform="rotate(${inclin} 500 ${yT})">${tit}${sub}</g>
  ${tarjeta}
  ${ver}
  <text x="${W / 2}" y="1420" text-anchor="middle" font-family="Segoe Print" font-size="30" fill="${P.tinta}">${DOMINIO}</text>
</svg>`);
}

(async () => {
  const muestras = process.argv[2] === "--muestras";
  const destino = muestras ? "pinterest/muestras-color" : "pinterest/pines-color";
  fs.mkdirSync(destino, { recursive: true });
  const files = [];
  (function w(d) { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); fs.statSync(p).isDirectory() ? w(p) : f.endsWith(".md") && files.push(p); } })("src/content/poemas");

  let n = 0, semilla = 0;
  for (const f of files) {
    const p = leerPoema(f);
    const slug = path.basename(f, ".md");
    const elegidas = p.estrofas.filter((e) => e.length >= 3).slice(0, muestras ? 1 : 3);
    for (let i = 0; i < elegidas.length; i++) {
      const dir = muestras ? destino : path.join(destino, p.categoria.replace(/[\/:*?"<>|]/g, ""));
      fs.mkdirSync(dir, { recursive: true });
      await sharp(svgColor({ titulo: p.h1, versos: elegidas[i].slice(0, 4), semilla }))
        .png().toFile(path.join(dir, `${slug}-${i + 1}.png`));
      semilla++; n++;
    }
    if (muestras && n >= 8) break;
  }
  console.log(`pines color: ${n} -> ${destino}`);
})();
