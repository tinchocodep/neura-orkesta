# Rediseño neuraorkesta.com — Diseño

**Fecha:** 2026-09-04
**Estado:** propuesta, pendiente de aprobación

## Problema

La web se hizo hace ~5 meses y quedó desfasada del pitch actual de la empresa en cuatro ejes:

1. **Posicionamiento.** La web nunca dice que Neura se **integra** al ERP que la empresa ya tiene — que es el punto fuerte del producto. Habla de "motores" y "cajas mágicas" en abstracto, lo cual deja al lector armando la hipótesis equivocada de que Neura viene a reemplazarle el sistema.
2. **Contenido.** La web vende una "Trilogía Sinérgica" de 3 productos. El deck comercial vende **4 capas** (Sync → Core → **ERP** → Insight). Falta además todo el material que los decks sí tienen: "el dato entra dos veces" con sus tres costos, el número de respaldo (+15hs/semana por empleado administrativo), las industrias, el Tablero Base, el modelo de activación en dos niveles, el diferencial de software a medida, los 3 modelos de trabajo y el cronograma real del Desafío 24hs. El copy dice AFIP; el organismo hoy se llama ARCA.
3. **Venta.** La primera pantalla no tiene ningún CTA. El header aparece recién a `window.innerHeight * 0.8` (`ScrollHeader.tsx:26`) y su botón "Contacto" no abre WhatsApp: hace `scrollIntoView` al footer, ~700vh abajo. El H1 dice el nombre de la empresa, no qué vende.
4. **Movimiento.** Hay ~136 llamadas `motion.*` y ~50 `whileInView`, prácticamente todas con el mismo `initial={{opacity:0, y:20..40}}`. No hay parallax, ni escenas ancladas, ni scroll-scrubbing real (salvo el fade del hero y la línea del timeline). El sitio se siente estático porque *es* el mismo gesto repetido 50 veces.

## Decisiones tomadas

| Decisión | Valor |
|---|---|
| Alcance de contenido | Todo el deck, incluidos los 3 modelos comerciales |
| Prueba social | Hay clientes reales que se pueden nombrar → sección propia |
| Capturas del producto | Existen y se van a usar → reemplazan mockups inventados |
| Precio | Sin números. La sección se llama "Cómo trabajamos", no "Cuánto sale" |
| Video del hero | Nuevo y liviano. IA solo para textura física; nada de texto generado |

## Regla de posicionamiento (la más importante del documento)

**Neura Orkesta NO es un ERP, y tampoco se integra sólo a un ERP. Se integra a TODAS las herramientas que la empresa ya usa.**

Una planilla de Excel, una carpeta de Drive, un ERP, un sistema contable, el home banking, WhatsApp, el mail. El ERP es *una* de esas herramientas, no el eje. Centrar el discurso en el ERP achica el producto y deja afuera a la mayoría de las PyMEs, que no tienen un ERP sino un conjunto desordenado de planillas y carpetas.

El punto fuerte es la unificación: *digitalizamos, conectamos y automatizamos para que tengas la visión completa de tu PyME y tomes mejores decisiones.* Es exactamente lo que dice LinkedIn: **"unifica los sistemas que ya tenés"**.

Tiene un sistema de gestión propio incluido, pero eso es una red de seguridad para el que no tiene nada — no es lo que se vende.

Ninguna pieza de copy puede afirmar ni sugerir que Neura reemplaza el ERP, el sistema contable, las planillas o el contador. La formulación canónica está en la diapositiva 3 de `public/deck.html`:

> "Tu equipo ingresa como le resulta natural — WhatsApp, PDF, Excel sin formato. Neura lo interpreta, lo estructura y **lo sube** exactamente como lo necesita."

**Vocabulario.** PROHIBIDO: "nuestro ERP", "el ERP de Neura", "Neura es un ERP", "reemplazá tu sistema", y también hablar de la integración *sólo* en términos de ERP. PERMITIDO: "las herramientas que ya usás", "se integra a", "les manda los datos a", "Excel, Drive, tu ERP, tu banco".

**Implicancia para SEO:** las keywords de ERP se conservan — quien busca "ERP para PyMEs" es parte del público — pero el copy visible nunca dice que Neura *sea* un ERP ni que el ERP sea el único destino. Dice que se conecta con lo que ya tenés, sea lo que sea.

## Principios

1. **El contenido primero.** La reestructura de copy vale ~80% del valor comercial y es independiente del sistema de animación. Se publica antes que cualquier escena.
2. **Si una animación no demuestra algo que el copy afirma, se borra.** Filtro único para todo el movimiento del sitio.
3. **Ningún texto que un prospecto argentino pueda leer sale de un modelo generativo.** El video hace textura (papel, luz, escritorio); todo dato, número o CUIT se arma en DOM.
4. **Scrub antes que trigger.** Lo estructural pasa de `whileInView once:true` a `scrollYProgress`. Es la traducción técnica literal del pedido "que se mueva mientras uno va bajando".
5. **Sístole y diástole.** Después de cada escena cara va una sección deliberadamente quieta. "Más movimiento" sin contraste es mareo.
6. **Color = estado, no decoración.** Gris = manual/pendiente. Azul = procesado por Neura. Verde = confirmado/registrado. Se respeta en todas las demos y hace legible la animación sin leyendas.
7. **Un solo CTA primario:** WhatsApp. Neuralite baja a secundario dentro de "Cómo trabajamos".
8. **Reduced-motion significa sin movimiento, no sin contenido.** Cada demo queda en un estado final legible; los números, los 3 motores y las 7 industrias se ven completas igual.

## Arquitectura

Nueve secciones, ordenadas como embudo: dolor con mecanismo → producto → prueba → riesgo → modelo → calificación → objeciones → cierre.

### 1. Hero

**Propósito:** los 5 segundos. Qué es, para quién, cuánto tarda, y un botón.

- **H1:** "Conectamos todo lo que ya usás."
- **Bajada:** "NeuraOrkesta digitaliza, conecta y automatiza tu PyME para que tengas la foto completa y decidas con datos."
- **CTAs:** `[Escribinos por WhatsApp]` primario + `[Ver cómo funciona]` secundario (ancla a la sección 3).
- **Tira de prueba:** "Andando en 24hs · Sin permanencia · Se conecta a tu sistema contable actual · Equipo argentino, ARCA y bancos locales".
- **Franja de clientes:** logos reales, discretos, debajo de la tira.
- El wordmark NEURAORKESTA baja a logo en el header; deja de ser el H1.

**Nota sobre el H1.** El H1 elegido deja explícito desde el primer segundo que Neura no reemplaza nada, que es la corrección de posicionamiento central de este documento. La bajada conserva los verbos exactos de LinkedIn (digitaliza, conecta, automatiza) y cierra con el beneficio real —la foto completa para decidir—, no con una capacidad técnica. "Gestioná tu PyME en tiempo real" se mantiene como cierre de marca en la sección 9.

Descartado: "El ERP con IA que carga los datos por vos". Vendía mejor pero afirmaba que Neura *es* un ERP, que es exactamente lo que no es.

**Movimiento:** reveal tipográfico por línea con máscara, 3 líneas escalonadas 60ms, terminado antes de los 400ms. Después entra "el dato" (una tarjeta-documento) y aterriza en el marco: ese objeto es el que va a viajar por toda la página. Se elimina el `useTransform` de scale+fade actual — cuesta y no aporta.

### 2. Qué hace Neura

**Propósito:** decir lo que Neura hace, no lo que la empresa hace mal.

Esta sección reemplaza a la vieja "El dato entra dos veces", que estaba construida sobre el error: el doble trabajo, las horas perdidas, los seis ejemplos de carga manual, y hasta un "nada de esto es culpa de tu equipo" que, por más que absolviera, seguía hablando de culpa. **Decisión del cliente: el foco va en lo que Neura hace hoy, no en el problema.**

- **Titular:** "Tu operación, al día sola."
- **Bajada:** "Neura digitaliza lo que entra, conecta las herramientas que ya usás y automatiza el trabajo de darle formato al dato. Tu equipo sigue trabajando como siempre."
- **Los tres verbos** como bloques: Digitaliza · Conecta · Automatiza.
- **Lo concreto, desde el primer día** — los seis ejemplos del deck, dados vuelta de dolor a capacidad:
  "Las facturas de proveedores se cargan solas" · "El resumen del banco se concilia solo" · "Las cobranzas quedan registradas al momento" · "Los remitos y las facturas ARCA salen automáticos" · "La liquidación de sueldos, sin tipear" · "El reporte que necesitás hoy, listo hoy".

**El +15hs y los tres costos salen de la web.** Siguen sirviendo para el deck y para una conversación de venta, donde hay alguien que puede leer la reacción del otro. En frío, en una landing, abrir por el error pone al lector a la defensiva.

### 3. El recorrido de un dato

**Propósito:** el corazón. El pitch de LinkedIn hecho movimiento. Una sola escena anclada reemplaza a `ProductsSection` (258 líneas) y `SolutionSection` enteras.

Antetítulo fijo: "Digitalizá. Conectá. Automatizá. Orquestá."

**El encuadre de toda la sección**, tomado de la diapositiva 3: *"Neura no elimina la carga de datos. Elimina el trabajo de darle formato."* Es una afirmación honesta y diferenciada — no promete magia, promete sacarte el reformateo.

| Motor | Titular | Contenido |
|---|---|---|
| **SYNC** | "Digitaliza lo que entra y lo conecta con todo lo que ya usás." | Mandá lo que sea (WhatsApp, PDF, Excel sin formato, fotos, mails). Neura lo interpreta con IA, lo estructura y **se lo entrega ya formateado a cada herramienta**: Excel, Drive, tu ERP, tu sistema contable, tu banco, ARCA. |
| **CORE** | "La pantalla donde operás tu empresa." | CRM y oportunidades, tesorería y cobranzas, compras y proveedores, logística y entregas, tareas y flujos de aprobación. Cada acción genera sus registros derivados sola. |
| **INSIGHT** | "Preguntale a tu empresa, en castellano." | Dashboards por área, estado de resultados, consultas en lenguaje natural, alertas proactivas, exportar a Excel/PDF. |

**Son TRES motores, no cuatro capas.** La integración no es un paso posterior: es lo que hace Sync. El dato entra desde Excel, Drive o WhatsApp *y* sale hacia las herramientas de la empresa en el mismo momento, así que separarla en una capa propia la aleja de donde realmente ocurre — y de paso convierte al ERP en un destino con sección propia, que es exactamente lo que no queremos.

**Sync es el motor más delicado en términos de posicionamiento.** Reglas de copy:

- El sujeto de la frase es **Neura conectándose**, nunca Neura siendo el sistema.
- Se nombran **varias herramientas, no sólo el ERP**: Excel, Drive, ERP, sistema contable, banco. El ERP aparece en la lista, nunca como titular.
- El sistema de gestión propio se nombra **último y en tono menor**: red de seguridad para quien no tiene nada, no la propuesta de valor.

**Capturas reales del producto** van acá, una por acto. Reemplazan los mockups inventados: es la prueba más fuerte disponible.

**Tablero Base** (contenido nuevo, de la diapositiva 5 de `public/deck.html`) cierra la sección: *"Cada módulo que activás viene con su Tablero Base ya configurado. No arrancás de cero — arrancás con la estructura del área funcionando: KPIs, tablas, alertas y flujos listos desde el primer día."* Es la prueba concreta de que el "operativo en 24hs" es posible, y hoy no está en ningún lado de la web.

**Movimiento:** escena anclada de ~350vh con escenario central fijo y `scrollYProgress` mapeado a 4 tramos. El objeto "dato" que nació en el hero se transforma acto por acto. Todo `transform`/`opacity`, una sola capa, sin layout. **Es la única escena anclada del sitio.**

### 4. Clientes

**Propósito:** el hueco más grande que marcó el panel de jueces. Le estamos pidiendo a un dueño de PyME su facturación, su banco y sus sueldos; la evidencia no puede ser solo tipografía.

Clientes con nombre y logo, y al menos un testimonio con cara y cargo. Si hay un caso con números reales ("arrancó un martes, 22 empleados"), va acá.

La prueba social aparece **dos veces y con roles distintos**, no por redundancia: una franja de logos en el hero (señal de confianza en los primeros 5 segundos, sin texto) y esta sección completa con testimonio (evidencia argumentada, después de que el visitante ya entendió el producto).

**Movimiento:** mínimo. Es zona de credibilidad; el espectáculo la debilita.

### 5. Andás mañana

**Propósito:** bajar el riesgo percibido **antes** de hablar de plata. La PyME no le teme al precio, le teme a la implementación eterna.

- **Titular:** "Hoy nos contás. Mañana a las 8 tu equipo está operando."
- Día 0 mañana — kick-off, entendemos tus datos y procesos, exportamos lo necesario.
- Día 0 tarde — configuramos, cargamos datos, activamos integraciones.
- Día 1, 8:00 AM — tu equipo entra, tutorial de 15 minutos, empieza a operar.

**Movimiento:** track horizontal corto — los 3 hitos se desplazan lateralmente con el scroll vertical (`x` atado a `scrollYProgress`, ~120vh, sin hijack). Es el único scroll horizontal de la página; por eso se nota.

### 6. Cómo trabajamos

**Propósito:** pedido explícito del cliente y probable driver de mensajes. Va al ~55% de profundidad, no al final.

- **Titular:** "Tres formas de trabajar juntos. Ninguna te ata."
- **Modelo 01** Producto ya desarrollado — fee de instalación único + suscripción mensual por uso y soporte. Operando en 24hs.
- **Modelo 02** Customización sobre Neura Orkesta — fee de instalación y configuración + suscripción mensual.
- **Modelo 03** Desarrollo a medida — presupuesto por proyecto, por etapas; mantenimiento opcional. Al expandir, los 4 pasos del deck: te escuchamos el dolor real sin consultores en el medio / diseñamos juntos, prototipo antes que código / primera versión en semanas / se integra a tu Orkesta, no queda como isla.
- **Franja transversal:** implementación 24hs · sin permanencia · soporte continuo · escalamos con vos · equipo local.
- **Sin montos.** El título promete estructura, no precio. "Probá gratis Neuralite" vive acá como CTA secundario.

**Cómo se empieza — el modelo de activación en dos niveles** (diapositiva 7 de `public/deck.html`, contenido nuevo). Es un eje distinto de los 3 modelos: los modelos dicen *cómo se cobra*, los niveles dicen *por dónde arrancás*.

- **Nivel 1 · Motores individuales.** Sync, Core o Insight se activan por separado. Cada uno viene con su Tablero Base ya configurado: operativo desde el día uno, sin depender del resto.
- **Nivel 2 · Orkesta completo.** Con los tres motores integrados se habilita el **sistema de fichas** — módulos adicionales por área para profundizar según lo que necesite la operación.

Esto además le da sentido a las fichas, que hoy en la web son un marquee de 30 nombres sin explicación de para qué sirven ni cuándo aparecen.

**Movimiento:** deliberadamente quieto. Es la sección donde el comprador tiene que leer, no mirar.

### 7. ¿Es para vos?

**Propósito:** autocalificación. También responde "esto es para empresas grandes".

- **Titular:** "No es solo para PyMEs. Es para cualquier empresa que opera."
- **7 industrias**, cada una con su línea concreta: Distribución y Logística (pedidos, remitos, rutas, entregas) · Retail y Mayoristas (stock, precios, cobranzas) · Servicios B2B (presupuestos, facturación, contratos) · Industria y Manufactura (producción, insumos, nómina) · Construcción (obras, materiales, subcontratistas, costos por obra) · Salud y Profesionales (turnos, facturación, honorarios) · **Agro** (campo, acopio).

  `deck-comercial.html` lista 6 y `neura-slide.html` lista Agro como séptima. Van las 7: en Argentina el agro es un segmento demasiado grande para dejarlo afuera de la grilla de autocalificación.
- Debajo, el marquee de 30 módulos que ya existe, con bajada: "Activás lo que necesitás. Pagás por lo que usás." La adyacencia es obligatoria: suelto es relleno, pegado a las industrias es prueba de amplitud.

**Movimiento:** el swap de línea es una máscara horizontal, nunca crossfade. El marquee conserva sus keyframes CSS pero se le ata la velocidad a `useVelocity(scrollY)`: si scrolleás rápido corre más rápido, si parás sigue lento. Es el detalle más barato que hace sentir que la página responde al dedo.

### 8. Por qué Neura

**Propósito:** cerrar objeciones. Visión, misión y ADN se conservan pero degradados de sección a franja: son el contenido que menos convierte y hoy se comen dos pantallas.

- **Titular:** "Seis razones, ninguna es un slogan."
- Implementación en 24hs / se conecta a lo que ya tenés / modular, pagás lo que usás / IA en el centro, trabajando en cada registro / sin permanencia obligatoria / equipo local que entiende ARCA, SIPER y los bancos de acá.
- Debajo, franja compacta: la misión ("Automatizar lo ordinario para que las personas se dediquen a lo extraordinario"), la visión en una línea, y los 5 valores del ADN en lista tipográfica con hairlines.

**Movimiento:** revelado por barrido diagonal, una sola onda. Las tarjetitas con ícono son lo que hace que un sitio se sienta genérico y esta marca ya tiene tres secciones así: acá va lista tipográfica, no grilla de tarjetas.

### 9. Contacto

**Propósito:** convertir. Un solo pedido, específico y de bajo compromiso.

- **Titular:** "Contame tu peor proceso manual. Te mostramos cómo lo resolvemos."
- Botón WhatsApp con mensaje prellenado según la sección de origen.
- Debajo: mail, Instagram, LinkedIn, teléfono, Neuracall S.A., año actualizado.
- **Cierre de marca:** "Gestioná tu PyME en tiempo real."

**Movimiento:** el "dato" que viajó desde el hero llega acá y se convierte en el globo de WhatsApp del botón. Cierre del arco visual.

**Transversal:** CTA flotante de WhatsApp que aparece a partir de la sección 2 y se esconde en el footer.

## Sistema de movimiento

El problema no es que falte movimiento: es que hay ~50 instancias del **mismo** movimiento. El remedio es estructural, no cosmético.

`src/motion.ts` centraliza la escalera de tiempos y prohíbe la improvisación:

- **Dos duraciones:** 320ms micro, 700ms macro. Stagger máximo 60ms.
- **Dos curvas:** expo-out para reveals, spring 260/30 para interacción.
- **Primitivas con nombre**, elegidas por rol narrativo y no por gusto:
  - **PULSO** — una luz que recorre un camino. Firma de marca, reaparece en exactamente 3–4 lugares (las 4 capas, el marquee, el botón final). Es el 20% del sistema que da el 80% de la sensación de "esto está vivo y es una sola cosa".
  - **RESOLVER** — el valor nace como `▒▒▒` monoespaciado y resuelve de desenfoque a nitidez, como un OCR terminando. Reemplaza el fade-up en titulares y datos.
  - **SCRUB** — contadores y progresos atados a `scrollYProgress`, reversibles.
  - **MÁSCARA** — reveals por `clip-path` lateral. Sale a la izquierda, entra desde la derecha.
- **Regla dura:** `initial={{opacity:0, y:20}}` + `whileInView` queda **prohibido en titulares y en números**. Sobrevive solo en párrafos de cuerpo.

## Higiene técnica

Esto se paga antes de tocar cualquier animación. Es la mejora más grande y más barata disponible.

| Item | Detalle |
|---|---|
| `public/videos/neura-sync.mp4` | **45MB**, no lo referencia ningún archivo. Vite lo copia al build: por eso `dist/` pesa 48MB. Borrar. |
| `index.html:206` | `<link rel="preload" as="video">` precarga **3.3MB** compitiendo contra el LCP, para un video decorativo al 70% de opacidad. Borrar. |
| `NeuralBackground.tsx` | El `animate()` llama `requestAnimationFrame` sin guardar el id; el cleanup solo remueve el listener de resize. **El loop nunca se cancela** (y en StrictMode arrancan dos). Además es O(n²) con `Math.sqrt` por frame e ignora `devicePixelRatio`. Arreglar o reemplazar. |
| Componentes huérfanos | `Hero.tsx`, `ScrollVideo.tsx`, `TechValues.tsx`, `ModularGrid.tsx`, `ModulesBreakdown.tsx` — 603 líneas muertas. Borrar. |
| `src/App.css` | Código muerto del template de Vite, ni se importa. Contiene el único `prefers-reduced-motion` del repo, lo cual da falsa sensación de que está resuelto. Borrar. |
| `src/assets/logo.png` | 560KB a 1600×1600, renderizado a **36×36px** en el header. Comprimir/redimensionar. `favicon.png` son otros 388KB. |
| `ScrollHeader.tsx:26` | Header visible desde scroll 0. El CTA pasa a ser `<a href="https://wa.me/...">` directo, no `scrollTo('#contacto')`. |
| `index.css:19` | `html { scroll-behavior: smooth }` sin condicionar es un bug de accesibilidad. Envolver en `@media (prefers-reduced-motion: no-preference)`. |
| Anclas | No hay un solo `scroll-mt-*` en el repo: el contenido queda tapado por el nav fijo. Agregar `scroll-mt-24` a cada `id`. |

### Dos bloqueantes que hay que resolver antes de las escenas ancladas

1. **`overflow-x: hidden` rompe `sticky`.** `src/index.css` lo setea en `html` y en `body`, y varias secciones lo tienen en el `<section>`. Cualquier ancestro con overflow distinto de `visible` se convierte en el contenedor de scroll y el sticky de adentro deja de pegarse, **sin error**. El `lg:sticky lg:top-32` que ya existe en `ProblemSection.tsx` probablemente hoy no hace nada. Fix: `overflow-x: clip` (clip no crea contenedor de scroll).

2. **`<Suspense fallback={null}>` va a romper el scroll-linking.** Hasta que carga cada chunk, la sección mide 0px y la altura del documento cambia. Con fade-ups es invisible; con escenas ancladas y `useScroll()` a nivel documento, cada chunk que aterriza recalcula el progreso y las escenas saltan. Fix: `useScroll({ target: ref })` por sección (inmune a lo que pase arriba) + `min-height` realista en los fallbacks.

### Premisa falsa a no repetir

"El LCP es el titular en texto, pintado en el primer frame" **no puede pasar**: es una SPA de Vite sin SSR ni prerender, `dist/index.html` tiene `<div id="root"></div>` vacío. Nada pinta hasta que el JS parsea y ejecuta.

La ganancia de LCP real y no reclamada: hoy `HeroVideo.tsx` es lo único eager que importa `framer-motion`, y eso pone un `modulepreload` de **137KB** (45.7KB gzip) en el head. Si el hero nuevo se escribe sin framer (CSS puro), ese chunk cae detrás del boundary de `React.lazy`.

## SEO

El SEO está muy trabajado y no hay que romperlo.

- **ARCA en el copy visible**, conservando **"ARCA (ex AFIP)"** en meta keywords, en el `featureList` del JSON-LD (`index.html:104`) y en la respuesta del FAQPage (`index.html:153`). La gente todavía busca "AFIP".
- ERP y CRM tienen que quedar en **texto real** en el DOM, no solo en metadatos.
- **El `<noscript>` de `index.html:214-252` es un espejo del contenido** y hoy describe 3 productos. Hay que actualizarlo a 4 capas cada vez que cambie una sección.
- Nada de contenido escondido detrás de estado de scroll: los 4 actos, las 6 industrias y los 3 modelos se renderizan siempre, con los inactivos ocultos visualmente (`opacity` + `pointer-events`) y marcados `inert`.
- Actualizar el FAQPage con la capa ERP y el Desafío 24hs.

## Hero: video

**Regla:** el video generado con IA hace **solo la textura física** — papeles, luz cálida, escritorio, caos desenfocado. Toda la UI legible se arma en DOM encima mientras el video se desvanece. Un CUIT deformado o una factura con CAE inventado en el hero de un ERP argentino mata la credibilidad en el primer segundo.

**Concepto:** "el escritorio que se ordena solo". Plano cenital de un escritorio real cubierto de papeles (facturas, remitos, un resumen bancario, un celular con WhatsApp abierto), luz cálida desaturada. Un pulso azul cruza el cuadro; a su paso cada papel se levanta y se disuelve en partículas azules que fluyen al centro. 4–6 segundos, loop limpio.

**Producción:** Higgsfield (hay 5609 créditos, plan creator). Dos keyframes → image-to-video.

**Entrega:**
- Objetivo ≤600KB. WebM/AV1 + MP4 fallback. **Sin pista de audio** (el actual tiene una AAC de 140kbps en un `<video muted>`).
- Resolución de entrega ~1440×810, no 4K. El actual es 3840×2160 mostrado a ~1024px: 14× más píxeles de los necesarios.
- `poster` en `<img>` como elemento LCP, `<video preload="metadata">` detrás. **Nunca el video como LCP.**
- Carga condicional: adjuntado tras el primer paint vía `requestIdleCallback`, solo si `matchMedia('(min-width:768px)')` y `saveData !== true`.
- **Regla de descarte:** si el render sale con olor a stock, se publica sin video y la sección funciona igual.

**Bug a arreglar de paso:** `HeroVideo.tsx` hace `useState(false)` + `useEffect(() => setIsMobile(...))`, así que el primer render monta la rama `<video>` **también en mobile** y recién después la cambia por el `<img>`. La optimización de "imagen en mobile" depende de ganarle esa carrera al navegador. Reemplazar por selección con CSS (`md:hidden` / `hidden md:block`).

## Mobile

- `h-svh`, no `h-screen` — en iOS Safari el 100vh cambia al colapsar la barra de URL y una escena anclada pega un salto a mitad de scroll. Tailwind 3.4.19 ya trae `svh`/`lvh`/`dvh`.
- **Máximo una escena anclada** en toda la página bajo 768px.
- Nada de scroll horizontal secuestrado: `overflow-x-auto snap-x snap-mandatory` con `snap-center`. Momentum nativo, cero JS.
- Efectos de puntero envueltos en `@media (hover: hover) and (pointer: fine)`.
- Canvas de neuronas a 12–16 nodos o apagado.

## Fases

| Fase | Contenido | Riesgo | Días |
|---|---|---|---|
| **0 — Higiene** | Los 45MB muertos, el preload de video, los huérfanos, `App.css`, el leak de rAF, `overflow-x: clip`, `scroll-mt`, header desde scroll 0 con WhatsApp real. | Cero | ~0.5 |
| **1 — Contenido** | Las 9 secciones con copy nuevo, 4 capas, industrias, modelos, timeline 24hs, clientes, ARCA, `<noscript>` y JSON-LD actualizados. Animación: la que ya existe. | Bajo | ~2–3 |
| **2 — Movimiento** | `src/motion.ts`, las 4 primitivas, la escena anclada única, contador scrubbeado, marquee con velocidad, reduced-motion completo. | Medio | ~3–4 |
| **3 — Hero** | Video nuevo con Higgsfield + demo en DOM + carga condicional. | Medio | ~1–2 |

**La fase 0+1 se puede publicar sola** y es la mayor parte de la ganancia comercial.

## Assets pendientes del cliente

Bloquean la fase 1:

1. Logos y nombres de los clientes que podemos mostrar; idealmente un testimonio con cargo.
2. Capturas del producto real — una por capa (Sync, Core, ERP, Insight) sería lo ideal.

## Fuera de alcance

- Router / multipágina. Sigue siendo una sola página.
- Blog, casos de estudio extensos, calculadora de ahorro interactiva.
- Rediseño del deck comercial o de los slides sueltos del repo.
- Cambio de paleta de marca o de tipografías.

## Fuentes

Hay dos decks en el repo y **no dicen lo mismo**. Ante conflicto, manda el posicionamiento de `public/deck.html`.

| Archivo | Qué es | Qué se toma |
|---|---|---|
| `public/deck.html` | "Desafío 24hs", 8 slides, Propuesta Comercial 2025 | **El posicionamiento** (integración, no reemplazo), "el dato entra dos veces" + sus 3 costos, "no elimina la carga: elimina el formato", Tablero Base, activación en 2 niveles |
| `deck-comercial.html` | Deck 2026, más extenso | Las 4 capas, +15hs y los 6 ejemplos, industrias, software a medida, los 3 modelos de trabajo, las 6 razones, timeline del 24hs |
| `neura-slide.html` | Slide suelto de industrias | Agro como séptima industria |
| `neura-pain-slide.html` | Slide suelto del problema | Redacción alternativa de los 6 ejemplos |
| LinkedIn | Perfil de empresa | Los verbos canónicos (digitaliza · conecta · automatiza · orquesta), "Gestioná tu PyME en tiempo real" |

**Conflicto conocido y cómo se resuelve:** `deck-comercial.html` presenta el ERP como una capa propia de Neura ("o usás el nuestro incluido"), lo que se lee como que Neura *es* un ERP. Se conservan las 4 capas —es la estructura que el cliente eligió— pero la capa ERP se reescribe como **superficie de integración**, con el mini-ERP mencionado en segundo plano. Ver "Regla de posicionamiento".
