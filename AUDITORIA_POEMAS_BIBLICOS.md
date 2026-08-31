# AUDITORÍA POEMAS BÍBLICOS

Fecha: 2026-07-16 · Alcance: repositorio completo, sitio en producción, datos de Search Console aportados (3 meses). Modo: **solo lectura** — ningún archivo del proyecto fue modificado durante esta auditoría. Entregables: este informe + `BASE_EDITORIAL_POEMAS.csv` (83 filas).

---

## 1. Resumen ejecutivo

El proyecto está en su estado técnico más sano hasta la fecha: build limpio (47 páginas, 0 warnings), sitemap correcto, 0 enlaces internos rotos, encoding UTF-8 sano, categorías canónicas unificadas (12) y despliegue automático funcionando. Gran parte de los problemas listados en el plan maestro (archivo duplicado "(1)", colisión de fortaleza, mojibake, categorías fragmentadas, menú móvil) **ya fueron corregidos y desplegados en julio de 2026**.

Lo que queda es principalmente **editorial y de SEO**, no técnico:

1. **1 canibalización activa de alta prioridad**: el artículo `/poemas/poema-cristianos-para-reflexionar/` ataca exactamente la misma keyword que la página estrella del sitio (la categoría con 120 clics).
2. **1 página crítica vacía**: `/poemas/poemas-para-ninos-cristianos/` tiene 93 palabras y ningún poema; es la única pieza de su categoría.
3. **3 URLs viejas devuelven 404** sin redirección (una con 32 impresiones en GSC).
4. **Homepage con title de ~155 caracteres** (se trunca en Google) y CTR mejorable.
5. **CTR bajo en la página de mamá** (12 clics / 1.399 impresiones = 0,9%).
6. Deuda de formato en 3-4 archivos antiguos y enlazado interno ausente en 8.
7. Falta `tsconfig.json` — causa real de los errores de tipos en VS Code.

La estrategia recomendada: **defender lo que rinde → optimizar lo que imprime sin clics → crear los 50 contenidos de la matriz en orden P1→P3.**

---

## 2. Estado actual

| Indicador | Valor |
|---|---|
| Páginas generadas | 47 (33 artículos + 12 categorías + home + acerca) |
| Build | SUCCESS, 0 warnings, 0 conflictos de rutas |
| Enlaces internos rotos | 0 (verificado con script sobre `dist/`) |
| Encoding | UTF-8 correcto en todo `src/` |
| Sitemap | 47 URLs, sin URLs viejas ni duplicadas |
| Categorías | 12 canónicas, sin variantes |
| Imágenes | Todas las `heroImage` existen |
| Git | Limpio, sincronizado con `origin/main` (HEAD `1410b8c`) |
| GitHub Actions | Último deploy: success |
| GSC (3 meses) | 527 clics · 18.800 impresiones · CTR 2,8% · posición media 6,8 |

## 3. Arquitectura actual

```
astro.config.mjs      Astro 6 + @astrojs/sitemap + plugin propio "agruparEstrofas"
                      (envuelve estrofas en un cuadro por poema) · trailingSlash: always
src/content.config.ts Colección "poemas" (glob md) con esquema Zod estricto
src/content/poemas/   33 MD en 12 carpetas temáticas
src/pages/
  index.astro         Home: Hero + CategoryGrid + Featured + pilar SEO + FAQ
  acerca.astro
  poemas/[slug].astro            → /poemas/<nombre-archivo>/     (artículo)
  poemas/[category].astro        → /poemas/<slug-de-categoría>/  (categoría)
  poemas/[category]/page/[page]  → paginación (se activa a los 21 poemas)
src/components/       Header (menú + dropdown), CategoryGrid, FeaturedArticles, Hero, Footer
src/layouts/          BaseLayout (metas, OG, canonical, JSON-LD por tipo, GTM)
.claude/skills/escribir-poemas/  Skill con tabla canónica de categorías + guía de imágenes
.github/workflows/    Build (Node 22) + deploy a GitHub Pages en cada push a main
```

**Cómo se generan las URLs** (importante para el punto 5 del plan): el artículo usa el **nombre del archivo**; la categoría usa el **string exacto de `category`** slugificado (sin tildes, minúsculas, espacios→guiones). Ambos comparten el prefijo `/poemas/`, y cuando coinciden, `[category]` tiene prioridad alfabética sobre `[slug]` y el artículo queda **despublicado en silencio**. Esto ya ocurrió dos veces (fortaleza y Mother's Day) y ambas se resolvieron renombrando el archivo del artículo. La skill del proyecto ya prohíbe crear archivos cuyo nombre coincida con un slug de categoría.

## 4. Problemas críticos (pendientes)

| # | Problema | Evidencia | Impacto |
|---|---|---|---|
| C1 | Canibalización artículo↔categoría "reflexionar": el artículo `poema-cristianos-para-reflexionar` (singular) tiene título y H1 idénticos a la categoría `poemas-cristianos-para-reflexionar` (120 clics, mejor página del sitio) | Inventario MD | Compiten por la misma consulta estrella; Google puede repartir señales |
| C2 | Página de Niños vacía: 93 palabras, 0 poemas, 0 versos | `poemas-para-ninos-cristianos.md` | Categoría entera sin contenido real; thin content |
| C3 | 3 URLs viejas → 404 sin redirección: `/poemas/poemas-de-fortaleza/` (32 impr. GSC), `/poemas/poems-for-mothers-day/`, `/poemas/poemas-cristianos-esperanza/` | Verificado en producción | Pérdida de señales acumuladas; ver §19 |

## 5. Problemas importantes

| # | Problema | Detalle |
|---|---|---|
| I1 | Title de la homepage ~155 caracteres, keyword-stuffed | Se trunca en Google; probable freno del CTR (2,8%) de la página que concentra el 63% de los clics |
| I2 | CTR 0,9% en mamá con 1.399 impresiones | Title/description poco competitivos frente a la SERP; ver §16 del plan |
| I3 | 2 archivos en formato antiguo sin `<br>` | `poemas-biblicos-mujer` (1.384 palabras) y `poemas-madre-cristiana` (1.814): no renderizan cuadros ni numeración romana |
| I4 | 8 artículos sin ningún enlace interno saliente | viento(adolescentes), amar-a-dios, mothers-day EN, tener-esperanza, poemas-de-fe, niños, mujer, madre-cristiana, reflexionar(artículo) |
| I5 | `featured: true` en 30/33 poemas | "Destacados" de la home muestra simplemente los 3 primeros del listado, sin curaduría |
| I6 | 2 URLs recién renombradas requieren vigilancia en GSC | `poemas-biblicos-de-fortaleza` y `biblical-mothers-day-poems` (jul-2026) |
| I7 | Desalineaciones title↔H1 | `poemas-de-fe`, `poemas-amar-a-dios`, `poemas-biblicos-mujer`, `poema-para-tener-esperanza` |
| I8 | Falta `tsconfig.json` | Ver §14 |

## 6. Problemas menores

- Enlace de tarjeta en `FeaturedArticles.astro` sin barra final (redirección extra; los otros 3 templates ya se corrigieron).
- El menú marca "Inicio" como activo en todas las páginas.
- `og:type` siempre `website` (en artículos lo ideal es `article`); el JSON-LD ya distingue por tipo.
- El FAQ de la home no emite datos estructurados `FAQPage` (oportunidad de rich results).
- `alt` de todas las imágenes = título del poema (aceptable, mejorable).
- Las 5 imágenes de julio son verticales 2:3; el estándar de la guía es 16:9.
- H2 "Tabla de contenido" en `poemas-biblicos-mujer` sin función.
- El primer H2 de `poemas-jovenes` repite literalmente su H1.

## 7. URLs en riesgo

| URL | Riesgo | Mitigación propuesta |
|---|---|---|
| `/poemas/poemas-de-fortaleza/` (404) | 32 impresiones perdidas | Redirect a `/poemas/poemas-cristianos-de-fortaleza/` (§19) |
| `/poemas/poems-for-mothers-day/` (404) | señales previas del EN | Redirect a `/poemas/biblical-poems-for-mothers-day/` |
| `/poemas/poemas-cristianos-esperanza/` (404) | variante vieja | Redirect a `/poemas/poemas-cristianos-de-esperanza/` |
| `/poemas/poema-cristianos-para-reflexionar/` | canibaliza a la página estrella | Retarget de keyword (C1), URL intacta |
| `/poemas/poemas-biblicos-de-fortaleza/` | URL nueva sin historial | Vigilar cobertura/rendimiento en GSC 4-6 semanas |
| `/poemas/biblical-mothers-day-poems/` | URL nueva sin historial | Ídem |

## 8. URLs con buen rendimiento (DEFENDER)

| URL | Clics | Impr. | CTR | Lectura |
|---|---:|---:|---:|---|
| `/` | 334 | 13.461 | 2,5% | Concentra el tráfico; optimizar title sin cambios agresivos |
| `/poemas/poemas-cristianos-para-reflexionar/` (categoría) | 120 | 2.704 | 4,4% | Página estrella → pilar oficial (§15 del plan) |
| `/poemas/poemas-cristianos-para-reflexionar-en-familia/` | 32 | 601 | 5,3% | Mejor CTR del sitio; reforzar enlazado hacia ella |
| `/poemas/poemas-de-dios-para-reflexionar/` | 28 | 751 | 3,7% | 2ª mejor pieza; base del futuro cluster "Dios" |
| `/poemas/poemas-cristianos-para-la-familia/` | 24 | 738 | 3,3% | Preservada en la normalización ✓ |
| `/poemas/poemas-cristianos-para-jovenes/` (categoría) | 11 | 306 | 3,6% | La categoría rinde; su único artículo necesita optimización |

## 9. Canibalizaciones detectadas

| Par/grupo | Nivel | Clasificación | Acción |
|---|---|---|---|
| Artículo `poema-cristianos-para-reflexionar` ↔ categoría homónima | **ALTA** | B (optimizar) | Retitular artículo hacia intención distinta (p.ej. "poemas cristianos profundos para reflexionar"); no tocar URL |
| Trío "hogar": `poemas-biblicos-del-hogar` (Amor) / `poemas-del-hogar-cristiano` (Esperanza) / `poema-cristiano-sobre-el-hogar` (Reflexionar) | MEDIA | F (vigilar) | Intenciones matizadas y H2 distintos; revisar con las 212 consultas de GSC antes de fusionar |
| `poemas-de-fe` (artículo) ↔ categoría "Poemas Cristianos de Fe" | MEDIA | B | Diferenciar artículo hacia "poemas de fe en Dios" |
| `poemas-jovenes`: H2 nº1 repite el H1 | BAJA | B | Cambiar ese H2 por keyword secundaria real |
| `poemas-cristianos-para-mama` ↔ `poemas-madre-cristiana` | BAJA | F | "mamá" (dedicar) vs "madre cristiana" (perfil); mantener separados, cruzar enlaces |
| Cluster reflexionar-sobre-* (vida/amor/fe/dificultades/pensar) | BAJA | A (conservar) | Cada una con intención propia bien diferenciada |
| Familia: `para-la-familia` ↔ `sobre-la-union-familiar` | RESUELTA | A | Retitulada en jul-2026 |

## 10. Duplicados detectados

- **Físicos: ninguno.** El archivo `poemas-cristianos-para-la-familia (1).md` ya fue eliminado (commit `73b7ab3`) y la URL `-1` ya no se genera.
- **Cuasi-slug peligroso**: `poema-cristianos-para-reflexionar` (artículo) vs `poemas-cristianos-para-reflexionar` (categoría) se diferencian en **una letra**. Ya provocó enlaces internos equivocados en el pasado (corregidos). Recomendación: al retargetizar C1, considerar en el futuro lejano consolidar; por ahora solo diferenciar contenido.
- **Keywords duplicadas entre archivos: ninguna** tras los retitulados de julio (unión familiar, fortaleza bíblica).

## 11. Auditoría de Markdown (inventario completo)

33 archivos analizados. Detalle campo a campo en `BASE_EDITORIAL_POEMAS.csv` (filas E01-E33). Resumen de acciones:

| Acción | Archivos |
|---|---|
| KEEP (bien formados, intención clara) | 18: del-hogar, hogar-cristiano, biblicos-de-familia, fe-en-familia, valores-familia, esposa-cristiana, para-la-familia, union-familiar, biblicos-de-fortaleza, padre-de-familia, tiempos-dificiles, sobre-el-hogar, reflexion-y-esperanza, reflexionar-en-familia, sobre-{amor,fe,vida,dificultades,pensar}, de-dios-para-reflexionar, reflexion-para-jovenes, mothers-day EN |
| OPTIMIZE | 10: mama (CTR), madre-cristiana (formato), biblicos-mujer (formato), jovenes (H2), viento-adolescentes (keyword), amar-a-dios (H1), tener-esperanza (H1), poemas-de-fe (diferenciar), cortos-para-reflexionar (CTR), reflexionar-artículo (retarget C1) |
| REWRITE | 1: `poemas-para-ninos-cristianos` (C2 — vacío) |
| MERGE / REDIRECT / DELETE | 0 por ahora (el trío "hogar" queda en observación con datos GSC completos) |

Notas transversales: 24 archivos siguen la estructura canónica de la skill (H1 keyword + 3-4 H2 + Explorar); los 9 restantes son de la primera época (mayo) y concentran casi toda la lista OPTIMIZE.

## 12. Auditoría SEO (Search Console)

Con los datos aportados (10 consultas / 10 páginas de ~212 consultas):

**DEFENDER** — ya rendimos: `poemas cristianos` (51c), `poemas cristianos para reflexionar` (50c), `poemas de dios para reflexionar` (28c), `poemas biblicos` (19+7c), `poema cristiano` (17c).
**OPTIMIZAR** — imprimen sin clics proporcionales: home (title largo), mamá (0,9% CTR), `poemas-cristianos-cortos-para-reflexionar` (85i/0c), categoría madre (23i/0c).
**EXPANDIR** — Google ya nos muestra sin página dedicada: `poemas cristianos de ánimo` (7c/115i → N01), `poesia cristiana` + variantes (~16c/785i → N02).
**CREAR** — intenciones del nicho sin cobertura: ver los 50 de la matriz (§21).

⚠️ **Falta la exportación completa**: para cerrar las decisiones del trío "hogar", el retarget de C1 y las posiciones por consulta, exporta de GSC (últimos 3 meses) las pestañas **Consultas** y **Páginas** (CSV) y guárdalas en el repo (p. ej. `gsc/consultas.csv`, `gsc/paginas.csv`). No se inventaron las 202 consultas restantes.

## 13. Auditoría técnica Astro

- Astro 6.2.2, `site` correcto, `trailingSlash: 'always'`, sitemap con `entryLimit`.
- Plugin propio `agruparEstrofas` (rehype) funcionando; los 2 MD sin `<br>` (I3) no se benefician.
- Rutas dinámicas: prioridad `[category]` > `[slug]` en empates (orden alfabético). Regla de guardia documentada en la skill. Sin colisiones activas hoy (verificado contra los 45 slugs).
- Contenido: esquema Zod completo; el campo `slug:` en frontmatter queda prohibido por la skill (causó la colisión EN).
- Build: 47/47 páginas, 1,6s, sin warnings de rutas ni de sitemap.

## 14. Auditoría TypeScript

**Causa real de los errores en VS Code: no existe `tsconfig.json`.** El proyecto tiene instalados `typescript` y `@astrojs/check` pero sin tsconfig el language server de Astro no carga los tipos generados (`.astro/types.d.ts`) ni los de `astro:content`, y todo aparece como `any` implícito.

Solución recomendada (FASE 12, 2 archivos, sin tocar código):
```jsonc
// tsconfig.json
{
  "extends": "astro/tsconfigs/base",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```
y ejecutar `npx astro sync`. No usar `@ts-ignore` ni desactivar nada. Después, opcionalmente subir a `astro/tsconfigs/strict` y tipar los props de los 4 archivos de páginas.

## 15. Auditoría Git / GitHub Actions

- Repo limpio y sincronizado; historial coherente; sin archivos accidentales (el `dev-server.log` y `AUDITORIA_MARKDOWN.md` de junio conviven en el repo — decidir si se conservan o se ignoran).
- Workflow: `checkout@v4`, `setup-node@v4` (Node 22, igual que `engines`), `upload-pages-artifact@v3`, `deploy-pages@v4` — **todas vigentes, sin deprecaciones activas**. El warning "Node 20" del plan no se reproduce hoy. Mejora opcional no urgente: `npm ci` en lugar de `npm install` + cache de npm.
- Node local v24 > engines `>=22.12` ✓. No se recomienda cambiar versiones.
- Para las fases de implementación: crear rama `audit/refactor-seo` como pide el plan (§24).

## 16. Auditoría sitemap

47 URLs — exactamente las 47 páginas del build. Incluye home, acerca, 12 categorías y 33 artículos; **no** contiene URLs viejas, duplicadas ni conflictivas; las URLs renombradas en julio ya figuran. `robots.txt` enlaza `sitemap-index.xml` correctamente. Único matiz: conviene reenviar el sitemap en GSC tras cada tanda de URLs nuevas.

## 17. Arquitectura recomendada

**Mantener `/poemas/` plano.** Migrar categorías a `/categorias/` rompería la mejor URL del sitio (la categoría reflexionar con 120 clics) a cambio de un beneficio teórico. La colisión ya está contenida por regla editorial (skill) y verificación en build. Reevaluar solo si el sitio supera ~200 piezas.

Taxonomía objetivo (12 categorías actuales + 2 futuras cuando existan ≥3 piezas cada una):

- Actuales: Reflexionar (pilar), Fe, Fortaleza, Esperanza, Amor, Familia, Madre, Mujer, Niños, Jóvenes, Adolescentes, Mothers Day EN.
- Futuras: **Poemas Cristianos de Ánimo y Consuelo** (N01, N07, N16, N17, N29, N30) y **Poemas por Ocasión** (N13-N15, N24-N26, N33-N35). Hasta entonces, esas piezas viven en Fortaleza/Amor/Esperanza según la matriz.
- Checklist al crear una categoría: ≥3 poemas + tarjeta en CategoryGrid + entrada en Header + fila en la tabla de la skill + imagen 16:9 propia.

## 18. Estrategia de migración

Ya ejecutada en julio (categorías unificadas, 2 artículos renombrados, familia diferenciada). **No hay más cambios de URL pendientes ni recomendados.** Reglas para el futuro: (1) nunca cambiar una URL con clics sin redirect + anotación en la matriz; (2) URLs nuevas se vigilan 4-6 semanas en GSC; (3) todo cambio de URL pasa por la columna "URL propuesta" de la matriz antes de tocarse.

## 19. Estrategia de redirecciones

GitHub Pages no soporta redirects de servidor. Astro sí genera páginas de redirección (meta-refresh + canonical) con la opción `redirects`. Propuesta (FASE 8, pendiente de aprobación — **no aplicada**):

```js
// astro.config.mjs
redirects: {
  '/poemas/poemas-de-fortaleza/': '/poemas/poemas-cristianos-de-fortaleza/',
  '/poemas/poems-for-mothers-day/': '/poemas/biblical-poems-for-mothers-day/',
  '/poemas/poemas-cristianos-esperanza/': '/poemas/poemas-cristianos-de-esperanza/',
},
```
Coste: 3 páginas estáticas mínimas. Riesgo: nulo (no pisan rutas actuales). Verificar tras el deploy que el sitemap no las incluya.

## 20. Estrategia editorial

1. **Defender antes que crear**: primero C1 (retarget reflexionar), C2 (rewrite niños), I1 (title home), I2 (title/desc mamá) — tocan páginas que ya imprimen.
2. **Toda pieza nueva nace de la matriz** y se escribe con la skill `escribir-poemas` (estructura, categoría canónica, imagen, enlazado y `featured: false` garantizados).
3. Cadencia sugerida: 2-3 piezas/semana (los P1 duran ~1 mes; los 50, ~4-5 meses).
4. Enlazado: cada pieza nueva enlaza su categoría + 2 hermanas (bloque Explorar, URLs de la tabla canónica); las páginas DEFENDER reciben enlaces desde las piezas nuevas de su cluster; el pilar reflexionar y la home reparten autoridad hacia P1.
5. Calidad (§9 del plan): la skill exige originalidad, recursos literarios y prohíbe repetir keywords/subtítulos; nada de contenido masivo.
6. Estacionales (navidad, día de la madre/padre, resurrección): publicar 6-8 semanas antes del pico.

## 21. Próximos 50 contenidos

Definidos uno a uno en `BASE_EDITORIAL_POEMAS.csv` (filas N01-N50) con keyword, título, slug, categoría, intención, justificación, canibalización evaluada y enlaces previstos. Distribución:

| Cluster | Piezas | Ejemplos |
|---|---|---|
| Expansión GSC (P1) | 6 | ánimo, poesía cristiana, cortos, sobre Dios, bíblicos cortos, día de la madre |
| Consuelo/emocional | 6 | consuelo, luto, enfermos, ansiedad, tristeza, superación |
| Dedicatorias/personas | 8 | papá, abuela, amistad, hermana, esposo, maestros, pastores, infantiles |
| Ocasiones | 9 | cumpleaños, bodas, aniversario, bautizo, XV años, graduación, navidad, año nuevo, resurrección |
| Temas bíblicos | 11 | Salmo 23, salmos, Jesús, Espíritu Santo, Prov. 31, personajes, cruz, cielo, creación, gracia, humildad |
| Devocional/compartir | 10 | agradecimiento, confianza, oración, alabanza, paz, perdón, buenos días, buenas noches, bendición, acción de gracias |

Todos los slugs verificados contra los 45 existentes y contra los slugs de categoría: **cero colisiones**.

## 22. Prioridades (orden de ejecución)

1. Aprobar este informe y las redirecciones (§19).
2. `tsconfig.json` + `astro sync` (§14) — 10 minutos, sin riesgo.
3. C1: retarget del artículo reflexionar (tras ver GSC por página).
4. C2: reescribir la página de Niños con la skill.
5. I1/I2: titles de home y mamá (cambio quirúrgico, solo `<title>`/description).
6. I3/I4: reformatear mujer + madre-cristiana y añadir Explorar a los 8 sin enlaces.
7. Curaduría de `featured` (dejar 3-6 verdaderos destacados).
8. Escribir N01-N06 (P1).
9. Exportar GSC completo → refinar matriz (trío hogar, posiciones).
10. Continuar N07→N50 por prioridad.

## 23. Riesgos

| Riesgo | Prob. | Mitigación |
|---|---|---|
| Google tarda en reindexar las 2 URLs renombradas | Media | Redirects §19 + sitemap reenviado + enlaces internos ya actualizados |
| El retarget de C1 haga perder posiciones al artículo | Baja | El artículo casi no recibe clics hoy; la categoría es la que rinde; hacer cambio solo de title/H1/intro |
| Crecer a 80+ piezas reactive colisiones | Media | Regla de la skill + revisar "colisiones: ninguna" del script de inventario antes de cada tanda |
| Nuevas piezas caniba­licen a las DEFENDER | Media | Columna "Canibalización" ya evaluada por fila; respetar diferenciación de títulos |
| Contenido estacional llegue tarde | Alta | Calendario §20.6 |

## 24. Roadmap (mapeado a las fases del plan)

| Fase | Estado |
|---|---|
| 1-7 Auditoría, informe, inventario, matriz, GSC, arquitectura, plan de migración | ✅ Hecho (GSC completo pendiente de exportación del usuario) |
| 8 Cambios técnicos seguros (redirects, tsconfig, featured, FAQPage) | ⏳ Propuesto, pendiente de aprobación |
| 9 Rutas | ✅ Sin conflictos activos (correcciones de julio) |
| 10 Duplicados | ✅ Resueltos; trío hogar en observación |
| 11 Encoding | ✅ Limpio |
| 12 TypeScript | ⏳ Propuesta §14 |
| 13 Optimizar páginas con datos reales (C1, home, mamá, niños, formatos) | ⏳ Priorizado en §22 |
| 14 Primeros contenidos nuevos (N01-N06) | ⏳ Tras fase 13 |
| 15-20 Build, commit, push, Actions, sitemap, producción | Se ejecutan en cada tanda (proceso ya verificado) |

### Checklist del criterio de término (§34 del plan)

- [x] Sin conflictos de rutas importantes
- [x] Sin duplicados editoriales importantes (hogar en observación)
- [x] Sin archivos Markdown accidentales
- [x] URLs importantes preservadas
- [x] Sitemap correcto
- [x] Encoding correcto
- [x] Build exitoso · Git limpio · Actions exitoso
- [x] Arquitectura documentada
- [x] Matriz editorial creada
- [x] Próximos 50 contenidos definidos
- [ ] Metadata: pendiente title home/mamá + FAQPage (§22.5)
- [ ] TypeScript razonablemente limpio (§14)
- [ ] Canibalización C1 pendiente de retarget
- [ ] Enlazado interno: 8 artículos sin enlaces (§22.6)

---

*Informe generado en modo solo-lectura. Ningún cambio fue aplicado al código ni al contenido. Los cambios de las fases 8-14 requieren aprobación explícita.*
