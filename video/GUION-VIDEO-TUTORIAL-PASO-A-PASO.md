# Guion — "Cómo montar una web que posiciona en Google, gratis y desde cero"

**Canal:** Gamer Inversor · **Duración objetivo:** 18–22 min
**Tipo:** tutorial reproducible · **Continuación de:** "Posicioné mi web sin pagar nada"

> Regla de oro: **todo lo que digas, hazlo en pantalla**. Nada de diapositivas.
> Terminal y navegador a la vista todo el tiempo.

---

## 0:00–0:30 · GANCHO

> "En el vídeo anterior te enseñé una web que está en la primera página de Google y que no me ha costado ni un peso. Me pediste el paso a paso. Aquí está. Al final de este vídeo vas a tener tu web publicada, con HTTPS, con sitemap y conectada a Google. Y sin tarjeta de crédito."

**En pantalla:** el resultado en Google, y luego un `git push` que despliega en dos minutos.

---

## 0:30–1:30 · LA VERDAD SOBRE LOS REQUISITOS

> "Antes de empezar te debo honestidad: esto NO es arrastrar y soltar. Vas a escribir comandos. Si nunca has abierto una terminal no pasa nada, te voy a decir exactamente qué teclear, pero que sepas dónde te metes."

Necesitas: cuenta de GitHub (gratis), Node.js instalado, un editor como VS Code (gratis) y saber copiar y pegar.

> [Retención] Decir en voz alta lo difícil que es **aumenta** la retención: el que se queda ya está comprometido.

---

## 1:30–4:00 · PARTE 1 · CREAR EL PROYECTO

```bash
npm create astro@latest mi-web
```

Elige: plantilla vacía, TypeScript sí, instalar dependencias sí.

```bash
cd mi-web
npm run dev
```

> "Abre localhost:4321. Eso que ves ya es tu web corriendo en tu ordenador."

**Por qué Astro y no WordPress:**

> "Astro genera HTML puro. No hay base de datos, no hay PHP, no hay plugins que actualizar ni que se rompan. Por eso puede vivir en un hosting gratuito: son archivos, nada más. Y por eso carga rapidísimo, que Google puntúa."

---

## 4:00–8:00 · PARTE 2 · EL CONTENIDO (el truco del SEO)

> "Esta es la parte que separa una web que posiciona de una que no."

Crea `src/content.config.ts`:

```ts
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro:schema";

const articulos = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/articulos" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
    pubDate: z.coerce.date(),
    heroImage: z.string(),
  }),
});

export const collections = { articulos };
```

> "Esto es un contrato. Le dices a Astro: todo artículo DEBE tener título, descripción, categoría y fecha. Si a uno le falta algo, el sitio no compila. Suena molesto, pero es lo que te salva de publicar cien artículos con la descripción vacía y no enterarte."

Luego un artículo de ejemplo en `src/content/articulos/mi-primer-articulo.md` con su frontmatter.

**Rompe algo a propósito:** quita la descripción, ejecuta `npm run dev`, que se vea el error, y vuelve a ponerla.

> [Retención] Romper algo en pantalla y arreglarlo retiene más que hacerlo bien a la primera. Enseña que los errores son normales.

---

## 8:00–11:00 · PARTE 3 · LAS URLs Y LA TRAMPA QUE ME COMÍ

Crea `src/pages/articulos/[slug].astro` con `getStaticPaths`.

> "Aquí viene el error que me costó un artículo entero desaparecido del sitio."

Explica la colisión: si tienes una ruta `[slug]` para artículos y otra `[category]` para categorías, **las dos generan direcciones dentro de la misma carpeta**. El día que un artículo se llame igual que una categoría, una de las dos gana y la otra desaparece sin avisar.

> "A mí me pasó con poemas cristianos de fortaleza. Tenía un artículo y una categoría peleando por la misma URL. El artículo dejó de existir y no me enteré en semanas."

**La solución:** separar los espacios. Artículos en `/articulos/`, categorías en `/categorias/`. O, si ya es tarde como en mi caso, una regla estricta de nombres.

---

## 11:00–14:00 · PARTE 4 · PUBLICAR GRATIS EN GITHUB PAGES

Crea el repositorio con el nombre exacto `tuusuario.github.io`.

```bash
git init
git add .
git commit -m "primer commit"
git remote add origin https://github.com/tuusuario/tuusuario.github.io.git
git push -u origin main
```

Crea `.github/workflows/deploy.yml`:

```yaml
name: Deploy Astro to GitHub Pages
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: npm install
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
    steps:
      - uses: actions/deploy-pages@v4
```

En Settings → Pages → Source, elige **GitHub Actions**.

> "A partir de ahora, cada vez que hagas git push tu web se reconstruye y se publica sola en dos minutos. Con HTTPS incluido. Gratis. Para siempre."

**Muestra el despliegue en directo:** cambia un texto, haz push, enseña la pestaña Actions ejecutándose hasta que el cambio aparece en vivo.

---

## 14:00–18:00 · PARTE 5 · EL SEO MÍNIMO INDISPENSABLE

### 1. El sitemap

```bash
npx astro add sitemap
```

En `astro.config.mjs`:

```js
export default defineConfig({
  site: 'https://tuusuario.github.io',
  integrations: [sitemap()],
  trailingSlash: 'always',
});
```

> "ATENCIÓN, esto me costó tres meses. Astro NO genera sitemap.xml. Genera **sitemap-index.xml**. Si en Search Console envías sitemap.xml te va a dar error para siempre, porque ese archivo no existe."

### 2. Las etiquetas que sí importan

En tu layout: `<title>` único por página, `meta description`, `link canonical` y Open Graph. Muéstralo en el código.

> "Una regla: **un solo H1 por página**. Yo tenía páginas con dos y con tres."

### 3. Enlaces internos

> "Cada artículo debe enlazar a otros. Es lo que le dice a Google qué páginas son importantes. Si un artículo no recibe enlaces de ningún sitio, para Google casi no existe."

### 4. Search Console

Verifica el dominio, envía **sitemap-index.xml** y solicita indexación de la portada.

---

## 18:00–20:00 · LOS ERRORES QUE VAS A COMETER

Lista rápida, uno por uno, con captura:

1. **Nombres de categoría inconsistentes.** "Poemas de Fe" y "Poemas de la Fe" son dos categorías distintas para el sistema. Escríbelas siempre igual.
2. **Archivos duplicados.** Un `articulo (1).md` copiado por error genera una URL fantasma que compite con la original.
3. **Imágenes enormes.** Yo servía fotos de 1.376 píxeles que se mostraban a 220. Una sola página cargaba 1,4 MB de más.
4. **Enlaces sin barra final.** Con `trailingSlash: 'always'`, enlazar a `/articulos/x` en vez de `/articulos/x/` provoca una redirección en cada clic.
5. **Títulos kilométricos.** Google reescribe los títulos de más de 60 caracteres.

> "Y el más importante: **no cambies muchas cosas a la vez**. Yo toqué ocho cosas en dos días, y cuando el tráfico se movió no tenía forma de saber cuál fue."

---

## 20:00–21:00 · CIERRE

> "Ya tienes tu web publicada, gratis, con HTTPS y conectada a Google. Ahora empieza lo de verdad: escribir. El hosting era la parte fácil."

> "Si te atascas, déjamelo en comentarios. Y si prefieres saltarte toda esta parte técnica, en el vídeo anterior te explico cuándo compensa pagar un hosting."

---

# EMPAQUETADO

## Títulos

1. Cómo crear una web GRATIS que posicione en Google | Tutorial completo 2026
2. Tu web GRATIS en Google paso a paso (GitHub Pages + Astro) | Sin tarjeta
3. Monté una web sin pagar nada y así lo hice | Tutorial completo desde cero

## Miniatura

Pantalla dividida: terminal a la izquierda, resultado en Google a la derecha, flecha entre ambos. Texto: **GRATIS** grande y *paso a paso* pequeño debajo.

## Descripción

```
Contiene enlaces de afiliado.

Tutorial completo para montar una web con Astro y publicarla gratis en
GitHub Pages, con HTTPS, sitemap y conectada a Search Console. Sin tarjeta
de crédito y sin conocimientos previos de programación.

Repositorio del ejemplo: https://github.com/Poemasbiblicos/poemasbiblicos.github.io
La web funcionando: https://poemasbiblicos.github.io
Si prefieres hosting de pago (afiliado): [TU ENLACE]

CAPÍTULOS
0:00 Lo que vas a conseguir
0:30 Requisitos reales
1:30 Crear el proyecto con Astro
4:00 El contenido y su esquema
8:00 Las URLs y la trampa de las colisiones
11:00 Publicar gratis en GitHub Pages
14:00 SEO mínimo: sitemap, etiquetas, enlaces
18:00 Los 5 errores que vas a cometer
20:00 Cierre
```

## Etiquetas

astro tutorial español, github pages tutorial, crear pagina web gratis, hosting gratis 2026, seo para principiantes, sitemap google search console, pagina web sin programar, astro framework español
