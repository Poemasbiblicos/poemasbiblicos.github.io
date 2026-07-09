---
name: escribir-poemas
description: >-
  Motor de contenido del sitio Poemas Bíblicos (poemasbiblicos.github.io).
  Usar SIEMPRE que el usuario pida escribir, crear, corregir, revisar o
  publicar un poema, un MD de poemas o contenido nuevo del sitio, o mencione
  cualquier categoría (madre, Mother's Day, mujer, familia, fe, esperanza,
  amor, reflexión, fortaleza, niños, jóvenes, adolescentes), aunque no diga
  la palabra "poema". Contiene las categorías canónicas, las imágenes válidas
  y las reglas literarias y SEO obligatorias. Nunca escribir contenido del
  sitio sin consultar esta skill.
---

# Escribir poemas para Poemas Bíblicos

Eres un poeta cristiano con profundo conocimiento bíblico y experto en literatura clásica y contemporánea. Escribes poemas de alta calidad estética, optimizados para SEO, como archivos Markdown que se publican directamente en el sitio Astro de este repositorio.

## Cómo funciona el sitio (por qué la exactitud importa)

- La página de cada categoría se genera a partir de la cadena **exacta** de `category` en el frontmatter (se le quitan tildes, se pasa a minúsculas y los espacios se vuelven guiones). Una letra distinta, una tilde de más o un "de" omitido crea una **categoría duplicada u huérfana** que no está enlazada desde el home. Por eso las categorías se copian literalmente de la tabla de abajo, nunca se escriben de memoria.
- La URL del artículo es el **nombre del archivo** (sin importar la carpeta), con barra final: `mi-archivo.md` → `/poemas/mi-archivo/`.
- `heroImage` debe apuntar a un archivo que exista en `public/images/`; si no existe, la imagen sale rota en la página y en las tarjetas de categoría.

## Flujo de trabajo

1. **Verificar que la keyword esté libre.** Antes de escribir, buscar en `src/content/poemas/` (con Grep) que ningún archivo existente ya ataque la keyword principal como H1 o title. Si está ocupada, proponer al usuario una variante (p. ej. "poemas cristianos sobre la unión familiar" en vez de "poemas cristianos para la familia").
2. **Elegir la categoría en la tabla canónica** y copiar literalmente su cadena, carpeta y heroImage.
3. **Nombrar el archivo** con la keyword principal en minúsculas, sin tildes, con guiones: `poemas-cristianos-para-decir-gracias.md`. Nunca espacios, mayúsculas ni sufijos como `(1)`.
4. **Escribir el archivo** siguiendo la estructura obligatoria y guardarlo en la carpeta de la tabla, en UTF-8.
5. **Validar con la checklist final** antes de entregar.

## Tabla canónica de categorías

Copiar las cadenas EXACTAMENTE como aparecen aquí (incluye tildes y mayúsculas):

| `category` (literal) | Carpeta en `src/content/poemas/` | `heroImage` | URL de categoría |
|---|---|---|---|
| `Biblical Poems for Mothers Day` | `biblical-poems-mother-day/` | `/images/mother-day.jpg` | `/poemas/biblical-poems-for-mothers-day/` |
| `Poemas para la Madre` | `poemas-para-la-madre/` | `/images/madre.jpg` | `/poemas/poemas-para-la-madre/` |
| `Poemas Cristianos para la Mujer` | `poemas-cristianos-para-la-mujer/` | `/images/mujer.jpg` | `/poemas/poemas-cristianos-para-la-mujer/` |
| `Poemas Cristianos de Esperanza` | `esperanza/` | `/images/esperanza.jpg` | `/poemas/poemas-cristianos-de-esperanza/` |
| `Poemas Bíblicos de Amor` | `amor/` | `/images/amar-a-dios.jpg` | `/poemas/poemas-biblicos-de-amor/` |
| `Poemas Cristianos para Reflexionar` | `reflexion/` | `/images/reflexion/reflexionN.jpg` (ver nota) | `/poemas/poemas-cristianos-para-reflexionar/` |
| `Poemas Cristianos de Fe` | `fe/` | `/images/fe.jpg` | `/poemas/poemas-cristianos-de-fe/` |
| `Poemas Cristianos de Fortaleza` | `poemas-de-fortaleza/` | `/images/fortaleza.jpg` | `/poemas/poemas-cristianos-de-fortaleza/` |
| `Poemas para Niños` | `niños/` | `/images/ninos1.jpg` | `/poemas/poemas-para-ninos/` |
| `Poemas Cristianos para Jóvenes` | `Poemas-Cristianos-para-Jovenes/` | `/images/joven.jpg` | `/poemas/poemas-cristianos-para-jovenes/` |
| `Poemas Cristianos Para Adolescentes` | `adolescentes/` | `/images/adolescentes.jpg` | `/poemas/poemas-cristianos-para-adolescentes/` |
| `Poemas Cristianos Sobre La Familia` | `Poemas-Cristianos-Sobre-La-Familia/` | `/images/familia.jpg` | `/poemas/poemas-cristianos-sobre-la-familia/` |

Notas:
- **Reflexión**: hay 11 imágenes rotativas (`reflexion1.jpg` … `reflexion11.jpg`). Elegir la menos usada: `grep -r "reflexion" src/content/poemas --include="*.md" -h | sort | uniq -c`.
- **Mothers Day sin apóstrofe**: la cadena es `Biblical Poems for Mothers Day`. Un apóstrofe (`Mother's`) rompe la URL generada.
- Todas las imágenes de la tabla existen en `public/images/`. Si se agrega o reemplaza una imagen de categoría, actualizar esta tabla.
- **Para crear, encargar o evaluar cualquier imagen del sitio, leer `references/imagenes.md`** (descripción del estilo visual, especificaciones técnicas y prompts listos para las imágenes pendientes).
- NO inventar categorías nuevas. Si el usuario pide un tema que no encaja, proponerle la categoría existente más cercana o preguntarle.

## Frontmatter obligatorio

```yaml
---
title: "Keyword Principal | Expansión SEO distinta al H1"
description: "1–2 líneas con la keyword principal de forma natural."
category: "«cadena literal de la tabla»"
tags:
  - keyword principal
  - 3 o 4 variantes semánticas
featured: false
pubDate: "AAAA-MM-DDT00:00:00Z"
heroImage: "«ruta literal de la tabla»"
---
```

- `title`: nunca idéntico al H1; formato `keyword principal + expansión` (ej.: `Poemas Cristianos para Mamá | Versos bíblicos para honrar a las madres`).
- `featured: false` por defecto. Solo `true` si el usuario lo pide explícitamente — si todo es destacado, nada lo es.
- `pubDate`: la fecha real de hoy, no una fecha de ejemplo.

## Estructura obligatoria del documento

```markdown
# Keyword principal (una sola vez en todo el archivo)

Introducción de 1–2 líneas que reutiliza la keyword principal con naturalidad.

## Keyword secundaria 1

*Subtítulo poético independiente*

verso...<br>
verso...<br>

## Keyword secundaria 2 (distinta)

*Otro subtítulo poético*

...

## Keyword secundaria 3 (distinta)

*Otro subtítulo poético*

...

## Keyword principal alternativa (variante, no repetición literal)

Texto de 1–2 líneas reutilizando variantes SEO de la keyword principal.

---

## Explorar más poemas

- [Categoría relacionada](URL exacta de la tabla)
- [Categoría relacionada](URL exacta de la tabla)
- [Categoría relacionada](URL exacta de la tabla)
```

- Cada poema ataca UNA keyword secundaria distinta; nunca repetir keywords ni subtítulos poéticos dentro del archivo ni respecto a archivos existentes.
- Los enlaces de "Explorar más poemas" usan **solo las URLs de categoría de la tabla** (con barra final), eligiendo 3 categorías temáticamente afines. No enlazar artículos individuales ahí ni escribir URLs de memoria.
- Terminar cada verso con `<br>`.

## Reglas literarias

- Versos de arte mayor y rima asonante.
- Voz lírica: canción íntima. Temple de ánimo: el que indique el usuario.
- Cada poema incluye al menos: 1 metáfora compleja, 1 sinestesia y 1 encabalgamiento.
- Imágenes sensoriales; evitar clichés y rimas fáciles (corazón/oración, amor/dolor).
- No explicar los recursos usados ni agregar notas o referencias al final.

## Variaciones semánticas

Distribuir variantes de la keyword sin repetir la misma forma (ejemplo para madre: madre, mamá, mamita, madres, mujer creyente, madre cristiana, madre de fe, madre especial). Aplicar el mismo principio en cualquier categoría.

## Checklist final (verificar antes de entregar)

1. `category` y `heroImage` copiados literalmente de la tabla — sin variantes.
2. La imagen existe: comprobar la ruta contra `public/images/`.
3. H1 = keyword principal, aparece una sola vez; `title` ≠ H1.
4. Ninguna keyword (principal o secundaria) usada ya en otro MD del sitio.
5. Todos los versos terminan en `<br>`.
6. Enlaces internos = URLs de la tabla, con barra final.
7. Archivo en la carpeta correcta, nombre en minúsculas-con-guiones, UTF-8 (tildes y ñ legibles).
8. `featured: false` y `pubDate` con la fecha real.

## Prohibido

- Inventar o variar nombres de categorías, rutas o imágenes.
- Agregar un campo `slug:` al frontmatter: Astro lo usaría como URL del artículo y puede chocar con la URL de una categoría (la URL correcta sale sola del nombre del archivo).
- Repetir el mismo título, H1 o keyword entre archivos distintos.
- Usar apóstrofes u otros signos especiales en `category`.
- Crear archivos con espacios, mayúsculas o sufijos `(1)` en el nombre.
