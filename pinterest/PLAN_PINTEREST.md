# Plan de Pinterest — Poemas Bíblicos

## 1. Tableros a crear (12)

Nombre exacto y descripción. Las descripciones usan las keywords reales de Search Console,
que es lo que Pinterest indexa para mostrarte en sus búsquedas.

| Tablero | Descripción |
|---|---|
| **Poemas Cristianos para Reflexionar** | Poemas cristianos para reflexionar sobre la vida, la fe y el amor de Dios. Versos bíblicos para meditar con calma y compartir. |
| **Poemas Cristianos de Fe** | Poemas de fe en Dios para fortalecer la confianza cuando el camino es incierto. Versos bíblicos sobre creer y confiar. |
| **Poemas Cristianos de Esperanza** | Poemas cristianos de esperanza y aliento para tiempos difíciles. Versos bíblicos que renuevan el ánimo. |
| **Poemas Cristianos de Fortaleza** | Poemas cristianos de ánimo, consuelo y fortaleza espiritual para el alma que persevera. |
| **Poemas Bíblicos de Amor** | Poemas bíblicos de amor, gratitud y alabanza a Dios. Versos cristianos para dedicar y compartir. |
| **Poemas para la Madre** | Poemas cristianos para mamá: versos bíblicos de gratitud para honrar a las madres en su día y todo el año. |
| **Poemas Cristianos para la Mujer** | Poemas bíblicos para la mujer cristiana: versos sobre su fuerza, su fe y su dignidad. |
| **Poemas Cristianos Sobre La Familia** | Poemas cristianos para la familia: versos bíblicos de unidad, hogar y fe compartida. |
| **Poemas para Niños** | Poemas cristianos para niños con rimas sencillas para la escuela dominical y la lectura en casa. |
| **Poemas Cristianos para Jóvenes** | Poemas cristianos para jóvenes sobre identidad, propósito y fe en las nuevas generaciones. |
| **Poemas Cristianos Para Adolescentes** | Poemas cristianos para adolescentes sobre las dudas, el crecimiento y la fe. |
| **Biblical Poems for Mothers Day** | Biblical and Christian poems for Mother's Day. Verses to honor mothers with faith and gratitude. |

## 2. Plantilla de descripción del pin

Cada pin necesita su propia descripción (Pinterest la usa para buscar). Fórmula:

```
[Keyword principal del poema]. [Una frase sobre lo que ofrece el poema].
Lee el poema completo en poemasbiblicos.github.io

#poemascristianos #poemasbiblicos #[tema] #fe #versiculos
```

Ejemplo real:

```
Poemas cristianos de ánimo para cuando faltan las fuerzas. Versos bíblicos
de aliento para levantar el alma y seguir adelante.
Lee el poema completo en poemasbiblicos.github.io

#poemascristianos #poemasdeanimo #fe #aliento #versiculosbiblicos
```

**Enlace del pin:** siempre la URL del poema (`https://poemasbiblicos.github.io/poemas/<slug>/`),
nunca la portada. El objetivo es que caigan directo en el contenido.

## 3. Ritmo de publicación

- **Semanas 1-2:** 5 pines al día, repartidos entre tableros distintos. Sirve para que
  Pinterest entienda de qué va la cuenta.
- **A partir de la semana 3:** 2-3 pines diarios, sostenidos.
- La constancia importa más que el volumen. Mejor 2 diarios durante seis meses que
  100 en una semana y nada después.

## 4. Generador de pines

```bash
node pinterest/generar-pines.cjs                          # todos los poemas
node pinterest/generar-pines.cjs poemas-cristianos-de-animo   # uno solo
```

Salen a `pinterest/pines/` en 1000x1500 px (proporción 2:3, la que Pinterest prioriza).
Genera hasta 3 pines por artículo, uno por cada poema, usando una estrofa distinta.

Con los 50 artículos del plan editorial salen unos **150 pines**, que a 2-3 diarios
son más de dos meses de publicación sin escribir nada nuevo.

## 5. Qué queda pendiente

- **Verificar el dominio en Pinterest**: requiere añadir una etiqueta al sitio.
  Dejarlo para cuando termine el congelamiento (2 semanas). Se puede publicar sin verificar;
  solo se pierden las estadísticas de atribución.
- **Rich Pins**: una vez verificado el dominio, se activan solos gracias a las etiquetas
  Open Graph que el sitio ya tiene correctamente puestas.
