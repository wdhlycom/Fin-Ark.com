import type { Article } from './types';

export const ES_ARTICLES: Record<string, Article[]> = {
  insurance: [
    {
      id: 'hk-dividend-sell-property',
      title: '¿Por qué las familias de alto patrimonio compran seguro de ahorro de Hong Kong tras vender propiedades domésticas?',
      subtitle: 'Seguro HK · Conmutación Multimoneda · Interés Compuesto de Largo Ciclo',
      date: '2026-07-15',
      body: [
        { h: '1. Congelación de liquidez inmobiliaria y migración al estándar offshore', p: 'Desde 2024, las listas de propiedades de segunda mano en ciudades de primera línea chinas han escalado continuamente, con ciclos de transacción de 12–18 meses. La narrativa de la propiedad como "activo de alta liquidez" se desmorona. Tras liquidar propiedades, las familias de alto patrimonio se enfrentan a la pregunta central: no "qué sube más rápido", sino "dónde poner este dinero sin que se diluya, congele o atasque la sucesión". El seguro de ahorro con dividendos de Hong Kong—denominado en USD y siete monedas con activos subyacentes en bonos de grado de inversión en USD y mercados de renta variable globales—capta precisamente esta ola de capital offshore que migra de la propiedad doméstica.' },
        { h: '2. Conmutación multimoneda: cobertura integrada contra fiat único', p: 'El diferenciador central del seguro de ahorro de HK es la "conversión multimoneda"—el titular puede cambiar libremente la moneda de la póliza entre USD, HKD, GBP, CAD, AUD, SGD y RMB. Cuando una moneda fiat entra en ciclo de devaluación, el valor de la póliza puede migrar activamente a monedas fuertes en lugar de absorber pasivamente la erosión cambiaria. Ningún producto financiero doméstico ofrece esto—las pólizas domésticas son solo en RMB, sin herramienta de cobertura contra la devaluación fiat.' },
        { h: '3. Interés compuesto de largo ciclo: el tiempo es el mejor apalancamiento', p: 'El mecanismo de dividendos del seguro de HK se centra en el interés compuesto a largo plazo. Para un plazo de pago de 5 años, el valor en efectivo garantizado más dividendos no garantizados típicamente alcanza 2.5–3.5× las primas pagadas al año 20, y 4–6× al año 30 (según la tasa de realización de dividendos). Las principales aseguradoras han mantenido realizaciones de 95%–102% durante 20 años, con activos subyacentes principalmente en bonos de grado de inversión en USD más modestas asignaciones de renta variable—formando un motor de interés compuesto estable a través de los ciclos.' },
        { h: '4. ¿Por qué "primera parada" y no "destino final"?', p: 'El seguro de ahorro de HK es la "primera parada" tras liquidar propiedades porque satisface simultáneamente tres necesidades rígidas: cobertura fiat en USD, transferencia transgeneracional mediante arquitectura de póliza, y alta liquidez para retiros de emergencia. Pero no es la única asignación—sobre la "base patrimonial" del seguro de HK, las familias pueden superponer oro físico (defensa), fideicomisos familiares (aislamiento) e incluso modestos activos Web3 (rentabilidad asimétrica). El seguro de HK es los cimientos; los demás pilares son la superestructura.' },
        { h: '5. Recomendaciones prácticas de Fin-Ark', p: 'Fin-Ark recomienda asignar 50%–70% de los fondos de liquidación de propiedades al seguro de ahorro de HK como base estándar offshore, con el resto distribuido entre oro, fideicomisos y alternativos según la preferencia de riesgo familiar. Un plazo de pago de 5 años preserva flexibilidad durante el período de pago, evitando el bloqueo total de liquidez de una prima única. Toda la arquitectura se ejecuta dentro de marcos de cumplimiento (KYC/AML).' },
      ],
    },
    {
      id: 'hk-policy-split-inheritance',
      title: 'Análisis Profundo: División de Póliza de Seguro de HK y Herencia Transgeneracional',
      subtitle: 'División de Póliza · Asegurado Sucesor · Herencia Sin Honorarios',
      date: '2026-07-08',
      body: [
        { h: '1. División de póliza: una póliza se convierte en múltiples activos dirigidos', p: 'La función "división de póliza" del seguro de ahorro de HK permite al titular, tras acumular suficiente valor en efectivo, dividir una póliza en múltiples pólizas independientes—cada una con su propio asegurado y beneficiario. Una póliza de US$500.000 puede dividirse en tres—una para el hijo mayor, una para la hija menor, una para la jubilación del titular—cada una capitalizando y transfiriéndose de forma independiente. Esto logra "distribución dirigida" sin honorarios de gestión de fideicomiso.' },
        { h: '2. Mecanismo de asegurado sucesor: la póliza sobrevive al titular', p: 'El seguro de vida tradicional termina al fallecer el asegurado, pero el mecanismo de "asegurado sucesor" del seguro de ahorro de HK permite transferir la póliza a un nuevo asegurado (hijo o nieto) tras el fallecimiento del asegurado original—la póliza continúa capitalizando, sin estar limitada por la vida del asegurado original. Teóricamente, una póliza puede capitalizar durante 80–100 años a través de dos o tres generaciones mediante cambios sucesivos de asegurado sucesor. Esta función transgeneracional es totalmente ausente en el seguro doméstico.' },
        { h: '3. Fideicomiso familiar para todos: arquitectura hereditaria sin honorarios', p: 'Los fideicomisos familiares conllevan umbrales de constitución de cientos de miles de USD más US$10–30K anuales de gestión. Para familias con US$500K–2M, los umbrales son demasiado altos y los costes de mantenimiento no rentables. La combinación "división de póliza + asegurado sucesor" del seguro de HK es esencialmente un "fideicomiso familiar sin honorarios"—sin costes de gestión, abogados ni sucesión—logrando distribución dirigida y herencia transgeneracional.' },
        { h: '4. Sinergia con fideicomisos formales, no sustitución', p: 'La herencia por póliza no sustituye totalmente al fideicomiso familiar. Para familias con US$5M+, acciones corporativas o fiscalidad transfronteriza compleja, los fideicomisos formales siguen siendo insustituibles. Fin-Ark recomienda el seguro de HK como "capa hereditaria ligera" para US$500K–2M, y fideicomisos formales como "capa de aislamiento pesada" para US$5M+—ambos en sinergia.' },
        { h: '5. Diseño de arquitectura de póliza por Fin-Ark', p: 'Al diseñar la arquitectura del seguro de HK, Fin-Ark recomienda preestablecer cláusulas de asegurado sucesor al inicio, y ejecutar divisiones de póliza en los años 5–10 tras acumular valor en efectivo. El momento de la división considera las edades de los miembros familiares, las necesidades de fondos de educación y la planificación hereditaria de forma integral.' },
      ],
    },
    {
      id: 'us-iul-vs-hk',
      title: 'IUL de EE.UU. vs Seguro de Ahorro de Hong Kong: La Apuesta de Alto Apalancamiento para Herencias Multimillonarias',
      subtitle: 'Seguro EE.UU. · IUL · Financiación de Primas · Herencia de Alto Apalancamiento',
      date: '2026-06-28',
      body: [
        { h: '1. Vinculación al índice y protección a la baja del IUL', p: 'La Index Universal Life (IUL) de EE.UU. vincula el valor en efectivo al S&P 500 y similares, con suelo del 0% y techo al alza (típicamente 8%–12%). En años de mercado a la baja el valor no cae; en años alcistas participa de las ganancias. Combinado con el código fiscal de EE.UU. Sección 7702 de crecimiento libre de impuestos y retiro vía préstamo libre de impuestos, el IUL es una herramienta central de optimización fiscal transgeneracional.' },
        { h: '2. Financiación de primas: el mecanismo de apalancamiento multimillonario', p: 'Para familias que necesitan cobertura de vida multimillonaria, la financiación de primas del IUL es la ventaja central. El cliente paga solo 20%–30% de la prima del primer año, y el resto lo financia un banco colateralizado contra el valor en efectivo de la póliza—apalancamiento de 3–5×. US$1M de capital propio puede asegurar US$3–5M en cobertura, superando ampliamente el apalancamiento del seguro de HK.' },
        { h: '3. Altos umbrales resaltan la universalidad del seguro de HK', p: 'Los umbrales del IUL de EE.UU. son extremadamente altos: suscripción estricta (requiere viaje a EE.UU. para examen médico), altos umbrales de fideicomiso (debe mantenerse vía fideicomiso domiciliado en EE.UU. para evitar PFIC), y mínimos de financiación típicamente US$1M+. Para la mayoría de familias emergentes con US$500K–2M, los umbrales del IUL lo hacen impracticable. El seguro de ahorro de HK llena precisamente este rango—bajo umbral (US$10K/año), sin viaje a EE.UU., sin fideicomiso estadounidense—equilibrando liquidez, rentabilidad y accesibilidad como la "base patrimonial universal" óptima.' },
        { h: '4. Recomendación de asignación por tramos de Fin-Ark', p: 'Fin-Ark recomienda asignación por tramos: US$500K–2M centrada en seguro de ahorro de HK; familias con US$5M+ que necesitan herencia de vida multimillonaria usando financiación de primas IUL de EE.UU. como herramienta de apalancamiento. Ambos no son mutuamente excluyentes sino estratificados por escala patrimonial.' },
        { h: '5. El papel defensivo del seguro de Singapur', p: 'El seguro de Singapur, denominado en SGD y respaldado por crédito soberano AAA y un entorno político-comercial estable, desempeña un papel defensivo. Para familias con grandes activos en USD, los activos en SGD ofrecen una capa adicional de diversificación. Sin embargo, los rendimientos y riqueza de productos de Singapur son inferiores a los de Hong Kong, por lo que Fin-Ark lo posiciona como "acento defensivo" no como eje principal.' },
      ],
    },
  ],
  trust: [
    {
      id: 'sg-vcc-threshold',
      title: 'Arquitectura VCC de Singapur y Umbrales de Constitución de Family Office Explicados',
      subtitle: 'VCC Singapur · 13O/13U · Umbrales de Constitución',
      date: '2026-07-12',
      body: [
        { h: '1. Panorama de la arquitectura VCC', p: 'La Variable Capital Company (VCC) de Singapur, lanzada en 2020, es una arquitectura moderna que combina la claridad de gobernanza corporativa con la eficacia de aislamiento de un fideicomiso. Una VCC puede albergar múltiples subfondos con aislamiento legal de activos y pasivos entre subfondos, y acceder a incentivos fiscales 13O/13U de Singapur. La VCC está respaldada por el soberano de Singapur—calificación AAA—con altísima certeza legal.' },
        { h: '2. Umbrales duros del 13O', p: '13O requiere operaciones sustantivas en Singapur, con AUM mínimo de S$20M (~US$15M), gasto local anual de S$200K, y empleo de al menos dos profesionales de inversión. Al menos 10% de activos debe invertirse en mercados locales de Singapur. Estos umbrales duros significan que 13O solo conviene a familias con US$15M+.' },
        { h: '3. Flexibilidad del 13U y umbrales más altos', p: '13U es más flexible—permite holdings familiares como entidad de fondo, con mínimos prácticos de US$50M+ para demostrar sustancia. 13U conviene a familias más grandes con estrategias globales, pero los umbrales siguen muy por encima del rango emergente.' },
        { h: '4. Umbrales de fideicomiso resaltan la universalidad del seguro de HK', p: 'Los umbrales de constitución de VCC y family office de Singapur son de US$15M–50M, con costes de mantenimiento anuales de US$30–80K. Para familias con US$500K–2M, los umbrales son demasiado altos y los costes no rentables. La función "división de póliza + asegurado sucesor" del seguro de HK es esencialmente un "fideicomiso familiar sin honorarios"—distribución dirigida, herencia transgeneracional—siendo la solución óptima para este rango.' },
        { h: '5. Recomendación de arquitectura por tramos de Fin-Ark', p: 'Fin-Ark recomienda estratificar por escala: US$500K–2M centrada en herencia por póliza de HK; US$5M–15M con combinación seguro HK + fideicomiso simple; US$15M+ activando arquitectura VCC y family office. Cada tramo tiene su análisis de cumplimiento y coste-beneficio.' },
      ],
    },
    {
      id: 'when-trust-needed',
      title: '¿En qué nivel patrimonial se necesita realmente un fideicomiso familiar?',
      subtitle: 'Fideicomiso Familiar · Escala de Umbral · Alternativa de Seguro HK',
      date: '2026-06-20',
      body: [
        { h: '1. El verdadero valor de los fideicomisos: aislamiento legal, no rentabilidad', p: 'El valor central del fideicomiso familiar no radica en rentabilidad sino en aislamiento legal—separar la propiedad legal de la beneficiaria para aislar futuras deudas, litigios y quiebras del fideicomitente. Esta eficacia depende de la estabilidad legal de la jurisdicción. Pero los umbrales y costes de mantenimiento hacen que los fideicomisos no sean la mejor opción para todas las familias.' },
        { h: '2. Bajo US$5M: la herencia por póliza de HK es superior', p: 'Para familias con menos de US$5M, los honorarios de constitución (US$50–150K) y gestión anual (US$10–30K) representan una proporción demasiado alta—no rentable. La función "división de póliza + asegurado sucesor" del seguro de HK logra distribución dirigida y herencia transgeneracional sin honorarios de gestión, siendo la solución superior para este rango.' },
        { h: '3. US$5M–15M: Combinación seguro HK + fideicomiso simple', p: 'Al entrar en US$5M–15M, las familias comienzan a involucrar acciones corporativas, activos transfronterizos y fiscalidad compleja—fideicomisos simples (p. ej., discrecional BVI) se vuelven rentables. Fin-Ark recomienda el seguro de HK como "capa hereditaria ligera" más un fideicomiso simple como "capa de aislamiento".' },
        { h: '4. US$15M+: Fideicomisos formales y arquitectura de family office', p: 'Sobre US$15M, con activos multijurisdiccionales, sucesión de acciones y planificación fiscal transfronteriza, los fideicomisos formales (p. ej., VCC Singapur + fideicomiso BVI) son insustituibles. Aquí el aislamiento, la optimización fiscal y la flexibilidad hereditaria justifican los costes.' },
        { h: '5. Diagnóstico de escala por Fin-Ark', p: 'Antes de recomendar arquitectura, Fin-Ark realiza un "diagnóstico de escala"—evaluando activos totales, composición, jurisdicciones y objetivos hereditarios. Para la mayoría de familias emergentes, el diagnóstico es: la herencia por póliza de HK basta; no es necesario asumir los altos umbrales y costes del fideicomiso.' },
      ],
    },
  ],
  gold: [
    {
      id: 'gold-5pct-2026',
      title: 'En el sistema monetario crediticio tambaleante de 2026, ¿por qué las familias deben retener 5% en oro físico?',
      subtitle: 'Oro Físico · Dinero Crediticio · Asignación 5%',
      date: '2026-07-10',
      body: [
        { h: '1. El tambaleo del sistema monetario crediticio en 2026', p: 'La congelación de 2022 de las reservas rusas marcó que el fiat soberano y los bonos soberanos ya no son "activos libres de riesgo". Los balances de los principales bancos centrales se han expandido más de 5× desde 2008, diluyendo el poder adquisitivo. Cuando los países emisores pueden congelar unilateralmente las reservas fiat ajenas, cada activo denominado en fiat conlleva riesgo de contraparte. El oro físico es el único estándar monetario que no depende de la promesa de ningún emisor.' },
        { h: '2. La base empírica de la asignación del 5%', p: 'Fin-Ark recomienda asignar 5%–15% en oro físico como "estándar último" y "activo de seguro". 5% es un inicio conservador—asegurando que en un evento sistémico de riesgo fiat, la familia mantiene un activo duro sin contraparte. El oro no paga intereses; su valor radica en preservar poder adquisitivo en escenarios extremos.' },
        { h: '3. El oro es un "activo defensivo sin rendimiento"', p: 'La limitación central del oro es que es un "activo sin rendimiento"—no produce intereses, dividendos ni flujos de caja. El oro solo defiende, no rinde. Una vez establecida la defensa familiar, debe combinarse con "activos con rendimiento" que generen flujos de caja en USD sostenidos—uno quieto, uno en movimiento. El seguro de ahorro de HK juega exactamente este papel de "activo con rendimiento"—capitalizando en USD para generar flujos sostenidos, complementando el "atributo defensivo" del oro.' },
        { h: '4. Uno en movimiento, uno quieto: la asignación completa', p: 'El oro maneja la "defensa extrema"—preservando poder adquisitivo en colapso fiat o conflicto geopolítico. El seguro de HK maneja el "rendimiento sostenido"—capitalizando en USD en condiciones normales de mercado. Ambos—uno en movimiento, uno quieto, ataque y defensa—forman el estándar patrimonial familiar completo. Oro puro es demasiado conservador; seguro de HK puro carece de defensa extrema. Solo ambos en sinergia son óptimos.' },
        { h: '5. Arquitectura de oro físico de Fin-Ark', p: 'Fin-Ark se asocia con cámaras de primer nivel en Suiza y Singapur para proporcionar custodia asignada de lingotes certificados Good Delivery de la LBMA. Recomendamos dispersar en al menos dos jurisdicciones. Una vez configurado el oro, sinergiza con la arquitectura del seguro de HK para formar un estándar familiar completo—quietud y movimiento en equilibrio.' },
      ],
    },
    {
      id: 'paper-vs-physical-gold',
      title: 'La Diferencia de Riesgo Subyacente entre Oro Papel y Lingotes Físicos',
      subtitle: 'Oro Papel · Lingotes Físicos · Riesgo de Contraparte',
      date: '2026-06-15',
      body: [
        { h: '1. La esencia del oro papel: pasivo del emisor', p: 'El oro papel (ETFs, futuros, cuentas no asignadas) es fundamentalmente un pasivo de la institución emisora—en escenarios extremos puede enfrentar incumplimiento, congelación o liquidación forzada. La congelación de reservas rusas de 2022 demostró que incluso activos fiat soberanos pueden congelarse unilateralmente. El "riesgo de contraparte" del oro papel se expone completamente en escenarios extremos.' },
        { h: '2. Lingotes físicos asignados: activo duro sin contraparte', p: 'La custodia asignada de lingotes físicos asigna la propiedad legal clara de barras específicas al titular; la cámara proporciona solo custodia y no constituye un derecho de crédito. En eventos de riesgo de contraparte, la propiedad del oro físico no se ve afectada por la solvencia del emisor—es un verdadero "activo sin contraparte".' },
        { h: '3. Destinos divergentes en escenarios extremos', p: 'En condiciones normales, la diferencia de precio entre oro papel y físico es mínima. Pero en escenarios extremos—incumplimiento del emisor, congelación soberana, cierre de mercado—sus destinos divergen completamente: el oro papel puede congelarse o reducirse a cero, mientras el oro físico puede transferirse transfronteramente y preservar valor. El núcleo de la gestión de riesgo no es "tiempos normales" sino "tiempos extremos".' },
        { h: '4. Defensa de oro y rendimiento del seguro de HK en sinergia', p: 'El oro físico resuelve la "defensa extrema", pero como activo sin rendimiento no puede generar flujos de caja sostenidos. Tras completar la asignación defensiva del 5% en oro físico, las familias deben desplegar los activos restantes en activos con rendimiento. El seguro de ahorro de HK—capitalizando en USD—es el mejor "compañero con rendimiento" del oro. Uno defiende, otro ataca—solo entonces la asignación está completa.' },
        { h: '5. Recomendaciones de gestión de riesgo de Fin-Ark', p: 'Fin-Ark recomienda limitar estrictamente la asignación de oro a custodia física asignada, evitando exposición a oro papel. Asignación de 5%–15%, dispersa en al menos dos jurisdicciones. Una vez construida la capa defensiva de oro, el seguro de HK forma la capa de rendimiento—completando la arquitectura ataque-defensa familiar.' },
      ],
    },
  ],
  emerging: [
    {
      id: 'bitcoin-digital-gold',
      title: "La Lógica Financiera del Bitcoin como 'Oro Digital' Entrando en la Asignación Institucional Principal",
      subtitle: 'Bitcoin · Oro Digital · Asignación Institucional',
      date: '2026-07-05',
      body: [
        { h: '1. De "experimento geek" a "activo institucional"', p: 'Desde su creación en 2009, Bitcoin ha evolucionado de experimento geek a activo de asignación institucional global. BlackRock, Fidelity, MicroStrategy y otros lo han incorporado a asignaciones formales; la SEC ha aprobado ETFs spot de Bitcoin. La narrativa de "oro digital" ha pasado de visión marginal a consenso institucional.' },
        { h: '2. La lógica financiera del oro digital', p: 'Bitcoin tiene oferta fija de 21 millones—no imprimible, no congelable, transferible globalmente. Estas propiedades lo convierten en un "estándar digital" que cubre la expansión de balances soberanos. A diferencia de los activos refugio tradicionales, Bitcoin no requiere contraparte y puede transferirse transfronteramente preservando valor en escenarios extremos.' },
        { h: '3. El límite de asignación para activos asimétricos de alta volatilidad', p: 'La volatilidad anualizada de Bitcoin es aproximadamente 60%–80%—un activo asimétrico de alta volatilidad. Fin-Ark recomienda que la asignación familiar de Bitcoin no exceda 3%, como capa de "rentabilidad asimétrica"—posición pequeña para alto potencial al alza, donde incluso una pérdida total no afecta la base patrimonial familiar.' },
        { h: '4. Bloquear ganancias: la migración de retorno de Web3 al seguro de HK', p: 'La alta volatilidad de Web3 significa que las ganancias contables pueden retraerse rápidamente. Fin-Ark recomienda "tomar ganancias" oportunamente—inyectando los beneficios en el pool de activos del seguro de HK para bloquear los retornos, convirtiendo "ganancias contables" de alta volatilidad en "rentabilidad compuesta en USD" estable. Web3 ataca; el seguro de HK bloquea—formando un ciclo completo de "conversión ataque-defensa".' },
        { h: '5. Arquitectura de activos digitales de Fin-Ark', p: 'Fin-Ark se asocia con custodios institucionales licenciados para proporcionar almacenamiento en frío, gobernanza multifirma y diseño de arquitectura de herencia. La asignación de Bitcoin se limita estrictamente al 3%, con retornos migrados periódicamente al seguro de HK para bloqueo. Los activos digitales son el acento; el seguro de HK es el eje—prioridades claras aseguran progreso estable.' },
      ],
    },
    {
      id: 'web3-offshore-liquidity',
      title: 'Bajo Marcos de Cumplimiento, Cómo Deben Ver los Activos Offshore el Valor de Liquidez de Web3',
      subtitle: 'Web3 · Activos Offshore · Valor de Liquidez',
      date: '2026-06-22',
      body: [
        { h: '1. El arma de doble filo de la liquidez Web3', p: 'Los activos Web3 (Bitcoin, Ethereum) ofrecen liquidez de doble filo: trading global 24/7, transferencia transfronteriza instantánea, sin intermediario bancario—ventajas en mercados normales, pero también significan que el valor contable puede evaporarse instantáneamente durante volatilidad extrema. Las familias offshore deben distinguir "liquidez de trading" de "liquidez de preservación de valor".' },
        { h: '2. Liquidez de trading vs liquidez de preservación de valor', p: 'La liquidez de trading es la capacidad de comprar y vender rápidamente—Web3 destaca aquí. La liquidez de preservación de valor es la capacidad de preservar poder adquisitivo en escenarios extremos—la volatilidad de Web3 la hace menos estable que el oro físico. La asignación familiar debe posicionar Web3 como "capa de liquidez de trading", no "capa de preservación de valor".' },
        { h: '3. El límite del 3% y la toma de ganancias', p: 'La asignación Web3 se limita estrictamente al 3%. Cuando los activos Web3 generan retornos significativos, la toma de ganancias oportuna es esencial—migrando las ganancias del pool Web3 de alta volatilidad al pool de activos del seguro de HK, el más estable, para bloquear los retornos. Esta "conversión ataque-defensa" asegura que las ganancias de alta volatilidad de Web3 se transformen en interés compuesto en USD estable del seguro de HK.' },
        { h: '4. Asignación Web3 bajo marcos de cumplimiento', p: 'Toda asignación Web3 debe ejecutarse dentro de marcos de cumplimiento: usando custodia en frío institucional regulada (p. ej., Fidelity Digital Assets, Anchorage), con claves privadas dispersas entre miembros familiares y entidades legales mediante gobernanza multifirma. Evitar tanto la custodia en exchanges como la autocustodia extrema—elegir custodia institucional como vía intermedia.' },
        { h: '5. Acento Web3 y eje principal del seguro de HK', p: 'Los activos Web3 son un "acento de vanguardia" en la cartera familiar—demostrando conciencia y apertura hacia activos frontera, pero con asignación estrictamente limitada. El verdadero soporte del estándar patrimonial familiar es el motor de interés compuesto en USD del seguro de ahorro de HK. Las ganancias de Web3 fluyen finalmente al pool del seguro de HK. Prioridades claras son el camino correcto.' },
      ],
    },
  ],
  arkPilot: [
    {
      id: 'deposit-rate-cut',
      title: 'Recortes de Tasas de Depósitos Grandes: Los Retornos de Certeza Están Desapareciendo—¿A Dónde Debe Ir Su Dinero?',
      subtitle: 'Depósitos Grandes · Recortes de Tasas · Migración Offshore',
      date: '2026-07-18',
      body: [
        { h: '1. Las tasas de depósitos grandes siguen cayendo', p: 'En 2026, las tasas de depósitos grandes en los principales bancos chinos han caído por debajo del 2%, con inversiones de tasas a 3 y 5 años intensificándose. El "ancla de retorno de certeza" del que dependían las familias de alto patrimonio está desapareciendo. A medida que las tasas domésticas libres de riesgo disminuyen persistentemente, el coste de oportunidad de mantener fondos onshore sigue escalando.' },
        { h: '2. La alternativa offshore para retornos de certeza', p: 'La parte garantizada del valor en efectivo del seguro de HK está respaldada por las reservas de capital del emisor, proporcionando crecimiento compuesto cierto a largo plazo; los dividendos no garantizados reflejan el rendimiento de la cartera del emisor, con las principales aseguradoras manteniendo realizaciones de 95%–102% durante 20 años. Comparado con depósitos grandes domésticos al 2%, el seguro de HK ofrece una alternativa de retorno de certeza mayor y más a largo plazo.' },
        { h: '3. El Arca en la marea de recortes de tasas', p: 'En una era de incertidumbre, necesita subir a su Arca Financiera familiar y configurar activos offshore de grado de certeza. El seguro de ahorro de Hong Kong—denominado en USD, interés compuesto de largo ciclo, transferencia transgeneracional de póliza—es el ancla de rendimiento offshore más estable en la marea de recortes.' },
        { h: '4. Recomendaciones de acción', p: 'Recomendamos migrar una parte de los fondos de depósitos grandes domésticos al seguro de ahorro de HK antes de que el ciclo de recortes se profundice, bloqueando rentabilidad compuesta en USD a largo plazo. Un plazo de pago de 5 años preserva flexibilidad durante el período de pago.' },
      ],
    },
    {
      id: 'property-tax-trend',
      title: 'Tendencias del Impuesto Inmobiliario: Costes de Tenencia Crecientes Reconfiguran la Lógica de Asignación',
      subtitle: 'Impuesto Inmobiliario · Costes de Tenencia · Lógica de Asignación',
      date: '2026-07-11',
      body: [
        { h: '1. Señales de expansión del piloto de impuesto inmobiliario', p: 'En 2026, las señales de expansión del piloto de impuesto inmobiliario siguen emergiendo. Costes de tenencia crecientes significan que la narrativa de la propiedad como "activo de apreciación pasiva" se desmorona aún más. Las familias de alto patrimonio deben reexaminar el rol de la propiedad—de "activo de apreciación central" a "activo de uso"—y migrar la apreciación a asignaciones offshore más eficientes.' },
        { h: '2. La doble presión de costes de tenencia y costes de oportunidad', p: 'Los impuestos inmobiliarios crecientes aumentan los costes de tenencia mientras las tasas libres de riesgo domésticas disminuyen aumentando los costes de oportunidad. Bajo esta doble presión, el retorno neto de tenencia de la propiedad sigue cayendo. Liquidar parte de la apreciación inmobiliaria y migrarla al motor de interés compuesto en USD del seguro de HK reduce costes de tenencia y mejora el retorno a largo plazo.' },
        { h: '3. De la propiedad al seguro de HK: migración de estándar', p: 'En una era de incertidumbre, necesita subir a su Arca Financiera familiar y configurar activos offshore de grado de certeza. El seguro de ahorro de Hong Kong—denominado en USD, sin honorarios de gestión, transferencia transgeneracional de póliza—es el mejor destino offshore para los fondos de apreciación inmobiliaria.' },
        { h: '4. Recomendaciones de acción', p: 'Recomendamos evaluar los costes de tenencia y necesidades de uso de las propiedades a su nombre, liquidando gradualmente la apreciación de propiedades no ocupadas y migrándola al seguro de HK para bloquear interés compuesto en USD a largo plazo.' },
      ],
    },
    {
      id: 'offshore-fx-volatility',
      title: 'Volatilidad Cambiaria Offshore: La Asignación Multimoneda No Es una Opción, Es una Necesidad',
      subtitle: 'FX Offshore · Asignación Multimoneda · Conmutación de Seguro HK',
      date: '2026-06-30',
      body: [
        { h: '1. El contexto macro de volatilidad cambiaria intensificante', p: 'En 2026, la volatilidad USD/RMB se ha intensificado. Los activos concentrados en un solo fiat absorben pasivamente la erosión cambiaria sin herramienta de cobertura activa. La asignación multimoneda ha escalado de "opción de optimización" a "necesidad".' },
        { h: '2. El valor de cobertura de la conmutación multimoneda del seguro de HK', p: 'La función "conversión multimoneda" del seguro de HK permite cambiar libremente la moneda de la póliza entre USD, HKD, GBP, CAD, AUD, SGD y RMB. Cuando un fiat entra en ciclo de devaluación, el valor de la póliza puede migrar activamente a monedas fuertes. Este mecanismo de cobertura integrado no está disponible en ningún producto financiero doméstico.' },
        { h: '3. Subir al Arca Financiera', p: 'En una era de incertidumbre, necesita subir a su Arca Financiera familiar y configurar activos offshore de grado de certeza. La conmutación multimoneda del seguro de HK es la herramienta de cobertura offshore más práctica en la era de volatilidad cambiaria.' },
        { h: '4. Recomendaciones de acción', p: 'Recomendamos migrar gradualmente los activos concentrados en un solo fiat a la arquitectura de póliza multimoneda del seguro de HK, usando la función de conmutación para cubrir activamente el riesgo cambiario. El momento de asignación puede ejecutarse por tramos alineados con los ciclos cambiarios.' },
      ],
    },
  ],
  guardian: [],
};
