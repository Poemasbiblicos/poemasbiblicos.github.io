// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Agrupa los párrafos de versos (los que contienen <br>) consecutivos
// dentro de un <div class="poema-cuadro">, para que cada poema se muestre
// en un solo cuadro y el CSS pueda numerar sus estrofas en romanos.
function agruparEstrofas() {
  const esEstrofa = (node) =>
    node.type === 'element' &&
    node.tagName === 'p' &&
    node.children.some(
      (child) =>
        (child.type === 'element' && child.tagName === 'br') ||
        (child.type === 'raw' && /<br\s*\/?>/i.test(child.value))
    );

  const esEspacio = (node) =>
    node.type === 'text' && !node.value.trim();

  return (tree) => {
    const resultado = [];
    let grupo = [];

    const cerrarGrupo = () => {
      if (grupo.length > 0) {
        resultado.push({
          type: 'element',
          tagName: 'div',
          properties: { className: ['poema-cuadro'] },
          children: grupo,
        });
        grupo = [];
      }
    };

    for (const node of tree.children) {
      if (esEstrofa(node)) {
        grupo.push(node);
      } else if (grupo.length > 0 && esEspacio(node)) {
        grupo.push(node);
      } else {
        cerrarGrupo();
        resultado.push(node);
      }
    }

    cerrarGrupo();
    tree.children = resultado;
  };
}

export default defineConfig({
  site: 'https://poemasbiblicos.github.io/',

  integrations: [
    sitemap({
      entryLimit: 10000,
    })
  ],
  trailingSlash: 'always',

  markdown: {
    rehypePlugins: [agruparEstrofas],
  },
});
