/**
 * Genera pines de Pinterest (1000x1500) a partir de los poemas del sitio.
 * Uso:  node pinterest/generar-pines.js [slug-del-poema]   (sin argumento: todos)
 */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const W = 1000, H = 1500;
const SALIDA = "pinterest/pines";
const SERIF = "Georgia, 'Times New Roman', serif";
const SANS = "Segoe UI, Arial, sans-serif";
const DOMINIO = "poemasbiblicos.github.io";

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// parte un verso largo en varias lineas segun ancho aproximado
function envolver(texto, maxChars) {
  const palabras = texto.split(" ");
  const lineas = []; let actual = "";
  for (const p of palabras) {
    if ((actual + " " + p).trim().length <= maxChars) actual = (actual + " " + p).trim();
    else { if (actual) lineas.push(actual); actual = p; }
  }
  if (actual) lineas.push(actual);
  return lineas;
}

function leerPoema(file) {
  const t = fs.readFileSync(file, "utf8");
  const partes = t.split(/^---\s*$/m);
  const fm = partes[1] || "", cuerpo = partes.slice(2).join("---");
  const campo = (k) => {
    for (const l of fm.split(/\r?\n/)) {
      const i = l.indexOf(":");
      if (i > 0 && !/^\s/.test(l) && l.slice(0, i).trim() === k)
        return l.slice(i + 1).trim().replace(/^"/, "").replace(/"$/, "");
    }
    return "";
  };
  const h1 = (cuerpo.match(/^# (.+)$/m) || [])[1] || campo("title");
  // estrofas: bloques consecutivos de versos terminados en <br>
  const estrofas = [];
  let bloque = [], subtitulo = "";
  const subs = {};
  for (const linea of cuerpo.split(/\r?\n/)) {
    const s = linea.trim();
    if (/^\*[^*].*\*$/.test(s)) subtitulo = s.replace(/^\*|\*$/g, "");
    if (s.endsWith("<br>")) bloque.push(s.replace(/<br>$/, "").trim());
    else if (bloque.length) { estrofas.push({ versos: bloque, subtitulo }); bloque = []; }
  }
  if (bloque.length) estrofas.push({ versos: bloque, subtitulo });
  return { h1, categoria: campo("category"), imagen: campo("heroImage"), estrofas };
}

function svgPin({ titulo, categoria, versos, subtitulo, velo }) {
  const V = velo || VELOS[0];
  const tit = envolver(titulo, 22);
  const yTit = 310;
  const lineasTit = tit.map((l, i) =>
    `<text x="${W/2}" y="${yTit + i*76}" text-anchor="middle" font-family="${SERIF}" font-size="66" font-weight="bold" fill="#ffffff">${esc(l)}</text>`).join("");

  // cuerpo adaptativo: el verso mas largo decide el tamano, para que casi ninguno se parta
  const masLargo = Math.max(...versos.map(v => v.length));
  const fs_ = masLargo <= 40 ? 37 : masLargo <= 48 ? 34 : masLargo <= 56 ? 30 : 27;
  const maxCh = Math.floor(840 / (fs_ * 0.46));
  const salto = Math.round(fs_ * 1.62);

  const versosEnv = versos.flatMap(v => envolver(v, maxCh));
  const alto = versosEnv.length * salto;
  const yV = 790 - alto/2;
  const lineasV = versosEnv.map((l, i) =>
    `<text x="${W/2}" y="${yV + i*salto}" text-anchor="middle" font-family="${SERIF}" font-size="${fs_}" font-style="italic" fill="#fdf6e8">${esc(l)}</text>`).join("");

  const ySub = yV + alto + 100;
  const sub = subtitulo
    ? `<text x="${W/2}" y="${ySub}" text-anchor="middle" font-family="${SERIF}" font-size="27" font-style="italic" letter-spacing="1" fill="#dcbd85">${esc(subtitulo)}</text>` : "";

  return Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="v" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="${V.tinte}" stop-opacity="${V.a}"/>
      <stop offset="42%"  stop-color="${V.tinte}" stop-opacity="${V.b}"/>
      <stop offset="100%" stop-color="${V.tinte}" stop-opacity="${V.c}"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#v)"/>
  <rect x="${W/2-45}" y="200" width="90" height="2" fill="#e8c88a"/>
  ${lineasTit}
  <rect x="${W/2-38}" y="${yV-90}" width="76" height="1" fill="rgba(232,200,138,.55)"/>
  ${lineasV}
  ${sub}
  <rect x="${W/2-38}" y="1330" width="76" height="1" fill="rgba(232,200,138,.55)"/>
  <text x="${W/2}" y="1395" text-anchor="middle" font-family="${SANS}" font-size="26" letter-spacing="4" fill="#f0e3cc">${DOMINIO}</text>
</svg>`);
}

// banco de fondos: todas las imagenes salvo las de proposito especial
function bancoDeFondos() {
  const pool = [];
  for (const d of ["public/images", "public/images/reflexion"])
    for (const f of fs.readdirSync(d))
      if (f.endsWith(".jpg") && !["og-image.jpg", "hero-poemas-biblicos.jpg"].includes(f))
        pool.push(path.join(d, f));
  return pool;
}

// tres tratamientos de velo para que un mismo fondo no se repita igual
const VELOS = [
  { a: 0.86, b: 0.60, c: 0.90, tinte: "#241a0e" },
  { a: 0.80, b: 0.52, c: 0.88, tinte: "#1d1710" },
  { a: 0.88, b: 0.66, c: 0.92, tinte: "#2b1d0d" },
];
const RECORTES = ["attention", "centre", "top", "entropy"];

(async () => {
  const filtro = process.argv[2];
  const files = [];
  (function w(d){ for (const f of fs.readdirSync(d)) { const p = path.join(d,f);
    fs.statSync(p).isDirectory() ? w(p) : f.endsWith(".md") && files.push(p); } })("src/content/poemas");

  fs.mkdirSync(SALIDA, { recursive: true });
  const pool = bancoDeFondos();
  let n = 0, k = 0;
  for (const f of files) {
    const slug = path.basename(f, ".md");
    if (filtro && slug !== filtro) continue;
    const p = leerPoema(f);
    const propia = path.join("public", p.imagen.replace(/^\//, ""));

    // una estrofa de cada poema del articulo (max 3 pines por articulo)
    const elegidas = p.estrofas.filter(e => e.versos.length >= 3).slice(0, 3);
    for (let i = 0; i < elegidas.length; i++) {
      // el primer pin usa la imagen de su categoria; los demas rotan por todo el banco
      const fondo = i === 0 && fs.existsSync(propia) ? propia : pool[k % pool.length];
      if (!fs.existsSync(fondo)) continue;
      const recorte = RECORTES[k % RECORTES.length];
      const velo = VELOS[k % VELOS.length];
      k++;

      const base = await sharp(fs.readFileSync(fondo))
        .resize(W, H, { fit: "cover", position: recorte }).toBuffer();
      // cada pin va a la subcarpeta de su tablero, para subirlos por bloques
      const carpetaTablero = p.categoria.replace(/[\/:*?"<>|]/g, "");
      const dir = path.join(SALIDA, carpetaTablero);
      fs.mkdirSync(dir, { recursive: true });
      const out = path.join(dir, `${slug}-${i + 1}.png`);
      await sharp(base)
        .composite([{ input: svgPin({ titulo: p.h1, categoria: p.categoria,
            versos: elegidas[i].versos.slice(0, 4), subtitulo: elegidas[i].subtitulo, velo }) }])
        .png({ quality: 90 }).toFile(out);
      n++;
    }
  }
  console.log("pines generados:", n, "->", SALIDA);
})();
