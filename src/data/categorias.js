// Contenido editorial propio por categoria, indexado por el slug que genera
// [category].astro. Una categoria sin entrada aqui se comporta exactamente
// como antes: titulo y descripcion genericos y solo el listado de poemas.
export const contenidoCategorias = {
  "poemas-biblicos-de-amor": {
    title: "Poemas Bíblicos de Amor | Versos sobre el amor de Dios",
    description:
      "Poemas bíblicos de amor sobre el amor de Dios, el amor entre esposos y el amor al prójimo: versos cristianos inspirados en 1 Corintios 13 y el Cantar de los Cantares.",
    intro:
      "Poemas bíblicos de amor escritos desde las tres formas en que la Escritura habla del amor: el que Dios entrega sin condición, el que une a dos personas y el que se ofrece al que tenemos al lado.",
    kicker: "Amor bíblico",
    secciones: [
      {
        titulo: "Qué entiende la Biblia por amor",
        parrafos: [
          "El castellano usa una sola palabra donde la Biblia usa varias. El griego del Nuevo Testamento distingue el <em>ágape</em>, el amor que se decide y no depende de lo que reciba a cambio; la <em>philía</em>, el afecto entre quienes comparten la vida; y el <em>eros</em>, el amor que busca y desea. Los poemas bíblicos de amor recorren las tres, porque las tres aparecen en el texto sagrado sin pedir disculpas por existir.",
          "El pasaje que mejor define el primero es 1 Corintios 13, donde el amor no se describe por lo que siente sino por lo que hace: es paciente, no lleva cuentas del mal, todo lo soporta. Es una definición incómoda, porque convierte el amor en algo que se puede verificar. Ese es el pulso que intentan recoger estos versos cristianos de amor.",
        ],
      },
      {
        titulo: "El amor entre dos personas en las Escrituras",
        parrafos: [
          "El Cantar de los Cantares es un libro entero dedicado al amor entre un hombre y una mujer, escrito con una sensualidad que a muchos lectores todavía sorprende encontrar en la Biblia. No es una alegoría disimulada: es poesía de amor, y su presencia en el canon dice algo sobre cómo la fe cristiana entiende el deseo.",
          "De ahí nacen los <a href=\"/poemas/poemas-cristianos-para-bodas/\">poemas cristianos para bodas</a> y los versos que se dedican a la pareja: el matrimonio como pacto, no como contrato, y la promesa como una forma cotidiana de amor más que como una ceremonia.",
        ],
      },
      {
        titulo: "Poemas de amor a Dios y al prójimo",
        parrafos: [
          "Cuando le preguntaron cuál era el mandamiento más importante, Jesús respondió con dos y los dejó unidos: amar a Dios con todo el ser y amar al prójimo como a uno mismo. La tradición cristiana nunca ha conseguido separarlos, y la poesía tampoco debería.",
          "Por eso esta categoría reúne tanto los <a href=\"/poemas/poemas-amar-a-dios/\">poemas para amar a Dios</a> como los que celebran el afecto humano: los <a href=\"/poemas/poemas-biblicos-del-hogar/\">poemas bíblicos del hogar</a>, los <a href=\"/poemas/poemas-cristianos-de-cumpleanos/\">versos de cumpleaños</a> y los <a href=\"/poemas/poemas-de-agradecimiento-a-dios/\">poemas de agradecimiento</a>. En la Biblia el amor no se reparte en compartimentos: se aprende en uno y se practica en el otro.",
        ],
      },
    ],
  },
};
