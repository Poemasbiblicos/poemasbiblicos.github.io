/**
 * 10 plantillas de pin con la paleta de la web (cremas, oros y pardos),
 * cada una con una composicion distinta y letra mas libre.
 *
 * Uso: node pinterest/generar-pines-plantillas.cjs --muestras
 *      -> una muestra por plantilla en pinterest/muestras-plantillas
 */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const W = 1000, H = 1500;
const DOM = "poemasbiblicos.github.io";
const C = { crema: "#fdf6e8", crema2: "#f0e3cc", arena: "#e6d2a8", oro: "#c9a227", oroSuave: "#e8c88a",
  bronce: "#b08445", cafe: "#6b4a2b", marron: "#3b2a17", oscuro: "#241a0e" };
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function env(t, max) { const o = []; let l = ""; for (const p of t.split(" ")) { if ((l + " " + p).trim().length <= max) l = (l + " " + p).trim(); else { if (l) o.push(l); l = p; } } if (l) o.push(l); return o; }
function lineas(arr, x, y0, salto, attrs, anchor = "middle") { return arr.map((l, i) => `<text x="${x}" y="${y0 + i * salto}" text-anchor="${anchor}" ${attrs}>${esc(l)}</text>`).join(""); }
function versosEnv(versos, ancho, fs_) { return versos.flatMap((v) => env(v, Math.floor(ancho / (fs_ * 0.46)))); }
function tamVerso(versos, base) { const m = Math.max(...versos.map((v) => v.length)); return m <= 38 ? base : m <= 46 ? base - 4 : m <= 54 ? base - 8 : base - 11; }
const pie = (color, fam = "Segoe Print") => `<text x="${W / 2}" y="1430" text-anchor="middle" font-family="${fam}" font-size="28" fill="${color}">${DOM}</text>`;

// ------------------------------------------------------------------ plantillas
const P = [];

// 1. Degradado calido con manchas y tarjeta translucida (la elegida de la tanda anterior)
P.push(({ titulo, versos }) => {
  const lt = env(titulo, 14), fs_ = tamVerso(versos, 44), v = versosEnv(versos, 740, fs_), s = fs_ * 1.7;
  const yV = 330 + lt.length * 110 + 140;
  return `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.crema}"/><stop offset="1" stop-color="${C.oroSuave}"/></linearGradient></defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <ellipse cx="780" cy="300" rx="330" ry="260" fill="${C.crema}" opacity=".55"/><ellipse cx="220" cy="1150" rx="360" ry="300" fill="${C.crema2}" opacity=".6"/>
  <g transform="rotate(-3 500 300)">${lineas(lt, 500, 300, 110, `font-family="Bradley Hand ITC" font-size="100" fill="${C.marron}"`)}
  <path d="M 300 ${300 + (lt.length - 1) * 110 + 40} q 100 -14 200 0 t 200 -6" fill="none" stroke="${C.bronce}" stroke-width="7" stroke-linecap="round"/></g>
  <rect x="110" y="${yV - 90}" width="780" height="${v.length * s + 120}" rx="46" fill="#fff" opacity=".55"/>
  ${lineas(v, 500, yV, s, `font-family="Segoe Print" font-size="${fs_}" fill="${C.marron}"`)}
  ${[[90, 160], [900, 620], [120, 800], [880, 1250], [500, 1330]].map(([x, y]) => `<path d="M ${x} ${y - 18} L ${x + 5} ${y - 5} L ${x + 18} ${y} L ${x + 5} ${y + 5} L ${x} ${y + 18} L ${x - 5} ${y + 5} L ${x - 18} ${y} L ${x - 5} ${y - 5} Z" fill="${C.oro}"/>`).join("")}
  ${pie(C.cafe)}`;
});

// 2. Crema liso con marco dibujado a mano
P.push(({ titulo, versos }) => {
  const lt = env(titulo, 16), fs_ = tamVerso(versos, 48), v = versosEnv(versos, 720, fs_), s = fs_ * 1.75;
  const yV = 260 + lt.length * 96 + 190;
  const marco = (d, w) => `<path d="M ${70 + d} ${80 - d} Q 500 ${60 + d} ${930 - d} ${85 + d} Q ${950 - d} 750 ${925 + d} ${1420 - d} Q 500 ${1440 - d} ${75 - d} ${1415 + d} Q ${55 + d} 750 ${70 + d} ${80 - d} Z" fill="none" stroke="${C.bronce}" stroke-width="${w}" stroke-linecap="round"/>`;
  return `<rect width="${W}" height="${H}" fill="${C.crema}"/>${marco(0, 5)}${marco(14, 2)}
  ${lineas(lt, 500, 260, 96, `font-family="Kristen ITC" font-size="80" fill="${C.marron}"`)}
  <text x="500" y="${260 + lt.length * 96 + 60}" text-anchor="middle" font-family="Georgia" font-size="46" fill="${C.oro}">~ ✦ ~</text>
  ${lineas(v, 500, yV, s, `font-family="Ink Free" font-size="${fs_}" fill="${C.marron}"`)}
  ${pie(C.bronce, "Kristen ITC")}`;
});

// 3. Fondo oscuro, comilla dorada gigante y verso protagonista
P.push(({ titulo, versos }) => {
  const fs_ = tamVerso(versos, 52), v = versosEnv(versos, 760, fs_), s = fs_ * 1.6;
  const yV = Math.min(620, 1180 - v.length * s);
  return `<rect width="${W}" height="${H}" fill="${C.oscuro}"/>
  <text x="120" y="520" font-family="Georgia" font-size="420" fill="${C.oro}" opacity=".35">“</text>
  ${lineas(v, 500, yV, s, `font-family="Segoe Print" font-size="${fs_}" fill="${C.crema}"`)}
  <line x1="380" y1="${yV + v.length * s + 40}" x2="620" y2="${yV + v.length * s + 40}" stroke="${C.oro}" stroke-width="3"/>
  ${lineas(env(titulo, 26), 500, yV + v.length * s + 110, 52, `font-family="Georgia" font-style="italic" font-size="40" fill="${C.oroSuave}"`)}
  ${pie(C.arena)}`;
});

// 4. Dos bloques horizontales: arena arriba con titulo, crema abajo con versos
P.push(({ titulo, versos }) => {
  const lt = env(titulo, 15), fs_ = tamVerso(versos, 42), v = versosEnv(versos, 760, fs_), s = fs_ * 1.7;
  return `<rect width="${W}" height="${H}" fill="${C.crema}"/>
  <path d="M 0 0 H 1000 V 560 Q 750 640 500 580 T 0 600 Z" fill="${C.bronce}"/>
  ${lineas(lt, 500, 260, 104, `font-family="Bradley Hand ITC" font-size="96" fill="${C.crema}"`)}
  ${lineas(v, 500, 800, s, `font-family="Segoe Print" font-size="${fs_}" fill="${C.marron}"`)}
  <circle cx="500" cy="720" r="10" fill="${C.oro}"/>
  ${pie(C.bronce)}`;
});

// 5. Arco de vitral sobre fondo dorado
P.push(({ titulo, versos }) => {
  const lt = env(titulo, 16), fs_ = tamVerso(versos, 40), v = versosEnv(versos, 620, fs_), s = fs_ * 1.7;
  return `<rect width="${W}" height="${H}" fill="${C.oroSuave}"/>
  <path d="M 140 1360 V 520 A 360 380 0 0 1 860 520 V 1360 Z" fill="${C.crema}"/>
  <path d="M 170 1330 V 530 A 330 350 0 0 1 830 530 V 1330 Z" fill="none" stroke="${C.bronce}" stroke-width="3"/>
  ${lineas(lt, 500, 420, 86, `font-family="Segoe Script" font-size="70" fill="${C.marron}"`)}
  ${lineas(v, 500, 420 + lt.length * 86 + 150, s, `font-family="Georgia" font-style="italic" font-size="${fs_}" fill="${C.cafe}"`)}
  <text x="500" y="1440" text-anchor="middle" font-family="Georgia" font-size="28" fill="${C.marron}">${DOM}</text>`;
});

// 6. Nota de papel inclinada con cinta adhesiva
P.push(({ titulo, versos }) => {
  const lt = env(titulo, 16), fs_ = tamVerso(versos, 40), v = versosEnv(versos, 640, fs_), s = fs_ * 1.75;
  const alto = 160 + lt.length * 84 + v.length * s + 120;
  return `<rect width="${W}" height="${H}" fill="${C.cafe}"/>
  ${Array.from({ length: 40 }, (_, i) => `<circle cx="${(i * 137) % 1000}" cy="${(i * 263) % 1500}" r="3" fill="${C.arena}" opacity=".25"/>`).join("")}
  <g transform="rotate(-4 500 750)">
    <rect x="130" y="${750 - alto / 2}" width="740" height="${alto}" fill="${C.crema}"/>
    ${Array.from({ length: 12 }, (_, i) => `<line x1="160" x2="840" y1="${750 - alto / 2 + 150 + i * 64}" y2="${750 - alto / 2 + 150 + i * 64}" stroke="${C.oroSuave}" stroke-width="1.5" opacity=".6"/>`).join("")}
    <rect x="410" y="${750 - alto / 2 - 30}" width="180" height="60" fill="${C.arena}" opacity=".85" transform="rotate(3 500 ${750 - alto / 2})"/>
    ${lineas(lt, 500, 750 - alto / 2 + 130, 84, `font-family="Bradley Hand ITC" font-size="76" fill="${C.marron}"`)}
    ${lineas(v, 500, 750 - alto / 2 + 150 + lt.length * 84 + 50, s, `font-family="Ink Free" font-size="${fs_}" fill="${C.cafe}"`)}
  </g>${pie(C.crema)}`;
});

// 7. Palabra clave gigante de fondo
P.push(({ titulo, versos, clave }) => {
  const fs_ = tamVerso(versos, 44), v = versosEnv(versos, 760, fs_), s = fs_ * 1.7;
  return `<rect width="${W}" height="${H}" fill="${C.crema2}"/>
  <text x="500" y="820" text-anchor="middle" font-family="Georgia" font-weight="bold" font-size="${clave.length <= 4 ? 520 : clave.length <= 7 ? 320 : 230}" fill="${C.oroSuave}" opacity=".55">${esc(clave.toUpperCase())}</text>
  ${lineas(env(titulo, 18), 500, 250, 90, `font-family="Kristen ITC" font-size="76" fill="${C.marron}"`)}
  ${lineas(v, 500, 640, s, `font-family="Segoe Print" font-size="${fs_}" fill="${C.oscuro}"`)}
  ${pie(C.bronce)}`;
});

// 8. Sol dorado con rayos y titulo dentro
P.push(({ titulo, versos }) => {
  const lt = env(titulo, 12), fs_ = tamVerso(versos, 48), v = versosEnv(versos, 760, fs_), s = fs_ * 1.7;
  const rayos = Array.from({ length: 24 }, (_, i) => { const a = (i * 15) * Math.PI / 180; return `<line x1="${500 + Math.cos(a) * 300}" y1="${440 + Math.sin(a) * 300}" x2="${500 + Math.cos(a) * (i % 2 ? 360 : 400)}" y2="${440 + Math.sin(a) * (i % 2 ? 360 : 400)}" stroke="${C.oro}" stroke-width="6" stroke-linecap="round"/>`; }).join("");
  return `<rect width="${W}" height="${H}" fill="${C.crema}"/>${rayos}<circle cx="500" cy="440" r="270" fill="${C.oroSuave}"/>
  ${lineas(lt, 500, 440 - (lt.length - 1) * 42 + 20, 84, `font-family="Segoe Print" font-weight="bold" font-size="66" fill="${C.marron}"`)}
  ${lineas(v, 500, 960, s, `font-family="Ink Free" font-size="${fs_}" fill="${C.cafe}"`)}
  ${pie(C.bronce)}`;
});

// 9. Rama de olivo lateral y texto alineado a la izquierda
P.push(({ titulo, versos }) => {
  const lt = env(titulo, 12), fs_ = tamVerso(versos, 40), v = versosEnv(versos, 540, fs_), s = fs_ * 1.75;
  const hojas = Array.from({ length: 11 }, (_, i) => { const y = 200 + i * 105, lado = i % 2 ? 1 : -1; return `<ellipse cx="${830 + lado * 34}" cy="${y}" rx="44" ry="16" fill="${C.bronce}" opacity=".8" transform="rotate(${lado * 35} ${830 + lado * 34} ${y})"/>`; }).join("");
  return `<rect width="${W}" height="${H}" fill="${C.crema}"/>
  <path d="M 830 140 Q 800 700 840 1320" fill="none" stroke="${C.cafe}" stroke-width="5"/>${hojas}
  ${lineas(lt, 110, 280, 96, `font-family="Bradley Hand ITC" font-size="90" fill="${C.marron}"`, "start")}
  <line x1="110" y1="${280 + lt.length * 96 - 30}" x2="330" y2="${280 + lt.length * 96 - 30}" stroke="${C.oro}" stroke-width="5" stroke-linecap="round"/>
  ${lineas(v, 110, 280 + lt.length * 96 + 110, s, `font-family="Segoe Print" font-size="${fs_}" fill="${C.cafe}"`, "start")}
  <text x="110" y="1430" font-family="Segoe Print" font-size="28" fill="${C.bronce}">${DOM}</text>`;
});

// 10. Esquinas florales y fondo punteado
P.push(({ titulo, versos }) => {
  const lt = env(titulo, 15), fs_ = tamVerso(versos, 42), v = versosEnv(versos, 700, fs_), s = fs_ * 1.75;
  const flor = (x, y, r) => Array.from({ length: 6 }, (_, i) => `<ellipse cx="${x}" cy="${y - r}" rx="${r * 0.45}" ry="${r}" fill="${C.oroSuave}" transform="rotate(${i * 60} ${x} ${y})"/>`).join("") + `<circle cx="${x}" cy="${y}" r="${r * 0.4}" fill="${C.bronce}"/>`;
  const esquina = (x, y) => flor(x, y, 44) + flor(x + (x < 500 ? 100 : -100), y + (y < 750 ? 30 : -30), 26) + flor(x + (x < 500 ? 30 : -30), y + (y < 750 ? 100 : -100), 22);
  const puntos = Array.from({ length: 300 }, (_, i) => `<circle cx="${(i % 20) * 52 + 10}" cy="${Math.floor(i / 20) * 100 + 30}" r="2.5" fill="${C.arena}"/>`).join("");
  return `<rect width="${W}" height="${H}" fill="${C.crema}"/>${puntos}
  ${esquina(90, 90)}${esquina(910, 90)}${esquina(90, 1410)}${esquina(910, 1410)}
  ${lineas(lt, 500, 330, 94, `font-family="Segoe Script" font-size="76" fill="${C.marron}"`)}
  ${lineas(v, 500, 330 + lt.length * 94 + 150, s, `font-family="Georgia" font-style="italic" font-size="${fs_}" fill="${C.cafe}"`)}
  ${pie(C.bronce)}`;
});

// ------------------------------------------------------------------ lectura de poemas
function leer(file) {
  const t = fs.readFileSync(file, "utf8"); const partes = t.split(/^---\s*$/m);
  const cuerpo = partes.slice(2).join("---");
  const h1 = (cuerpo.match(/^# (.+)$/m) || [])[1] || "";
  const est = []; let b = [];
  for (const l of cuerpo.split(/\r?\n/)) { const s = l.trim(); if (s.endsWith("<br>")) b.push(s.replace(/<br>$/, "").trim()); else if (b.length) { est.push(b); b = []; } }
  if (b.length) est.push(b);
  return { h1, est };
}
const CLAVES = ["fe", "amor", "hogar", "esperanza", "dios", "gracia", "paz", "luz", "familia", "madre"];
const claveDe = (t) => CLAVES.find((k) => t.toLowerCase().includes(k)) || "fe";

async function modoCola(desde) {
  const SP = process.argv[3];
  const cola = JSON.parse(fs.readFileSync(path.join(SP, "cola.json"), "utf8"));
  const idx = {}; (function w(d) { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); fs.statSync(p).isDirectory() ? w(p) : f.endsWith(".md") && (idx[path.basename(f, ".md")] = p); } })("src/content/poemas");
  let n = 0, t = 0;
  for (let k = desde; k < cola.length; k++) {
    if ((k - desde) % 2 === 0) continue;               // pares: se queda el estilo actual
    const m = cola[k].nombre.match(/^(.*)-(\d+)\.png$/);
    const p = leer(idx[m[1]]); const est = p.est.filter((e) => e.length >= 3)[+m[2] - 1] || p.est[0];
    const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">${P[t % P.length]({ titulo: p.h1, versos: est.slice(0, 4), clave: claveDe(p.h1) })}</svg>`;
    await sharp(Buffer.from(svg)).png().toFile(path.join(SP, "q", String(k).padStart(3, "0") + ".png"));
    t++; n++;
  }
  console.log("reemplazadas con plantilla:", n);
}

(async () => {
  if (process.argv[2] === "--cola") return modoCola(+process.argv[4]);
  const dest = "pinterest/muestras-plantillas"; fs.mkdirSync(dest, { recursive: true });
  const files = []; (function w(d) { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); fs.statSync(p).isDirectory() ? w(p) : f.endsWith(".md") && files.push(p); } })("src/content/poemas");
  const poemas = files.map(leer).filter((p) => p.est.some((e) => e.length >= 3));
  for (let i = 0; i < P.length; i++) {
    const p = poemas[(i * 5 + 3) % poemas.length];
    const versos = p.est.find((e) => e.length >= 3).slice(0, 4);
    const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">${P[i]({ titulo: p.h1, versos, clave: claveDe(p.h1) })}</svg>`;
    await sharp(Buffer.from(svg)).png().toFile(path.join(dest, `plantilla-${String(i + 1).padStart(2, "0")}.png`));
  }
  console.log("plantillas:", P.length);
})();
