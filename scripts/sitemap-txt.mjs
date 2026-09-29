// Genera dist/sitemap.txt (una URL por linea) a partir del sitemap XML de Astro.
// Search Console acepta sitemaps en texto plano; es la alternativa cuando no
// consigue leer el XML, como pasa con algunos sitios en github.io.
import fs from "node:fs";

const xml = fs.readFileSync("dist/sitemap-0.xml", "utf8");
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
fs.writeFileSync("dist/sitemap.txt", urls.join("\n") + "\n");
console.log(`sitemap.txt: ${urls.length} URLs`);
