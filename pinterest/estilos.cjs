/**
 * Un estilo visual por tablero.
 *
 * Todos comparten la misma familia cromatica (cremas, oros y pardos calidos)
 * para que el perfil se lea como una sola marca; lo que cambia en cada tablero
 * es la pareja tipografica, el ornamento lateral y el matiz del acento.
 */

// Paleta comun. Ningun estilo sale de aqui.
const CREMA = "#fdf6e8";
const CREMA_2 = "#f0e3cc";

const ACENTOS = {
  oro: "#e8c88a",
  ambar: "#dcae6a",
  bronce: "#c9a06a",
  arena: "#dfc79a",
  miel: "#e3b978",
  rosaOro: "#dfb79c",
  trigo: "#e6d2a8",
};

const TINTES = {
  tierra: "#241a0e",
  sepia: "#1d1710",
  cacao: "#2b1d0d",
  nogal: "#221604",
};

/* ---------------------------------------------------------------- ornamentos
 * Cada funcion dibuja la banda IZQUIERDA dentro de x ∈ [0,110], y ∈ [y0,y1].
 * El generador la refleja para el lado derecho.
 */
const ORNAMENTOS = {
  // filete doble con un rombo en el centro
  filete: (y0, y1, c) => {
    const ym = (y0 + y1) / 2;
    return `
      <line x1="74" y1="${y0}" x2="74" y2="${y1}" stroke="${c}" stroke-width="2.9" opacity=".78"/>
      <line x1="84" y1="${y0 + 26}" x2="84" y2="${y1 - 26}" stroke="${c}" stroke-width="1.8" opacity=".78"/>
      <rect x="71" y="${ym - 9}" width="24" height="24" transform="rotate(45 80 ${ym})" fill="${c}" opacity=".90"/>`;
  },

  // barras angulares, sensacion de solidez
  angulos: (y0, y1, c) => `
      <line x1="72" y1="${y0}" x2="72" y2="${y1}" stroke="${c}" stroke-width="5.4" opacity=".80"/>
      <polyline points="72,${y0} 96,${y0 + 26} 72,${y0 + 52}" fill="none" stroke="${c}" stroke-width="4.3" opacity=".85"/>
      <polyline points="72,${y1} 96,${y1 - 26} 72,${y1 - 52}" fill="none" stroke="${c}" stroke-width="4.3" opacity=".85"/>`,

  // linea con cruz discreta
  cruz: (y0, y1, c) => {
    const ym = (y0 + y1) / 2;
    return `
      <line x1="78" y1="${y0}" x2="78" y2="${ym - 34}" stroke="${c}" stroke-width="2.7" opacity=".78"/>
      <line x1="78" y1="${ym + 34}" x2="78" y2="${y1}" stroke="${c}" stroke-width="2.7" opacity=".78"/>
      <line x1="78" y1="${ym - 22}" x2="78" y2="${ym + 22}" stroke="${c}" stroke-width="4.0" opacity=".95"/>
      <line x1="64" y1="${ym - 6}" x2="92" y2="${ym - 6}" stroke="${c}" stroke-width="4.0" opacity=".95"/>`;
  },

  // vid ondulada con hojas
  vid: (y0, y1, c) => {
    const alto = y1 - y0;
    let d = `M 78 ${y0}`;
    const pasos = 6, paso = alto / pasos;
    for (let i = 0; i < pasos; i++) {
      const dir = i % 2 === 0 ? 20 : -20;
      d += ` q ${dir} ${paso / 2} 0 ${paso}`;
    }
    const hojas = [];
    for (let i = 1; i < pasos; i++) {
      const y = y0 + i * paso;
      const lado = i % 2 === 0 ? 1 : -1;
      hojas.push(`<ellipse cx="${78 + lado * 15}" cy="${y}" rx="15" ry="7"
        transform="rotate(${lado * 28} ${78 + lado * 15} ${y})" fill="${c}" opacity=".80"/>`);
    }
    return `<path d="${d}" fill="none" stroke="${c}" stroke-width="3.1" opacity=".80"/>${hojas.join("")}`;
  },

  // tallo con flor de seis petalos
  flor: (y0, y1, c) => {
    const ym = (y0 + y1) / 2;
    const petalos = Array.from({ length: 6 }, (_, i) =>
      `<ellipse cx="78" cy="${ym - 15}" rx="7.5" ry="18"
         transform="rotate(${i * 60} 78 ${ym})" fill="${c}" opacity=".85"/>`).join("");
    return `
      <line x1="78" y1="${y0}" x2="78" y2="${ym - 30}" stroke="${c}" stroke-width="2.5" opacity=".78"/>
      <line x1="78" y1="${ym + 30}" x2="78" y2="${y1}" stroke="${c}" stroke-width="2.5" opacity=".78"/>
      ${petalos}
      <circle cx="78" cy="${ym}" r="6.5" fill="${CREMA}" opacity=".90"/>`;
  },

  // rayos de amanecer
  rayos: (y0, y1, c) => {
    const ym = (y0 + y1) / 2;
    const r = Array.from({ length: 5 }, (_, i) => {
      const ang = -50 + i * 25;
      return `<line x1="64" y1="${ym}" x2="${64 + 40 * Math.cos(ang * Math.PI / 180)}"
        y2="${ym + 40 * Math.sin(ang * Math.PI / 180)}" stroke="${c}" stroke-width="3.2" opacity=".80"/>`;
    }).join("");
    return `
      <line x1="78" y1="${y0}" x2="78" y2="${ym - 52}" stroke="${c}" stroke-width="2.3" opacity=".78"/>
      <line x1="78" y1="${ym + 52}" x2="78" y2="${y1}" stroke="${c}" stroke-width="2.3" opacity=".78"/>
      ${r}<circle cx="64" cy="${ym}" r="7.5" fill="${c}" opacity=".90"/>`;
  },

  // arcos concentricos, idea de cobijo
  arco: (y0, y1, c) => {
    const ym = (y0 + y1) / 2;
    return `
      <line x1="80" y1="${y0}" x2="80" y2="${y1}" stroke="${c}" stroke-width="2.5" opacity=".78"/>
      <path d="M 52 ${ym + 30} A 28 30 0 0 1 108 ${ym + 30}" fill="none" stroke="${c}" stroke-width="3.6" opacity=".90"/>
      <path d="M 62 ${ym + 30} A 18 20 0 0 1 98 ${ym + 30}" fill="none" stroke="${c}" stroke-width="2.5" opacity=".78"/>`;
  },

  // guirnalda de perlas
  perlas: (y0, y1, c) => {
    const n = 11, paso = (y1 - y0) / (n - 1);
    const p = Array.from({ length: n }, (_, i) =>
      `<circle cx="78" cy="${y0 + i * paso}" r="${i % 2 ? 4 : 7}" fill="${c}" opacity=".85"/>`).join("");
    return `<line x1="78" y1="${y0}" x2="78" y2="${y1}" stroke="${c}" stroke-width="1.6" opacity=".78"/>${p}`;
  },

  // pauta geometrica
  geometrico: (y0, y1, c) => {
    const n = 7, paso = (y1 - y0) / n;
    const g = Array.from({ length: n }, (_, i) =>
      `<rect x="${i % 2 ? 68 : 80}" y="${y0 + i * paso}" width="${i % 2 ? 28 : 13}" height="4" fill="${c}" opacity=".85"/>`).join("");
    return `<line x1="66" y1="${y0}" x2="66" y2="${y1}" stroke="${c}" stroke-width="2.2" opacity=".78"/>${g}`;
  },

  // compas de puntos
  ritmo: (y0, y1, c) => {
    const n = 9, paso = (y1 - y0) / (n - 1);
    const d = Array.from({ length: n }, (_, i) =>
      `<circle cx="${i % 3 === 0 ? 86 : 74}" cy="${y0 + i * paso}" r="${i % 3 === 0 ? 6.5 : 3.4}" fill="${c}" opacity=".80"/>`).join("");
    return d;
  },

  // estrellas pequenas
  estrellas: (y0, y1, c) => {
    const n = 6, paso = (y1 - y0) / (n - 1);
    return Array.from({ length: n }, (_, i) => {
      const y = y0 + i * paso, s = i % 2 ? 7 : 11, x = i % 2 ? 72 : 82;
      return `<path d="M ${x} ${y - s} L ${x + s * 0.3} ${y - s * 0.3} L ${x + s} ${y}
        L ${x + s * 0.3} ${y + s * 0.3} L ${x} ${y + s} L ${x - s * 0.3} ${y + s * 0.3}
        L ${x - s} ${y} L ${x - s * 0.3} ${y - s * 0.3} Z" fill="${c}" opacity=".85"/>`;
    }).join("");
  },

  // filete fino de trazo variable
  tallo: (y0, y1, c) => `
      <line x1="76" y1="${y0}" x2="76" y2="${y1}" stroke="${c}" stroke-width="2.2" opacity=".78"/>
      <line x1="76" y1="${y0}" x2="76" y2="${y0 + 60}" stroke="${c}" stroke-width="5.8" opacity=".90"/>
      <line x1="76" y1="${y1 - 60}" x2="76" y2="${y1}" stroke="${c}" stroke-width="5.8" opacity=".90"/>
      <circle cx="76" cy="${y0 + 74}" r="4.5" fill="${c}" opacity=".90"/>
      <circle cx="76" cy="${y1 - 74}" r="4.5" fill="${c}" opacity=".90"/>`,
};

/* -------------------------------------------------------------------- estilos
 * Clave = cadena exacta de `category` en el frontmatter.
 */
const ESTILOS = {
  "Poemas Cristianos para Reflexionar": {
    titulo: "Cambria, Georgia, serif", versos: "Constantia, Georgia, serif",
    ornamento: "filete", acento: ACENTOS.oro, tinte: TINTES.tierra,
    versalita: true,
  },
  "Poemas Cristianos de Fortaleza": {
    titulo: "Rockwell, Georgia, serif", versos: "Georgia, serif",
    ornamento: "angulos", acento: ACENTOS.bronce, tinte: TINTES.nogal,
  },
  "Poemas Cristianos de Fe": {
    titulo: "Perpetua, Garamond, serif", versos: "Garamond, Georgia, serif",
    ornamento: "cruz", acento: ACENTOS.trigo, tinte: TINTES.sepia,
  },
  "Poemas Bíblicos de Amor": {
    titulo: "Monotype Corsiva, cursive", versos: "Palatino Linotype, Georgia, serif",
    ornamento: "vid", acento: ACENTOS.rosaOro, tinte: TINTES.cacao,
    tituloEscala: 1.12,
  },
  "Poemas para la Madre": {
    titulo: "Lucida Calligraphy, cursive", versos: "Book Antiqua, Georgia, serif",
    ornamento: "flor", acento: ACENTOS.rosaOro, tinte: TINTES.sepia,
    tituloEscala: 0.92,
  },
  "Poemas Cristianos de Esperanza": {
    titulo: "Candara, Segoe UI, sans-serif", versos: "Corbel, Segoe UI, sans-serif",
    ornamento: "rayos", acento: ACENTOS.miel, tinte: TINTES.tierra,
  },
  "Poemas Cristianos Sobre La Familia": {
    titulo: "Bookman Old Style, Georgia, serif", versos: "Georgia, serif",
    ornamento: "arco", acento: ACENTOS.arena, tinte: TINTES.cacao,
  },
  "Biblical Poems for Mothers Day": {
    titulo: "Edwardian Script ITC, cursive", versos: "Baskerville Old Face, Georgia, serif",
    ornamento: "perlas", acento: ACENTOS.rosaOro, tinte: TINTES.sepia,
    tituloEscala: 1.3,
  },
  "Poemas Cristianos Para Adolescentes": {
    titulo: "Trebuchet MS, sans-serif", versos: "Segoe UI, sans-serif",
    ornamento: "geometrico", acento: ACENTOS.ambar, tinte: TINTES.nogal,
  },
  "Poemas Cristianos para Jóvenes": {
    titulo: "Century Gothic, Corbel, sans-serif", versos: "Corbel, Segoe UI, sans-serif",
    ornamento: "ritmo", acento: ACENTOS.ambar, tinte: TINTES.tierra,
    versalita: true,
  },
  "Poemas Cristianos para la Mujer": {
    titulo: "Bodoni MT, Georgia, serif", versos: "Cambria, Georgia, serif",
    ornamento: "tallo", acento: ACENTOS.trigo, tinte: TINTES.cacao,
  },
  "Poemas para Niños": {
    titulo: "Segoe Script, Trebuchet MS, sans-serif", versos: "Candara, Segoe UI, sans-serif",
    ornamento: "estrellas", acento: ACENTOS.miel, tinte: TINTES.sepia,
    tituloEscala: 0.95,
  },
};

const POR_DEFECTO = {
  titulo: "Georgia, serif", versos: "Georgia, serif",
  ornamento: "filete", acento: ACENTOS.oro, tinte: TINTES.tierra,
};

const estiloDe = (categoria) => ({ ...POR_DEFECTO, ...(ESTILOS[categoria] || {}) });

module.exports = { ESTILOS, ORNAMENTOS, ACENTOS, TINTES, CREMA, CREMA_2, estiloDe };
