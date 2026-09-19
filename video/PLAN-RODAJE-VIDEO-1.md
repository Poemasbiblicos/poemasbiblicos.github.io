# Plan de rodaje — Vídeo 1 "Posicioné una web en Google sin pagar un peso"

**Grabación:** 19/09/2026 · **Guion base:** `GUION-VIDEO-SEO-GRATIS.md`
**Objetivo:** grabar, editar y subir el mismo día.

---

## 0 · ANTES DE ENCENDER NADA (15 min)

### 0.1 Revalidar los números

Los datos cambian a diario. **Abre Search Console y apunta los de esa mañana.**
Estos son los del 18/09, rango 28 días:

| Dato | Valor |
|---|---|
| Clics | 239 |
| Impresiones | 7.010 |
| CTR | 3,4 % |
| Posición media | 7 |
| "poemas cristianos" | pos. 5,4 · 973 impresiones |
| "poemas biblicos" (sin tilde) | pos. 7,3 |
| "poemas bíblicos" (con tilde) | pos. 2,8 |

### 0.2 El gancho, corregido

**NO digas** "segunda posición". Solo es cierto con tilde.

Di esto, que es verdad en cualquier variante y se puede comprobar:

> "Esta página está en la primera página de Google compitiendo por 'poemas cristianos',
> que tiene casi mil impresiones al mes. Y no he pagado ni un solo peso:
> ni hosting, ni dominio, ni plantillas, ni plugins. Cero.
> Ahora te enseño exactamente cómo, y también por qué probablemente tú no deberías hacerlo así."

Si al grabar la búsqueda en directo sales en un puesto muy bueno, **dilo en ese momento
señalando la pantalla**. Que el dato salga de la grabación y no de tu promesa previa.

### 0.3 Privacidad — revisa esto o te arrepientes

- [ ] Ventana de Chrome **limpia**: sin marcadores a la vista, sin otras pestañas
- [ ] Search Console: **oculta tu correo** (esquina superior derecha) y el selector de propiedades si tienes más webs
- [ ] Terminal: que el prompt no muestre rutas con tu nombre real si no quieres
- [ ] Cierra Slack, WhatsApp, correo. Cualquier notificación te obliga a repetir la toma
- [ ] Zoom del navegador al **125 %** — en móvil no se lee nada al 100 %

---

## 1 · CAPTURAS DE PANTALLA (grábalas TODAS primero, sin hablar)

Graba en silencio y seguido. La voz se pone después. Así no repites tomas por trabarte.
**Resolución 1920×1080, 30 fps.** Cada clip, unos segundos de margen al principio y al final.

| # | Toma | Qué haces exactamente | Dura |
|---|---|---|---|
| T1 | **La prueba** | Ventana de incógnito → buscar `poemas cristianos` → scroll lento hasta tu resultado → parar ahí | 25 s |
| T2 | **La prueba 2** | Incógnito → `poemas bíblicos` → scroll hasta el resultado | 20 s |
| T3 | **El planificador** | Planificador de Palabras Clave con la columna de pujas del nicho de poemas casi vacía | 15 s |
| T4 | **El repositorio** | GitHub, vista del repo, scroll por las carpetas | 15 s |
| T5 | **El workflow** | Abrir `.github/workflows/deploy.yml`, scroll lento | 15 s |
| T6 | **El despliegue vivo** | Cambiar un texto → `git push` → pestaña Actions corriendo → web actualizada | 60 s |
| T7 | **Los números** | Search Console, Rendimiento, 3 meses. Las 4 tarjetas visibles | 20 s |
| T8 | **La tabla de consultas** | Pestaña Consultas con posiciones a la vista | 20 s |
| T9 | **Archivo duplicado** | Explorador con un `poema (1).md` junto al original | 10 s |
| T10 | **Categorías rotas** | Las dos variantes de "Fortaleza" escritas distinto, lado a lado | 15 s |
| T11 | **Colisión de URLs** | Las dos rutas `[slug]` y `[category]` abiertas en el editor | 20 s |
| T12 | **Imagen rota** | Página con el icono de imagen rota | 10 s |
| T13 | **El sitemap muerto** | Search Console → Sitemaps → "No se ha podido obtener" con la fecha | 20 s |
| T14 | **Imágenes pesadas** | DevTools → Network → una página cargando MB de fotos | 20 s |
| T15 | **El derrumbe** | Gráfica de 28 días con la caída de agosto bien visible | 20 s |
| T16 | **Cero commits** | Terminal: `git log` mostrando el hueco entre julio y agosto | 20 s |
| T17 | **Hostinger** | Página de planes, sin meter datos ni comprar nada | 15 s |

**Total: unos 6 minutos de material.** Da de sobra para cubrir 12 de vídeo con cortes.

### Comando para T16

```bash
git log --since="2026-06-01" --until="2026-09-01" --date=short --pretty="%ad %s"
```

Se ve el salto del 8 de julio al 30 de agosto. **Es tu prueba visual de que no tocaste nada.**

---

## 2 · TOMAS DE CÁMARA

Solo estos tramos van a cámara. El resto es voz sobre captura.

| # | Tramo | Minuto | Por qué a cámara |
|---|---|---|---|
| C1 | Gancho | 0:00 | Necesita cara |
| C2 | "Lo que se rompió" — entrada | 5:30 | Es el momento emocional |
| C3 | El derrumbe del 70 % | 8:30 | La frustración se ve |
| C4 | "¿Vale la pena?" | 9:30 | Es tu opinión, no un dato |
| C5 | Afiliado | 10:30 | **A cámara obligatorio.** Un aviso de afiliado en voz en off suena a que lo escondes |
| C6 | Cierre | 11:30 | Cierre y suscripción |

**Encuadre:** medio busto, cámara a la altura de los ojos. Para C2 y C3 acércate un poco: la cercanía refuerza la confidencia.

---

## 3 · ORDEN DE GRABACIÓN

No grabes en orden del guion. Este orden ahorra un montón de tiempo:

1. **Las 17 capturas seguidas** (~40 min con repeticiones)
2. **Las 6 tomas de cámara** (~30 min)
3. **La voz en off** de los tramos sin cara (~25 min)

Graba la voz en off **leyendo en voz alta pero conversacional**. Si suena leído, respira antes de cada frase y baja el ritmo.

---

## 4 · CHECKLIST TÉCNICO

**Audio** (es lo que decide si alguien se queda):
- [ ] Micrófono a un palmo de la boca, fuera de plano
- [ ] Graba 10 s de silencio de la sala → te sirve para quitar ruido al editar
- [ ] Habitación con cortinas o ropa: el eco arruina más vídeos que la mala imagen

**Imagen:**
- [ ] Luz de frente, nunca ventana detrás
- [ ] Cámara 1080p a 30 fps, la misma que las capturas

**Material listo en el escritorio antes de empezar:**
- [ ] Tu enlace de afiliado de Hostinger, copiado
- [ ] Search Console abierto y con sesión
- [ ] El repo abierto en el editor
- [ ] Terminal en la carpeta del proyecto

---

## 5 · MONTAJE

**Los primeros 15 segundos deciden el vídeo.** Arranca con T1 ya en marcha, sin intro, sin logo, sin "hola qué tal". El gancho encima de la búsqueda corriendo.

Estructura:

```
T1 (búsqueda) + voz del gancho
  └─ corte a C1 (cara) en "y no he pagado ni un peso"
C1 completo → promesa
T3 planificador → el nicho
T4+T5 → el stack
T6 → el despliegue (déjalo respirar, es satisfactorio de ver)
T7+T8 → los números
C2 → entrada a "lo que se rompió"
T9…T14 → los seis fallos, uno por uno, rápido
C3 + T15 + T16 → el derrumbe
C4 → ¿vale la pena?
C5 + T17 → afiliado
C6 → cierre
```

**Ritmo:** ningún plano fijo más de 6 segundos sin que pase algo. Si una captura es larga, hazle zoom progresivo.

**Subtítulos quemados**, sí o sí. Buena parte se ve sin sonido.

---

## 6 · MINIATURA

Necesitas una captura extra que no está en la lista: **tu resultado en Google, en grande, recortado**.

- Izquierda: tu cara con gesto de **agotamiento**, no de triunfo
- Derecha: esa captura con un círculo rojo en tu posición
- Texto: **$0** tachado, y debajo *"…pero"* en pequeño

La contradicción visual es lo que hace el clic. Un "$0" a secas se lee como clickbait; el "…pero" promete honestidad.

---

## 7 · ANTES DE PULSAR PUBLICAR

- [ ] Marcada la casilla **"el vídeo contiene promoción pagada"**
- [ ] El aviso de afiliado en la **primera línea** de la descripción
- [ ] Capítulos pegados (los tienes en el guion base)
- [ ] Miniatura subida, no el fotograma automático
- [ ] Revisa que no se te vea el correo en ninguna captura
- [ ] Comentario fijado: pregunta directa para arrancar conversación —
      *"¿Prefieres pelearte con la consola o pagar para que funcione solo?"*

---

## 8 · CUANDO LO SUBAS

El vídeo pide el paso a paso técnico en el cierre. **Ese ya está escrito** en
`GUION-VIDEO-TUTORIAL-PASO-A-PASO.md`. Si este funciona, el segundo se graba
con este mismo plan y la mitad de las capturas ya las tienes.
