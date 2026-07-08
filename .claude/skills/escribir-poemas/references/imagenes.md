# Dirección de arte — imágenes de Poemas Bíblicos

Guía para crear, encargar o evaluar cualquier imagen del sitio. El objetivo es que todas las imágenes parezcan tomadas de la misma sesión fotográfica: hoy la mayoría ya lo cumple, y las nuevas deben sumarse a esa línea, no abrir otra.

## Descripción del estilo (la identidad visual)

**Fotografía editorial cálida a la hora dorada.** No ilustración, no render digital, no arte fantástico.

- **Luz**: sol bajo (amanecer o atardecer), contraluz suave, bruma ligera, rayos difusos. La luz es la protagonista espiritual: la fe se *sugiere* con luz y atmósfera, no con símbolos recargados.
- **Paleta**: dorados, cremas, beige, tonos tierra; verdes suaves de campo. Nada de colores saturados ni neones.
- **Escenarios**: campo abierto, praderas con pasto alto, colinas, caminos rurales de tierra, montañas al fondo; interiores rústicos y luminosos (madera clara, paredes crema) cuando el tema lo pide.
- **Personas**: actitud serena y contemplativa — mirando al horizonte, abrazando, orando, leyendo; casi nunca mirando a cámara. Ropa de tonos neutros (crema, beige, tierra), texturas naturales (punto, lino). Piel con textura real, sin retoque plástico.
- **Fe visual discreta**: una Biblia abierta, manos en oración, una iglesia lejana reflejada en un lago. Nunca cruces gigantes brillantes, ángeles, corazones dorados ni efectos de resplandor artificial.
- **Composición**: sujeto desplazado del centro, espacio negativo generoso (aire para que la imagen respire en las tarjetas), profundidad de campo con fondo suave.

**Contraejemplo (ya corregido en 2026-07-08)**: las antiguas `esperanza.jpg` y `amar-a-dios.jpg` eran render digital de fantasía (corazón dorado, cielo saturado) a 400×225 — exactamente lo que NO debe volver a entrar al sitio.

## Especificaciones técnicas

| Aspecto | Regla |
|---|---|
| Formato | JPG |
| Proporción / tamaño | Horizontal 16:9, ~1376×768 px (el estándar de las imágenes buenas actuales) |
| Peso | Menos de ~350 KB (comprimir si hace falta) |
| Texto | NUNCA texto, logos ni marcas de agua dentro de la imagen (el banner del hero es un caso aparte, compuesto en diseño) |
| Nombre de archivo | minúsculas, sin tildes ni espacios: `familia.jpg`, `adolescentes.jpg` |
| Ubicación | `public/images/` (las rotativas de reflexión en `public/images/reflexion/`) |
| Al agregar una imagen de categoría | Actualizar la tabla canónica de `SKILL.md` para que los nuevos poemas la usen |

Si el generador deja una marca de agua (estrella o logo en una esquina), recortarla o regenerar sin ella — varias imágenes actuales la tienen y conviene ir limpiándolas al reemplazarlas.

## Plantilla de prompt (generadores de imagen, en inglés)

Base común — añadir el sujeto delante y no quitar el estilo:

```
[SUJETO], warm golden hour light, soft backlight with gentle haze, pastoral
countryside, cream and earth tone natural clothing, serene contemplative mood,
editorial photography style, shallow depth of field, natural skin texture,
no text, no watermark --ar 16:9
```

## Prompts de referencia (usados para el lote del 2026-07-08, generado en vertical 2:3 — preferir 16:9 en lotes futuros)

**`fe.jpg`** (reemplaza el provisional `hero-poemas-biblicos.jpg` en la tabla):
```
A person with hands folded in quiet prayer over an open Bible, standing in a
golden wheat field at sunset, eyes closed, warm golden hour light, soft
backlight with gentle haze, cream knit sweater, serene contemplative mood,
editorial photography style, shallow depth of field, no text --ar 16:9
```

**`familia.jpg`**:
```
A young family — father, mother and two children — walking together on a rural
dirt path through golden meadows at sunset, holding hands, seen from behind,
warm golden hour light, gentle haze, cream and earth tone clothing, serene
mood, editorial photography style, no text --ar 16:9
```

**`adolescentes.jpg`**:
```
A small group of teenagers sitting on a wooden fence by a country field at
golden hour, talking and smiling gently, one holding a small book, warm soft
backlight, earth tone casual clothing, hopeful serene mood, editorial
photography style, shallow depth of field, no text --ar 16:9
```

**`esperanza.jpg` (regenerar — la actual rompe el estilo)**:
```
Sunrise breaking over misty green hills, a narrow dirt path leading toward the
light, soft rays through morning haze, golden and cream tones, peaceful and
hopeful atmosphere, editorial landscape photography, no people, no text --ar 16:9
```

**`amar-a-dios.jpg` (regenerar — la actual rompe el estilo)**:
```
Close-up of gentle hands holding a small worn Bible with a few wildflowers on
top, golden hour light streaming from the side, warm cream and earth tones,
soft focus meadow background, tender reverent mood, editorial photography
style, no text --ar 16:9
```

## Checklist al evaluar una imagen nueva

1. ¿Parece fotografía real de la hora dorada (no render, no ilustración)?
2. ¿La paleta es dorado/crema/tierra, sin saturación artificial?
3. ¿Las personas están serenas, con ropa neutra, sin mirar a cámara?
4. ¿16:9, ~1376×768, JPG, menos de 350 KB, sin texto ni marca de agua?
5. ¿El nombre del archivo es minúsculas-sin-tildes y está en `public/images/`?
6. ¿Se actualizó la tabla de `SKILL.md` si es imagen de categoría?
