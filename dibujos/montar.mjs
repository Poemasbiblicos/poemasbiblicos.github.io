/**
 * Monta los dibujos para colorear: añade el versículo en letra hueca bajo cada
 * dibujo y genera la versión web, un PDF por dibujo y un PDF con los 10.
 *
 * Entrada:  dibujos/originales/*.jpg|png  (descargados de Canva, sin renombrar)
 * Salida:   public/dibujos/<slug>.webp
 *           public/dibujos/pdf/<slug>.pdf
 *           public/dibujos/pdf/dibujos-biblicos-para-colorear.pdf
 *           dibujos/_REVISION.jpg  (hoja para revisar todo de un vistazo)
 *
 * Uso: node dibujos/montar.mjs
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { PDFDocument } from "pdf-lib";
import { dibujos } from "../src/data/dibujos.js";

const ORIG = "dibujos/originales";
const WEB = "public/dibujos";
const PDF = "public/dibujos/pdf";
const W = 1700, H = 2200; // carta a 200 ppp
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function envolver(t, max) { const o = []; let l = ""; for (const p of t.split(" ")) { if ((l + " " + p).trim().length <= max) l = (l + " " + p).trim(); else { if (l) o.push(l); l = p; } } if (l) o.push(l); return o; }

function buscarOriginal(d) {
  const archivos = fs.readdirSync(ORIG).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
  return archivos.find((f) => f.startsWith(d.canva)) || archivos.find((f) => f.toLowerCase().includes(d.slug));
}

function capaTexto(d) {
  const lineas = envolver(d.verso, 30);
  const tam = [100, 86, 72][Math.min(lineas.length, 3) - 1];
  const y0 = 1880 - (lineas.length - 1) * tam * 0.85;
  const texto = lineas.map((l, i) =>
    `<text x="${W / 2}" y="${y0 + i * tam * 1.12}" text-anchor="middle" font-family="Kristen ITC, Segoe Print" font-size="${tam}"
      fill="#ffffff" stroke="#000000" stroke-width="3.5" paint-order="stroke">${esc(l)}</text>`).join("");
  const yCita = y0 + (lineas.length - 1) * tam * 1.12 + 78;
  return Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    ${texto}
    <text x="${W / 2}" y="${yCita}" text-anchor="middle" font-family="Georgia" font-style="italic" font-size="44" fill="#000">${esc(d.cita)}</text>
    <text x="${W / 2}" y="${H - 40}" text-anchor="middle" font-family="Segoe UI" font-size="26" fill="#777">poemasbiblicos.github.io</text>
  </svg>`);
}

async function pagina(d, archivo) {
  const n = envolver(d.verso, 30).length;
  const alto = 1680 - (n - 1) * 130;
  const dibujo = await sharp(path.join(ORIG, archivo)).resize({ height: alto, width: W - 160, fit: "inside" }).toBuffer();
  const meta = await sharp(dibujo).metadata();
  return sharp({ create: { width: W, height: H, channels: 3, background: "#ffffff" } })
    .composite([{ input: dibujo, left: Math.round((W - meta.width) / 2), top: 60 }, { input: capaTexto(d) }])
    .png().toBuffer();
}

fs.mkdirSync(PDF, { recursive: true });
const todos = await PDFDocument.create();
const miniaturas = [];
const faltan = [];

for (const d of dibujos) {
  const archivo = buscarOriginal(d);
  if (!archivo) { faltan.push(d.titulo); continue; }
  const png = await pagina(d, archivo);

  await sharp(png).resize({ width: 900 }).webp({ quality: 82 }).toFile(path.join(WEB, `${d.slug}.webp`));

  const jpg = await sharp(png).jpeg({ quality: 90 }).toBuffer();
  const uno = await PDFDocument.create();
  for (const doc of [uno, todos]) {
    const img = await doc.embedJpg(jpg);
    const p = doc.addPage([612, 792]); // carta en puntos
    p.drawImage(img, { x: 0, y: 0, width: 612, height: 792 });
  }
  fs.writeFileSync(path.join(PDF, `${d.slug}.pdf`), await uno.save());
  miniaturas.push(await sharp(png).resize({ width: 425 }).toBuffer());
}

if (miniaturas.length) {
  fs.writeFileSync(path.join(PDF, "dibujos-biblicos-para-colorear.pdf"), await todos.save());
  const cols = 5, tw = 425, th = 550, pad = 10;
  await sharp({ create: { width: pad + cols * (tw + pad), height: pad + Math.ceil(miniaturas.length / cols) * (th + pad), channels: 3, background: "#444" } })
    .composite(miniaturas.map((m, i) => ({ input: m, left: pad + (i % cols) * (tw + pad), top: pad + Math.floor(i / cols) * (th + pad) })))
    .jpeg({ quality: 85 }).toFile("dibujos/_REVISION.jpg");
}
console.log(`montados: ${miniaturas.length}/${dibujos.length}` + (faltan.length ? ` | faltan originales: ${faltan.join(", ")}` : ""));
