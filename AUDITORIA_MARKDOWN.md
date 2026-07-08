# Auditor?a completa del proyecto

Fecha de auditor?a: 2026-06-30. Alcance: an?lisis local de archivos fuente, contenido Markdown, rutas Astro conocidas, `public/` y `dist/` existente. No se ejecut? `npm run build` para no regenerar `dist`.

## Resumen ejecutivo

- Markdown totales analizados: 34. Markdown de contenido en `src/content/poemas`: 33.
- Categor?as ?nicas por frontmatter: 14.
- Im?genes p?blicas: 22. `heroImage` inexistentes: 6. Im?genes p?blicas sin uso detectado: 3.
- Slugs/rutas de art?culos duplicados: 0.
- Enlaces internos rotos o sospechosos detectados: 0.
- Archivo con sufijo Windows `(1)`: 1.

## Hallazgos cr?ticos

1. Hay `heroImage` que apuntan a `/images/fe.jpg` y `/images/reflexion.jpg`, pero esos archivos no existen en `public/images`. Esto rompe im?genes en varias p?ginas y afecta UX, Open Graph si se usa esa imagen, y calidad percibida.
2. Existen categor?as sem?nticamente duplicadas o fragmentadas: `Poemas Cristianos de Esperanza` vs `Poemas Cristianos Esperanza`, `Poemas de Fortaleza` vs `Poemas Cristianos de Fortaleza`, y categor?a de familia separada de una URL manual distinta en `CategoryGrid`.
3. Hay un archivo `poemas-cristianos-para-la-familia (1).md` que genera una URL con sufijo `-1`, se?al clara de copia/duplicado y alto riesgo de canibalizaci?n con `poemas-cristianos-para-la-familia.md`.
4. La arquitectura mezcla art?culos y categor?as bajo el mismo patr?n `/poemas/[slug]/` y `/poemas/[category]/`; aunque hoy no hay colisi?n exacta de rutas generadas, el sistema es fr?gil porque una categor?a y un art?culo pueden competir por la misma URL.
5. El contenido muestra mojibake en archivos Astro (`B??blicos`, `Categor??a`, `??...`), visible en textos de layout/componentes si no se corrige la codificaci?n.

## 1. Markdown analizados

- `README.md`
- `src/content/poemas/Poemas-Cristianos-Sobre-La-Familia/poemas-cristianos-para-la-familia.md`
- `src/content/poemas/Poemas-Cristianos-para-Jovenes/poemas-jovenes.md`
- `src/content/poemas/adolescentes/como-el-viento-que-pasa-manos-que-no-sueltan.md`
- `src/content/poemas/amor/poemas-amar-a-dios.md`
- `src/content/poemas/amor/poemas-biblicos-del-hogar.md`
- `src/content/poemas/biblical-poems-mother-day/biblical_mothers_day_poems.md`
- `src/content/poemas/esperanza/poema-para-tener-esperanza.md`
- `src/content/poemas/esperanza/poemas-del-hogar-cristiano.md`
- `src/content/poemas/fe/poemas-biblicos-de-familia.md`
- `src/content/poemas/fe/poemas-de-fe-en-familia.md`
- `src/content/poemas/fe/poemas-de-fe.md`
- `src/content/poemas/fe/poemas-valores-cristianos-en-familia.md`
- `src/content/poemas/niños/poemas-para-ninos-cristianos.md`
- `src/content/poemas/poemas-cristianos-para-la-mujer/poemas-biblicos-mujer.md`
- `src/content/poemas/poemas-cristianos-para-la-mujer/poemas-para-la-esposa-cristiana.md`
- `src/content/poemas/poemas-de-fortaleza/poemas-cristianos-de-fortaleza.md`
- `src/content/poemas/poemas-de-fortaleza/poemas-para-el-padre-de-familia.md`
- `src/content/poemas/poemas-de-fortaleza/poemas-para-la-familia-en-tiempos-dificiles.md`
- `src/content/poemas/poemas-para-la-madre/poemas-cristianos-para-mama.md`
- `src/content/poemas/poemas-para-la-madre/poemas-madre-cristiana.md`
- `src/content/poemas/reflexion/poema-cristiano-sobre-el-hogar.md`
- `src/content/poemas/reflexion/poema-cristianos-para-reflexionar.md`
- `src/content/poemas/reflexion/poemas-cristianos-cortos-para-reflexionar.md`
- `src/content/poemas/reflexion/poemas-cristianos-de-reflexion-y-esperanza.md`
- `src/content/poemas/reflexion/poemas-cristianos-para-la-familia (1).md`
- `src/content/poemas/reflexion/poemas-cristianos-para-reflexionar-en-familia.md`
- `src/content/poemas/reflexion/poemas-cristianos-para-reflexionar-sobre-el-amor.md`
- `src/content/poemas/reflexion/poemas-cristianos-para-reflexionar-sobre-la-fe.md`
- `src/content/poemas/reflexion/poemas-cristianos-para-reflexionar-sobre-la-vida.md`
- `src/content/poemas/reflexion/poemas-cristianos-para-reflexionar-sobre-las-dificultades.md`
- `src/content/poemas/reflexion/poemas-cristianos-para-reflexionar-y-pensar.md`
- `src/content/poemas/reflexion/poemas-de-dios-para-reflexionar.md`
- `src/content/poemas/reflexion/poemas-de-reflexion-para-jovenes.md`

## 2. Slugs generados de art?culos

- `/poemas/como-el-viento-que-pasa-manos-que-no-sueltan/` ? `src/content/poemas/adolescentes/como-el-viento-que-pasa-manos-que-no-sueltan.md`
- `/poemas/poemas-amar-a-dios/` ? `src/content/poemas/amor/poemas-amar-a-dios.md`
- `/poemas/poemas-biblicos-del-hogar/` ? `src/content/poemas/amor/poemas-biblicos-del-hogar.md`
- `/poemas/biblical-poems-for-mothers-day/` ? `src/content/poemas/biblical-poems-mother-day/biblical_mothers_day_poems.md` (`slug` frontmatter: `biblical-poems-for-mothers-day`)
- `/poemas/poema-para-tener-esperanza/` ? `src/content/poemas/esperanza/poema-para-tener-esperanza.md`
- `/poemas/poemas-del-hogar-cristiano/` ? `src/content/poemas/esperanza/poemas-del-hogar-cristiano.md`
- `/poemas/poemas-biblicos-de-familia/` ? `src/content/poemas/fe/poemas-biblicos-de-familia.md`
- `/poemas/poemas-de-fe-en-familia/` ? `src/content/poemas/fe/poemas-de-fe-en-familia.md`
- `/poemas/poemas-de-fe/` ? `src/content/poemas/fe/poemas-de-fe.md`
- `/poemas/poemas-valores-cristianos-en-familia/` ? `src/content/poemas/fe/poemas-valores-cristianos-en-familia.md`
- `/poemas/poemas-para-ninos-cristianos/` ? `src/content/poemas/niños/poemas-para-ninos-cristianos.md`
- `/poemas/poemas-jovenes/` ? `src/content/poemas/Poemas-Cristianos-para-Jovenes/poemas-jovenes.md`
- `/poemas/poemas-biblicos-mujer/` ? `src/content/poemas/poemas-cristianos-para-la-mujer/poemas-biblicos-mujer.md`
- `/poemas/poemas-para-la-esposa-cristiana/` ? `src/content/poemas/poemas-cristianos-para-la-mujer/poemas-para-la-esposa-cristiana.md`
- `/poemas/poemas-cristianos-para-la-familia/` ? `src/content/poemas/Poemas-Cristianos-Sobre-La-Familia/poemas-cristianos-para-la-familia.md`
- `/poemas/poemas-cristianos-de-fortaleza/` ? `src/content/poemas/poemas-de-fortaleza/poemas-cristianos-de-fortaleza.md`
- `/poemas/poemas-para-el-padre-de-familia/` ? `src/content/poemas/poemas-de-fortaleza/poemas-para-el-padre-de-familia.md`
- `/poemas/poemas-para-la-familia-en-tiempos-dificiles/` ? `src/content/poemas/poemas-de-fortaleza/poemas-para-la-familia-en-tiempos-dificiles.md`
- `/poemas/poemas-cristianos-para-mama/` ? `src/content/poemas/poemas-para-la-madre/poemas-cristianos-para-mama.md`
- `/poemas/poemas-madre-cristiana/` ? `src/content/poemas/poemas-para-la-madre/poemas-madre-cristiana.md`
- `/poemas/poema-cristiano-sobre-el-hogar/` ? `src/content/poemas/reflexion/poema-cristiano-sobre-el-hogar.md`
- `/poemas/poema-cristianos-para-reflexionar/` ? `src/content/poemas/reflexion/poema-cristianos-para-reflexionar.md`
- `/poemas/poemas-cristianos-cortos-para-reflexionar/` ? `src/content/poemas/reflexion/poemas-cristianos-cortos-para-reflexionar.md`
- `/poemas/poemas-cristianos-de-reflexion-y-esperanza/` ? `src/content/poemas/reflexion/poemas-cristianos-de-reflexion-y-esperanza.md`
- `/poemas/poemas-cristianos-para-la-familia-1/` ? `src/content/poemas/reflexion/poemas-cristianos-para-la-familia (1).md`
- `/poemas/poemas-cristianos-para-reflexionar-en-familia/` ? `src/content/poemas/reflexion/poemas-cristianos-para-reflexionar-en-familia.md`
- `/poemas/poemas-cristianos-para-reflexionar-sobre-el-amor/` ? `src/content/poemas/reflexion/poemas-cristianos-para-reflexionar-sobre-el-amor.md`
- `/poemas/poemas-cristianos-para-reflexionar-sobre-la-fe/` ? `src/content/poemas/reflexion/poemas-cristianos-para-reflexionar-sobre-la-fe.md`
- `/poemas/poemas-cristianos-para-reflexionar-sobre-la-vida/` ? `src/content/poemas/reflexion/poemas-cristianos-para-reflexionar-sobre-la-vida.md`
- `/poemas/poemas-cristianos-para-reflexionar-sobre-las-dificultades/` ? `src/content/poemas/reflexion/poemas-cristianos-para-reflexionar-sobre-las-dificultades.md`
- `/poemas/poemas-cristianos-para-reflexionar-y-pensar/` ? `src/content/poemas/reflexion/poemas-cristianos-para-reflexionar-y-pensar.md`
- `/poemas/poemas-de-dios-para-reflexionar/` ? `src/content/poemas/reflexion/poemas-de-dios-para-reflexionar.md`
- `/poemas/poemas-de-reflexion-para-jovenes/` ? `src/content/poemas/reflexion/poemas-de-reflexion-para-jovenes.md`

## 3. Categor?as existentes

- `Poemas Bíblicos de Amor` ? `2` art?culo(s), ruta de categor?a: `/poemas/poemas-biblicos-de-amor/`
- `Poemas Cristianos Esperanza` ? `1` art?culo(s), ruta de categor?a: `/poemas/poemas-cristianos-esperanza/`
- `Poemas Cristianos Para Adolescentes` ? `1` art?culo(s), ruta de categor?a: `/poemas/poemas-cristianos-para-adolescentes/`
- `Poemas Cristianos Sobre La Familia` ? `1` art?culo(s), ruta de categor?a: `/poemas/poemas-cristianos-sobre-la-familia/`
- `Poemas Cristianos de Esperanza` ? `1` art?culo(s), ruta de categor?a: `/poemas/poemas-cristianos-de-esperanza/`
- `Poemas Cristianos de Fe` ? `4` art?culo(s), ruta de categor?a: `/poemas/poemas-cristianos-de-fe/`
- `Poemas Cristianos de Fortaleza` ? `2` art?culo(s), ruta de categor?a: `/poemas/poemas-cristianos-de-fortaleza/`
- `Poemas Cristianos para Jovenes` ? `1` art?culo(s), ruta de categor?a: `/poemas/poemas-cristianos-para-jovenes/`
- `Poemas Cristianos para Reflexionar` ? `13` art?culo(s), ruta de categor?a: `/poemas/poemas-cristianos-para-reflexionar/`
- `Poemas Cristianos para la Mujer` ? `2` art?culo(s), ruta de categor?a: `/poemas/poemas-cristianos-para-la-mujer/`
- `Poemas de Fortaleza` ? `1` art?culo(s), ruta de categor?a: `/poemas/poemas-de-fortaleza/`
- `Poemas para Niños` ? `1` art?culo(s), ruta de categor?a: `/poemas/poemas-para-ninos/`
- `Poemas para la Madre` ? `2` art?culo(s), ruta de categor?a: `/poemas/poemas-para-la-madre/`
- `Poems for Mothers Day` ? `1` art?culo(s), ruta de categor?a: `/poemas/poems-for-mothers-day/`

## 4. Categor?as duplicadas o fragmentadas

- No hay duplicados t?cnicos exactos de `categorySlug`.
- Duplicados/fragmentaciones sem?nticas detectadas:
  - `Poemas Cristianos de Esperanza` y `Poemas Cristianos Esperanza`.
  - `Poemas de Fortaleza` y `Poemas Cristianos de Fortaleza`.
  - `Poemas Cristianos Sobre La Familia`, `Poemas Cristianos para Reflexionar` con art?culo familiar, y enlaces manuales a `/poemas/poemas-cristianos-para-la-familia/`.
  - `Poems for Mothers Day` frente al enlace manual `Biblical Poems for Mothers Day`; el art?culo usa slug frontmatter `/poemas/biblical-poems-for-mothers-day/`, pero la categor?a real es `/poemas/poems-for-mothers-day/`.

## 5. Slugs duplicados

No se detectaron slugs de art?culo duplicados.

## 6. Posibles canibalizaciones SEO

- Score 0.55: `src/content/poemas/fe/poemas-biblicos-de-familia.md` vs `src/content/poemas/poemas-de-fortaleza/poemas-para-el-padre-de-familia.md`. T?rminos comunes: amor, celebran, escrituras, familia, hogar, luz.
- Score 0.45: `src/content/poemas/fe/poemas-biblicos-de-familia.md` vs `src/content/poemas/reflexion/poemas-cristianos-para-la-familia (1).md`. T?rminos comunes: amor, celebran, escrituras, familia, hogar.
- Score 0.43: `src/content/poemas/Poemas-Cristianos-Sobre-La-Familia/poemas-cristianos-para-la-familia.md` vs `src/content/poemas/reflexion/poemas-cristianos-para-la-familia (1).md`. T?rminos comunes: celebran, cristiana, escrituras, familia, inspirados, unidad.
- Score 0.42: `src/content/poemas/poemas-de-fortaleza/poemas-para-el-padre-de-familia.md` vs `src/content/poemas/reflexion/poemas-cristianos-para-la-familia (1).md`. T?rminos comunes: amor, celebran, escrituras, familia, hogar.
- Score 0.36: `src/content/poemas/reflexion/poemas-cristianos-cortos-para-reflexionar.md` vs `src/content/poemas/reflexion/poemas-cristianos-para-reflexionar-sobre-la-vida.md`. T?rminos comunes: belleza, cristiana, espiritual, imagenes, literaria, profundidad, reflexion, reflexionar, sensoriales.
- Score 0.36: `src/content/poemas/amor/poemas-biblicos-del-hogar.md` vs `src/content/poemas/esperanza/poemas-del-hogar-cristiano.md`. T?rminos comunes: amor, cada, creyente, familia, hogar.
- Score 0.35: `src/content/poemas/amor/poemas-biblicos-del-hogar.md` vs `src/content/poemas/fe/poemas-de-fe-en-familia.md`. T?rminos comunes: amor, cada, creyente, dios, familia, hogar.
- Score 0.35: `src/content/poemas/reflexion/poemas-cristianos-para-reflexionar-sobre-la-vida.md` vs `src/content/poemas/reflexion/poemas-de-dios-para-reflexionar.md`. T?rminos comunes: belleza, contemplacion, cristiana, imagenes, literaria, reflexion, reflexionar, sensoriales.
- Score 0.33: `src/content/poemas/esperanza/poemas-del-hogar-cristiano.md` vs `src/content/poemas/fe/poemas-biblicos-de-familia.md`. T?rminos comunes: amor, esperanza, familia, hogar.
- Score 0.33: `src/content/poemas/esperanza/poemas-del-hogar-cristiano.md` vs `src/content/poemas/fe/poemas-de-fe-en-familia.md`. T?rminos comunes: amor, cada, creyente, familia, hogar.
- Score 0.33: `src/content/poemas/fe/poemas-biblicos-de-familia.md` vs `src/content/poemas/poemas-cristianos-para-la-mujer/poemas-para-la-esposa-cristiana.md`. T?rminos comunes: amor, celebran, escrituras, hogar, luz.
- Score 0.33: `src/content/poemas/poemas-cristianos-para-la-mujer/poemas-para-la-esposa-cristiana.md` vs `src/content/poemas/reflexion/poemas-cristianos-para-la-familia (1).md`. T?rminos comunes: amor, celebran, cristiana, escrituras, hogar.
- Score 0.31: `src/content/poemas/poemas-cristianos-para-la-mujer/poemas-para-la-esposa-cristiana.md` vs `src/content/poemas/poemas-de-fortaleza/poemas-para-el-padre-de-familia.md`. T?rminos comunes: amor, celebran, escrituras, hogar, luz.
- Score 0.27: `src/content/poemas/reflexion/poemas-cristianos-para-reflexionar-sobre-el-amor.md` vs `src/content/poemas/reflexion/poemas-cristianos-para-reflexionar-sobre-la-vida.md`. T?rminos comunes: belleza, escrituras, literaria, profundidad, reflexion, reflexionar.
- Score 0.26: `src/content/poemas/reflexion/poemas-cristianos-para-reflexionar-sobre-el-amor.md` vs `src/content/poemas/reflexion/poemas-de-dios-para-reflexionar.md`. T?rminos comunes: belleza, contemplan, dios, literaria, reflexion, reflexionar.
- Score 0.25: `src/content/poemas/reflexion/poemas-cristianos-cortos-para-reflexionar.md` vs `src/content/poemas/reflexion/poemas-de-dios-para-reflexionar.md`. T?rminos comunes: belleza, cristiana, imagenes, literaria, reflexion, reflexionar, sensoriales.
- Score 0.20: `src/content/poemas/reflexion/poemas-cristianos-cortos-para-reflexionar.md` vs `src/content/poemas/reflexion/poemas-cristianos-para-reflexionar-y-pensar.md`. T?rminos comunes: biblica, cristiana, espiritual, meditacion, reflexion, reflexionar.

## 7. Archivos duplicados

- `.astro/content-assets.mjs`, `.astro/content-modules.mjs`
- `dist/.nojekyll`, `public/.nojekyll`
- `dist/favicon.svg`, `public/favicon.svg`
- `dist/robots.txt`, `public/robots.txt`
- `public/images/amar-a-dios.jpg`, `dist/images/amar-a-dios.jpg`
- `public/images/esperanza.jpg`, `dist/images/esperanza.jpg`
- `public/images/fortaleza.jpg`, `dist/images/fortaleza.jpg`
- `public/images/hero-poemas-biblicos.jpg`, `dist/images/hero-poemas-biblicos.jpg`
- `public/images/joven.jpg`, `dist/images/joven.jpg`
- `public/images/madre.jpg`, `dist/images/madre.jpg`
- `public/images/mother-day.jpg`, `dist/images/mother-day.jpg`
- `public/images/mujer.jpg`, `dist/images/mujer.jpg`
- `public/images/ninos1.jpg`, `dist/images/ninos1.jpg`
- `public/images/og-image.jpg`, `dist/images/og-image.jpg`
- `public/images/reflexion/reflexion1.jpg`, `dist/images/reflexion/reflexion1.jpg`
- `public/images/reflexion/reflexion10.jpg`, `dist/images/reflexion/reflexion10.jpg`
- `public/images/reflexion/reflexion11.jpg`, `dist/images/reflexion/reflexion11.jpg`
- `public/images/reflexion/reflexion2.jpg`, `dist/images/reflexion/reflexion2.jpg`
- `public/images/reflexion/reflexion3.jpg`, `dist/images/reflexion/reflexion3.jpg`
- `public/images/reflexion/reflexion4.jpg`, `dist/images/reflexion/reflexion4.jpg`
- `public/images/reflexion/reflexion5.jpg`, `dist/images/reflexion/reflexion5.jpg`
- `public/images/reflexion/reflexion6.jpg`, `dist/images/reflexion/reflexion6.jpg`
- `public/images/reflexion/reflexion7.jpg`, `dist/images/reflexion/reflexion7.jpg`
- `public/images/reflexion/reflexion8.jpg`, `dist/images/reflexion/reflexion8.jpg`
- `public/images/reflexion/reflexion9.jpg`, `dist/images/reflexion/reflexion9.jpg`

## 8. Archivos con sufijo Windows `(1)`

- `src/content/poemas/reflexion/poemas-cristianos-para-la-familia (1).md`

## 9. Enlaces internos rotos

No se detectaron enlaces internos rotos por an?lisis est?tico.

## 10. `heroImage` inexistentes

- `src/content/poemas/fe/poemas-biblicos-de-familia.md` ? `/images/fe.jpg`
- `src/content/poemas/fe/poemas-de-fe-en-familia.md` ? `/images/fe.jpg`
- `src/content/poemas/fe/poemas-valores-cristianos-en-familia.md` ? `/images/fe.jpg`
- `src/content/poemas/Poemas-Cristianos-Sobre-La-Familia/poemas-cristianos-para-la-familia.md` ? `/images/reflexion.jpg`
- `src/content/poemas/reflexion/poema-cristiano-sobre-el-hogar.md` ? `/images/reflexion.jpg`
- `src/content/poemas/reflexion/poemas-cristianos-para-la-familia (1).md` ? `/images/reflexion.jpg`

## 11. Im?genes sin usar

- `public/images/hero-poemas-biblicos.jpg`
- `public/images/mother-day.jpg`
- `public/images/og-image.jpg`

## 12. Campos faltantes

Todos los Markdown de contenido tienen los campos requeridos por `src/content.config.ts`: `title`, `description`, `category`, `tags`, `featured`, `pubDate`, `heroImage`.

## 13. Descripciones duplicadas

No se detectaron descripciones exactamente duplicadas.

## 14. T?tulos duplicados

No se detectaron t?tulos exactamente duplicados.

## 15. Archivos que nunca reciben enlaces internos literales

Nota: el sitio genera enlaces din?micos desde destacados, listados de categor?a y relacionados. Esta secci?n muestra ausencia de enlaces literales est?ticos encontrados en fuente; no equivale necesariamente a cero enlaces renderizados.
- `src/content/poemas/adolescentes/como-el-viento-que-pasa-manos-que-no-sueltan.md` ? `/poemas/como-el-viento-que-pasa-manos-que-no-sueltan/`
- `src/content/poemas/amor/poemas-amar-a-dios.md` ? `/poemas/poemas-amar-a-dios/`
- `src/content/poemas/amor/poemas-biblicos-del-hogar.md` ? `/poemas/poemas-biblicos-del-hogar/`
- `src/content/poemas/esperanza/poema-para-tener-esperanza.md` ? `/poemas/poema-para-tener-esperanza/`
- `src/content/poemas/esperanza/poemas-del-hogar-cristiano.md` ? `/poemas/poemas-del-hogar-cristiano/`
- `src/content/poemas/fe/poemas-biblicos-de-familia.md` ? `/poemas/poemas-biblicos-de-familia/`
- `src/content/poemas/fe/poemas-de-fe-en-familia.md` ? `/poemas/poemas-de-fe-en-familia/`
- `src/content/poemas/fe/poemas-de-fe.md` ? `/poemas/poemas-de-fe/`
- `src/content/poemas/fe/poemas-valores-cristianos-en-familia.md` ? `/poemas/poemas-valores-cristianos-en-familia/`
- `src/content/poemas/niños/poemas-para-ninos-cristianos.md` ? `/poemas/poemas-para-ninos-cristianos/`
- `src/content/poemas/Poemas-Cristianos-para-Jovenes/poemas-jovenes.md` ? `/poemas/poemas-jovenes/`
- `src/content/poemas/poemas-cristianos-para-la-mujer/poemas-biblicos-mujer.md` ? `/poemas/poemas-biblicos-mujer/`
- `src/content/poemas/poemas-cristianos-para-la-mujer/poemas-para-la-esposa-cristiana.md` ? `/poemas/poemas-para-la-esposa-cristiana/`
- `src/content/poemas/poemas-de-fortaleza/poemas-para-el-padre-de-familia.md` ? `/poemas/poemas-para-el-padre-de-familia/`
- `src/content/poemas/poemas-de-fortaleza/poemas-para-la-familia-en-tiempos-dificiles.md` ? `/poemas/poemas-para-la-familia-en-tiempos-dificiles/`
- `src/content/poemas/poemas-para-la-madre/poemas-cristianos-para-mama.md` ? `/poemas/poemas-cristianos-para-mama/`
- `src/content/poemas/poemas-para-la-madre/poemas-madre-cristiana.md` ? `/poemas/poemas-madre-cristiana/`
- `src/content/poemas/reflexion/poema-cristiano-sobre-el-hogar.md` ? `/poemas/poema-cristiano-sobre-el-hogar/`
- `src/content/poemas/reflexion/poemas-cristianos-cortos-para-reflexionar.md` ? `/poemas/poemas-cristianos-cortos-para-reflexionar/`
- `src/content/poemas/reflexion/poemas-cristianos-de-reflexion-y-esperanza.md` ? `/poemas/poemas-cristianos-de-reflexion-y-esperanza/`
- `src/content/poemas/reflexion/poemas-cristianos-para-la-familia (1).md` ? `/poemas/poemas-cristianos-para-la-familia-1/`
- `src/content/poemas/reflexion/poemas-cristianos-para-reflexionar-en-familia.md` ? `/poemas/poemas-cristianos-para-reflexionar-en-familia/`
- `src/content/poemas/reflexion/poemas-cristianos-para-reflexionar-sobre-el-amor.md` ? `/poemas/poemas-cristianos-para-reflexionar-sobre-el-amor/`
- `src/content/poemas/reflexion/poemas-cristianos-para-reflexionar-sobre-la-fe.md` ? `/poemas/poemas-cristianos-para-reflexionar-sobre-la-fe/`
- `src/content/poemas/reflexion/poemas-cristianos-para-reflexionar-sobre-la-vida.md` ? `/poemas/poemas-cristianos-para-reflexionar-sobre-la-vida/`
- `src/content/poemas/reflexion/poemas-cristianos-para-reflexionar-sobre-las-dificultades.md` ? `/poemas/poemas-cristianos-para-reflexionar-sobre-las-dificultades/`
- `src/content/poemas/reflexion/poemas-cristianos-para-reflexionar-y-pensar.md` ? `/poemas/poemas-cristianos-para-reflexionar-y-pensar/`
- `src/content/poemas/reflexion/poemas-de-dios-para-reflexionar.md` ? `/poemas/poemas-de-dios-para-reflexionar/`
- `src/content/poemas/reflexion/poemas-de-reflexion-para-jovenes.md` ? `/poemas/poemas-de-reflexion-para-jovenes/`

## 16. Art?culos hu?rfanos

No se puede afirmar orfandad total sin renderizar el sitio, porque `FeaturedArticles`, p?ginas de categor?a y relacionados generan enlaces din?micamente. Riesgos de orfandad reales: art?culos en categor?as no enlazadas desde navegaci?n manual o con categor?as fragmentadas.
- Riesgo alto: `Poemas Cristianos Esperanza` solo tiene una categor?a distinta a la enlazada como principal en varios lugares.
- Riesgo alto: `Poems for Mothers Day` existe como categor?a, mientras el grid enlaza al art?culo `biblical-poems-for-mothers-day`.

## 17. Problemas de arquitectura

- Art?culos y categor?as comparten el namespace `/poemas/`, con rutas din?micas hermanas `[slug].astro` y `[category].astro`. Esto aumenta el riesgo de colisiones futuras.
- Las categor?as del grid est?n hardcodeadas y no derivan de `getCollection`, por eso pueden quedar desalineadas con el frontmatter.
- El schema exige `heroImage`, pero no valida que el archivo exista.
- Hay mezcla de nombres de carpetas en espa?ol, ingl?s, may?sculas y acentos (`ni?os`, `Poemas-Cristianos-...`, `biblical-poems-mother-day`).
- Algunas URL de art?culos dependen del campo `slug` frontmatter y otras del nombre de archivo normalizado; conviene tener una ?nica convenci?n.

## 18. Conflictos entre rutas Astro

No se detectaron rutas finales duplicadas entre art?culos. Tampoco hay una ruta de art?culo que coincida exactamente con su ruta de categor?a actual.
Riesgo estructural: `/poemas/[slug].astro` y `/poemas/[category].astro` pueden generar la misma URL si un art?culo adopta el slug de una categor?a.

## 19. Problemas en sitemap

- `dist/sitemap-0.xml` existe y contiene 48 URLs.
- El sitemap existente incluye p?ginas de art?culos y categor?as, pero fue le?do desde `dist` ya generado; no se regener? durante esta auditor?a.
- El sitemap incluye URLs de categor?as fragmentadas como `/poemas/poemas-cristianos-esperanza/` y `/poemas/poemas-cristianos-de-esperanza/`, lo que consolida la duplicaci?n sem?ntica ante buscadores.
- El sitemap incluye `/poemas/poemas-cristianos-para-la-familia-1/`, derivado del archivo con `(1)`, lo que indexa una copia sospechosa.
- No se observaron etiquetas `lastmod`, `changefreq` ni `priority`; no es obligatorio, pero limita se?ales adicionales.

## 20. Riesgos SEO adicionales

- Canibalizaci?n por cl?steres muy cercanos: familia/hogar, fe/familia, esperanza/fortaleza, reflexi?n/vida/amor/Dios.
- Inconsistencia de idioma: hay una categor?a y contenido en ingl?s dentro de un sitio mayoritariamente espa?ol.
- Enlaces manuales apuntan a una mezcla de art?culo y categor?a con anchors similares, especialmente en Mothers Day y Familia.
- El archivo `(1)` y su ruta `-1` parecen contenido accidental y pueden diluir autoridad.
- Im?genes rotas pueden afectar Core Web Vitals percibido, engagement y resultados enriquecidos.
- Textos con mojibake en componentes pueden verse corruptos para usuarios y crawlers.

## Conclusi?n

El proyecto tiene una base funcional, pero el riesgo SEO principal no est? en duplicados t?cnicos exactos sino en arquitectura y consistencia editorial: categor?as hardcodeadas desalineadas, cl?steres sem?nticos solapados, im?genes inexistentes y una copia `(1)` indexable. La prioridad de revisi?n deber?a ser consolidar categor?as, resolver im?genes faltantes, decidir URLs can?nicas de familia/esperanza/fortaleza y limpiar la codificaci?n de textos Astro.
