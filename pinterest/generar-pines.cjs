/**
 * Genera pines de Pinterest (1000x1500) a partir de los poemas del sitio.
 *
 * Cada tablero tiene su propio diseno (tipografias y ornamento lateral propios),
 * definido en estilos.cjs. Toda la familia comparte la misma gama de color.
 *
 * Uso:
 *   node pinterest/generar-pines.cjs                  -> todos los pines
 *   node pinterest/generar-pines.cjs slug-del-poema   -> solo ese poema
 *   node pinterest/generar-pines.cjs --muestras       -> 1 pin por tablero, en pinterest/muestras
 */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const { ORNAMENTOS, CREMA, CREMA_2, estiloDe } = require("./estilos.cjs");

const W = 1000, H = 1500;
const SALIDA = "pinterest/pines";
const SANS = "Segoe UI, Arial, sans-serif";
const DOMINIO = "poemasbiblicos.github.io";

// margen interior del texto: deja libres las bandas laterales del ornamento
const ANCHO_TEXTO = 720;

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

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
  const estrofas = [];
  let bloque = [], subtitulo = "";
  for (const linea of cuerpo.split(/\r?\n/)) {
    const s = linea.trim();
    if (/^\*[^*].*\*$/.test(s)) {
      const cand = s.replace(/^\*|\*$/g, "");
      // descarta notas editoriales: no son subtitulos poeticos
      if (!/Actitud l[ií]rica|Temple de [aá]nimo/i.test(cand)) subtitulo = cand;
    }
    if (s.endsWith("<br>")) bloque.push(s.replace(/<br>$/, "").trim());
    else if (bloque.length) { estrofas.push({ versos: bloque, subtitulo }); bloque = []; }
  }
  if (bloque.length) estrofas.push({ versos: bloque, subtitulo });
  return { h1, categoria: campo("category"), imagen: campo("heroImage"), estrofas };
}

function svgPin({ titulo, versos, subtitulo, velo, estilo }) {
  const acento = estilo.acento;

  // ---- titulo
  const escalaTit = estilo.tituloEscala || 1;
  const tamTit = Math.round(62 * escalaTit);
  const tit = envolver(titulo, Math.round(23 / escalaTit));
  const yTit = 300;
  const espaciado = estilo.versalita ? 3 : 0;
  const lineasTit = tit.map((l, i) =>
    `<text x="${W / 2}" y="${yTit + i * Math.round(tamTit * 1.16)}" text-anchor="middle"
       font-family="${estilo.titulo}" font-size="${tamTit}" font-weight="bold"
       letter-spacing="${espaciado}" fill="${CREMA}">${esc(estilo.versalita ? l.toUpperCase() : l)}</text>`).join("");
  const finTit = yTit + (tit.length - 1) * Math.round(tamTit * 1.16);

  // ---- versos, con tamano adaptado al verso mas largo
  const masLargo = Math.max(...versos.map((v) => v.length));
  const fs_ = masLargo <= 40 ? 37 : masLargo <= 48 ? 34 : masLargo <= 56 ? 30 : 27;
  const maxCh = Math.floor(ANCHO_TEXTO / (fs_ * 0.46));
  const salto = Math.round(fs_ * 1.62);
  const versosEnv = versos.flatMap((v) => envolver(v, maxCh));
  const alto = versosEnv.length * salto;
  const yV = 820 - alto / 2;
  const lineasV = versosEnv.map((l, i) =>
    `<text x="${W / 2}" y="${yV + i * salto}" text-anchor="middle" font-family="${estilo.versos}"
       font-size="${fs_}" font-style="italic" fill="${CREMA}">${esc(l)}</text>`).join("");

  const ySub = yV + alto + 96;
  const sub = subtitulo
    ? `<text x="${W / 2}" y="${ySub}" text-anchor="middle" font-family="${estilo.versos}"
         font-size="27" font-style="italic" letter-spacing="1" fill="${acento}">${esc(subtitulo)}</text>` : "";

  // ---- ornamento lateral, espejado a la derecha
  const orn = ORNAMENTOS[estilo.ornamento] || ORNAMENTOS.filete;
  const banda = orn(finTit + 90, Math.max(ySub, yV + alto) + 70, acento);
  const ornamentos = `
    <g>${banda}</g>
    <g transform="translate(${W},0) scale(-1,1)">${banda}</g>`;

  return Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="v" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="${estilo.tinte}" stop-opacity="${velo.a}"/>
      <stop offset="42%"  stop-color="${estilo.tinte}" stop-opacity="${velo.b}"/>
      <stop offset="100%" stop-color="${estilo.tinte}" stop-opacity="${velo.c}"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#v)"/>
  <rect x="${W / 2 - 45}" y="196" width="90" height="2" fill="${acento}"/>
  ${lineasTit}
  ${ornamentos}
  ${lineasV}
  ${sub}
  <rect x="${W / 2 - 38}" y="1330" width="76" height="1" fill="${acento}" opacity=".55"/>
  <text x="${W / 2}" y="1395" text-anchor="middle" font-family="${SANS}" font-size="26"
    letter-spacing="4" fill="${CREMA_2}">${DOMINIO}</text>
</svg>`);
}

function bancoDeFondos() {
  const pool = [];
  for (const d of ["public/images", "public/images/reflexion"])
    for (const f of fs.readdirSync(d))
      if (f.endsWith(".jpg") && !["og-image.jpg", "hero-poemas-biblicos.jpg"].includes(f))
        pool.push(path.join(d, f));
  return pool;
}

const VELOS = [
  { a: 0.86, b: 0.60, c: 0.90 },
  { a: 0.80, b: 0.52, c: 0.88 },
  { a: 0.88, b: 0.66, c: 0.92 },
];
const RECORTES = ["attention", "centre", "top", "entropy"];

(async () => {
  const arg = process.argv[2];
  const soloMuestras = arg === "--muestras";
  const filtro = soloMuestras ? null : arg;
  const destinoRaiz = soloMuestras ? "pinterest/muestras" : SALIDA;

  const files = [];
  (function w(d) {
    for (const f of fs.readdirSync(d)) {
      const p = path.join(d, f);
      fs.statSync(p).isDirectory() ? w(p) : f.endsWith(".md") && files.push(p);
    }
  })("src/content/poemas");

  fs.mkdirSync(destinoRaiz, { recursive: true });
  const pool = bancoDeFondos();
  const vistos = new Set();
  // la imagen propia de la categoria se usa UNA vez por tablero; el resto rota
  // por todo el banco, para que dentro de un tablero no se repita el fondo
  const usadaPropia = new Set();
  let n = 0, k = 0;

  // Nombres de carpeta "NN - Categoria (N pines)": el CSV del calendario los usa.
  const cuenta = {};
  for (const f of files) {
    const p = leerPoema(f);
    const nPines = p.estrofas.filter((e) => e.versos.length >= 3).slice(0, 3).length;
    cuenta[p.categoria] = (cuenta[p.categoria] || 0) + nPines;
  }
  const orden = Object.entries(cuenta).sort((a, b) => b[1] - a[1]).map(([c]) => c);
  const nombreCarpeta = (cat) => {
    const i = orden.indexOf(cat) + 1;
    const limpio = cat.replace(/[\/:*?"<>|]/g, "");
    return `${String(i).padStart(2, "0")} - ${limpio} (${cuenta[cat]} pines)`;
  };

  for (const f of files) {
    const slug = path.basename(f, ".md");
    if (filtro && slug !== filtro) continue;
    const p = leerPoema(f);

    // en modo muestras basta un pin por tablero
    if (soloMuestras && vistos.has(p.categoria)) continue;

    const estilo = estiloDe(p.categoria);
    const propia = path.join("public", p.imagen.replace(/^\//, ""));
    const elegidas = p.estrofas.filter((e) => e.versos.length >= 3).slice(0, soloMuestras ? 1 : 3);
    if (soloMuestras && elegidas.length) vistos.add(p.categoria);

    for (let i = 0; i < elegidas.length; i++) {
      const primeraDeTablero = i === 0 && !usadaPropia.has(p.categoria);
      const fondo = primeraDeTablero && fs.existsSync(propia) ? propia : pool[k % pool.length];
      if (primeraDeTablero && fs.existsSync(propia)) usadaPropia.add(p.categoria);
      if (!fs.existsSync(fondo)) continue;
      const recorte = RECORTES[k % RECORTES.length];
      const velo = VELOS[k % VELOS.length];
      k++;

      const base = await sharp(fs.readFileSync(fondo))
        .resize(W, H, { fit: "cover", position: recorte }).toBuffer();

      const carpeta = soloMuestras
        ? p.categoria.replace(/[\/:*?"<>|]/g, "")
        : nombreCarpeta(p.categoria);
      const dir = soloMuestras ? destinoRaiz : path.join(destinoRaiz, carpeta);
      fs.mkdirSync(dir, { recursive: true });
      const out = soloMuestras
        ? path.join(dir, `${carpeta}.png`)
        : path.join(dir, `${slug}-${i + 1}.png`);

      await sharp(base)
        .composite([{ input: svgPin({
          titulo: p.h1, versos: elegidas[i].versos.slice(0, 4),
          subtitulo: elegidas[i].subtitulo, velo, estilo }) }])
        .png({ quality: 90 }).toFile(out);
      n++;
    }
  }
  console.log(`pines generados: ${n} -> ${destinoRaiz}`);
})();
