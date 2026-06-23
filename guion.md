He procesado en detalle tanto tu informe como la consigna. Aquí va el diseño completo de la defensa oral:

---

# Defensa Oral — TFI SSI: Hackeo Remoto del Jeep Cherokee (2015)
## Guion Diapositiva por Diapositiva

---

**Diapositiva 1: Portada / Apertura**

**Tiempo estimado:** 45 segundos

**Contenido Visual Sugerido:**
- Título grande: **"Hackeo Remoto del Jeep Cherokee (2015)"**
- Subtítulo: *Explotación Remota de un Vehículo de Pasajeros sin Modificaciones*
- Tu nombre, legajo, cátedra y fecha
- Imagen minimalista de fondo: silueta oscura del Jeep Cherokee o ícono de señal celular conectada a un vehículo
- Logo UTN FRVM en esquina superior derecha

**Guion de Exposición:**
"Buenas tardes. Mi nombre es Bruno Lucarelli, legajo 14988. El trabajo que presento hoy analiza el hackeo remoto del Jeep Cherokee de 2015, documentado en el whitepaper de Miller y Valasek para IOActive. Lo que hace a este caso único no es que alguien haya 'hackeado un auto': es que lo hizo desde cualquier punto del país, sin acceso físico, explotando fallas sistémicas de diseño en un vehículo de producción comercial. Este análisis lo abordé desde los marcos de la cátedra: gestión de riesgos bajo ISO 27005, respuesta a incidentes bajo NIST SP 800-61, y pericias forenses bajo ISO/IEC 27037 y RFC 3227."

**🛡 Escudo Defensivo:**
- *¿Por qué eligió este caso siendo que no estaba en la lista sugerida de la consigna?*
  > "La consigna habilita casos alternativos con aprobación del docente. Elegí el caso Jeep Cherokee porque es el incidente fundacional en seguridad de sistemas ciberfísicos embebidos. A diferencia de los casos de la lista, que involucran sistemas de información tradicionales, este caso permite analizar la intersección entre ciberseguridad y seguridad física, con impacto directo sobre vidas humanas. Eso lo hace especialmente rico para aplicar todos los marcos de la cátedra."

---

**Diapositiva 2: Contexto y Arquitectura Vulnerable**

**Tiempo estimado:** 1 minuto 30 segundos

**Contenido Visual Sugerido:**
- Diagrama de flujo simplificado (cadena de compromiso) con flechas y cajas:
  `[Red Sprint (Internet)] → [OMAP-DM3730 / QNX] → [Chip V850ES] → [CAN-C] → [ABS / EPS / PCM]`
- Dos bloques diferenciados visualmente: **"Dominio de Infotainment"** (color neutro) y **"Dominio de Control Crítico"** (color rojo), sin línea divisoria entre ellos para enfatizar la ausencia de segmentación
- Etiqueta flotante: *"Sin gateway. Sin ACL. Sin autenticación de origen."*

**Guion de Exposición:**
"Fiat Chrysler comercializaba desde 2013 el Jeep Cherokee 2014 equipado con el sistema Uconnect, desarrollado por Harman International. Esta unidad integraba conectividad celular a través de la red de Sprint, y al mismo tiempo tenía acceso a los buses de comunicación interna del vehículo: el CAN-IHS para sistemas de confort, y el CAN-C, que es el bus de alta criticidad: frenos ABS, dirección asistida EPS, motor PCM.

La vulnerabilidad arquitectónica central era esta: el chip Renesas V850ES/FJ3, integrado en la unidad Uconnect, actuaba como un puente directo y sin aislamiento adecuado entre el mundo exterior y los actuadores físicos del vehículo. La cadena de compromiso resultante era: interfaz celular, OMAP, V850, CAN-C, ECUs de seguridad crítica. No existía ningún gateway de seguridad, ninguna lista de control de acceso, ni ningún mecanismo de autenticación de origen de mensajes que interrumpiera ese camino de ataque."

**🛡 Escudo Defensivo:**
- *¿Qué diferencia al CAN-C del CAN-IHS en términos de criticidad para la Tríada CIA?*
  > "El CAN-IHS agrupa sistemas de confort: climatización, audio, iluminación interior. Su compromiso afecta principalmente la Confidencialidad y en menor medida la Disponibilidad, con riesgo físico BAJO. El CAN-C, en cambio, es el bus de alta criticidad: interconecta los módulos de seguridad activa. Su compromiso implica violación directa de la Disponibilidad e Integridad en su expresión más severa, con consecuencias irreversibles sobre vidas humanas. Por eso en la matriz de riesgos, los riesgos que involucran el CAN-C reciben impacto máximo de 5."

---

**Diapositiva 3: Actores, Cronología e Impacto de Negocio**

**Tiempo estimado:** 1 minuto 15 segundos

**Contenido Visual Sugerido:**
- Línea de tiempo horizontal minimalista con 5 hitos clave (solo fechas y etiquetas cortas):
  - `Oct 2014` → Divulgación responsable del D-Bus a FCA
  - `Mar 2015` → Notificación del V850 reprogramable
  - `16 Jul 2015` → Parche firmware 15.26.1 lanzado
  - `21 Jul 2015` → Publicación Wired / demostración pública
  - `24 Jul 2015` → Sprint bloquea puerto 6667 · FCA: recall 1.4M unidades
- Caja destacada en rojo: **"USD 200.000.000 — Costo estimado del recall"**
- Caja secundaria: **"1.400.000 vehículos afectados (Recall 15V461000 NHTSA)"**

**Guion de Exposición:**
"Los investigadores son Chris Valasek de IOActive y Charlie Miller, ambos con financiamiento previo de DARPA. Su objetivo explícito era refutar el paradigma dominante en la industria: que hackear un vehículo requería acceso físico previo al puerto OBD-II. Al publicar junto con el periodista Andy Greenberg de Wired, forzaron a la industria a reconocer que la conectividad celular en vehículos representaba una superficie de ataque explotable desde cualquier punto del planeta.

En términos de impacto al negocio: FCA debió emitir el recall voluntario 15V461000 ante la NHTSA, abarcando 1.4 millones de vehículos entre modelos Jeep, Dodge, Ram y Chrysler fabricados entre 2013 y 2015. La ausencia de un mecanismo OTA obligó a la distribución física de memorias USB, con pérdidas operativas que superaron los 200 millones de dólares. Adicionalmente, la cotización de acciones de FCA cayó de forma inmediata."

**🛡 Escudo Defensivo:**
- *¿Por qué clasifica las pérdidas como operativas y no solo como reputacionales?*
  > "Porque el impacto económico tiene componentes mensurables y directos: aprovisionamiento, grabación y distribución física de memorias USB a 1.4 millones de usuarios, más el soporte técnico presencial en la red de concesionarios. Eso es un costo logístico concreto. Las pérdidas reputacionales, como la caída de cotización bursátil y la degradación del índice de confianza del consumidor, son adicionales e intangibles. En el análisis ALE del informe, cuantifico el R5 con un ALE de 200 millones de dólares, que es precisamente el recall físico, al ser el evento de pérdida más impactante y documentado."

---

**Diapositiva 4: Las Tres Vulnerabilidades Críticas (Kill Chain)**

**Tiempo estimado:** 1 minuto 30 segundos

**Contenido Visual Sugerido:**
- Tres columnas o tarjetas verticales, una por vulnerabilidad, con ícono + título + 2 líneas máximo:
  - 🔓 **R1 — D-Bus expuesto** | Puerto TCP 6667 sin auth en red pública Sprint | RCE con privilegios root
  - 🔀 **R2 — Sin segmentación CAN** | Arquitectura flat: OMAP ↔ V850 ↔ ECUs críticas | Pivoting directo
  - 🔑 **R3 — Sin Secure Boot V850** | Flasheo SPI sin firma digital ni challenge-response | Firmware malicioso persistente
- Debajo, flecha que une las tres: *"Encadenadas → Control físico total del vehículo en movimiento"*
- Mención de Tríada CIA en cada tarjeta (pequeña, icónica): C / I / D

**Guion de Exposición:**
"El ataque se construye sobre tres vulnerabilidades encadenadas. La primera es la exposición del servicio D-Bus en el puerto TCP 6667 a través de la red celular pública de Sprint, con configuración de autenticación ANONYMOUS. Esto habilitó la invocación remota del método execute del servicio NavTrailService, logrando ejecución de código arbitrario con privilegios de administrador root. Es una violación directa del principio de mínima superficie de ataque de OWASP Embedded Security.

La segunda vulnerabilidad es arquitectónica: la ausencia de un gateway de seguridad entre el dominio de infotainment y el dominio de control físico. Una vez comprometido el procesador OMAP, el atacante utilizó el protocolo SPI local para pivotar hacia el V850 y desde ahí inyectar mensajes en el bus CAN-C, llegando a las ECUs de seguridad activa.

La tercera vulnerabilidad sella la cadena: el firmware del chip V850 podía ser reemplazado mediante SPI sin ninguna verificación criptográfica. Sin firma digital, sin Secure Boot, sin mecanismo challenge-response. Esto convirtió un compromiso lógico en un ataque físico permanente y persistente."

**🛡 Escudo Defensivo:**
- *¿Cómo mapearía estas vulnerabilidades al modelo STRIDE?*
  > "El D-Bus expuesto aplica a Spoofing (autenticación ANONYMOUS permite suplantar cualquier identidad) y a Elevation of Privilege (se obtiene shell root desde un proceso sin privilegios). La ausencia de segmentación CAN aplica a Tampering (inyección de mensajes CAN falsificados hacia ECUs) y Denial of Service (apagado del motor PCM). Y el flasheo del V850 sin firma aplica a Tampering en su expresión más severa: modificación permanente del firmware del controlador de buses críticos."
- *¿Por qué el puerto 6667 específicamente era tan grave?*
  > "Porque D-Bus es un protocolo de IPC diseñado para comunicación interprocess local, dentro del sistema operativo. Su exposición sobre TCP en una interfaz de red pública fue una decisión de diseño incorrecta de raíz, no una misconfiguration menor. Además, el rango de IPs asignado por Sprint a los dispositivos Uconnect era una subred /8, lo que permitía el escaneo automatizado y masivo de todos los vehículos afectados desde cualquier punto de la red."

---

**Diapositiva 5: Gestión de Riesgos — Matriz 5×5 y ALE**

**Tiempo estimado:** 1 minuto 45 segundos

**Contenido Visual Sugerido:**
- Mitad izquierda: Matriz de calor 5×5 simplificada con los 5 riesgos proyectados (R1 a R5), usando colores rojo/naranja/amarillo. Solo mostrar celdas relevantes con las etiquetas R1–R5 ubicadas en sus coordenadas P×I.
- Mitad derecha: Mini-tabla ALE con 3 filas (las más impactantes):

| Riesgo | ALE Estimado | Nivel |
|---|---|---|
| R1 — D-Bus RCE | USD 400.000 | CRÍTICO |
| R2 — Pivoting CAN | USD 360.000 | CRÍTICO |
| **R5 — Sin OTA** | **USD 200.000.000** | **CRÍTICO** |

- Etiqueta de metodología: *"ISO 31000 / ISO/IEC 27005 — Riesgo Inherente (sin controles)"*

**Guion de Exposición:**
"La metodología de gestión de riesgos aplicada sigue ISO 31000 e ISO/IEC 27005, con la fórmula Riesgo igual a Probabilidad de Ocurrencia por Impacto sobre el Activo, en una escala cualitativa 5×5. Un punto metodológico crítico: todos los riesgos evaluados representan el riesgo inherente del sistema, es decir, la exposición real en ausencia de cualquier control de mitigación. Esto refleja el estado de la arquitectura de FCA al momento de la explotación.

Cuatro de los cinco riesgos identificados caen en el cuadrante CRÍTICO de 15 a 25 puntos. R1, el D-Bus expuesto, alcanza el máximo de 25 con probabilidad 5 e impacto 5. R2, R3 y R4 obtienen 20 puntos. Solo R5 baja ligeramente a 16, categoría ALTO.

Complementé el análisis cualitativo con el modelo cuantitativo ALE: Annualized Loss Expectancy. El dato más revelador es el ALE del Riesgo R5, la ausencia de OTA: el recall físico de 1.4 millones de vehículos representó una pérdida estimada de 200 millones de dólares. El ROSI de haber implementado OTA desde el diseño, cuyo costo habría sido una fracción mínima de ese valor, es abismalmente positivo. Este análisis ilustra el principio fundamental: el costo de diseñar bien es siempre menor al costo de remediar tarde."

**🛡 Escudo Defensivo:**
- *¿Por qué asigna probabilidad 5 al R1 si el ataque requiere conocer la IP del vehículo objetivo?*
  > "Precisamente porque la probabilidad 5, que defino como Muy Alta, está justificada por el R4: todos los vehículos Uconnect compartían el mismo espacio de subred /8 en la red de Sprint. Eso significa que un atacante podía escanear y enumerar la totalidad de vehículos afectados de forma automatizada. La dirección IP no era un secreto difícil de obtener; era enumerable con un barrido de red desde cualquier punto del planeta. Por eso la probabilidad de explotación real es máxima."
- *¿Cuál es la diferencia entre riesgo inherente y residual, y por qué eligió el inherente?*
  > "El riesgo inherente es el nivel de exposición sin ningún control aplicado. El riesgo residual es el que permanece después de implementar controles. Elegí el riesgo inherente porque el objetivo metodológico es reflejar el estado real de la arquitectura de FCA al momento de la explotación: sin firewall en la interfaz celular, sin autenticación en D-Bus, sin firma en el V850. Ese es el diagnóstico honesto de la postura de seguridad real versus la aceptable."

---

**Diapositiva 6: Respuesta al Incidente — Evaluación NIST SP 800-61**

**Tiempo estimado:** 1 minuto 30 segundos

**Contenido Visual Sugerido:**
- Tabla de 2 columnas: Fase del ciclo NIST SP 800-61 | Evaluación de FCA/Sprint
- 4 filas con color semáforo (rojo/naranja/amarillo/rojo):

| Fase | Evaluación |
|---|---|
| 1. Preparación | 🔴 DEFICIENTE — Sin CSIRT ni SOC vehicular |
| 2. Detección y Análisis | 🔴 AUSENTE — Sin SIEM/IDS. 100% divulgación externa |
| 3. Contención / Erradicación | 🟡 PARCIAL / ACEPTABLE — Sprint bloqueó puerto 6667; parche efectivo pero tardío |
| 4. Recuperación / Post-incidente | 🔴 DEFICIENTE — Recall manual. Sin OTA. Sin lecciones formalizadas |

**Guion de Exposición:**
"La evaluación de la respuesta al incidente se realiza contrastando las acciones de FCA y Sprint contra las cuatro fases del ciclo de vida del NIST SP 800-61, tal como se abordó en la cátedra.

En Preparación: DEFICIENTE. FCA carecía de un CSIRT o SOC con capacidad de detección vehicular proactiva. La vulnerabilidad fue descubierta íntegramente por investigadores externos.

En Detección y Análisis: AUSENTE. FCA no contó con SIEM ni IDS que detectaran la actividad maliciosa. Dependencia total de la divulgación externa de Miller y Valasek.

En Contención y Erradicación: el resultado es mixto. La contención de Sprint, bloquear el puerto 6667 en la red celular el 24 de julio de 2015, fue efectiva a corto plazo pero no eliminó la vulnerabilidad subyacente en vehículos sin parchear. El parche de firmware versión 15.26.1 fue aceptable en cuanto a efectividad técnica, pero tardío en relación al período de exposición.

En Recuperación y Post-incidente: DEFICIENTE. La ausencia de OTA redujo drásticamente la tasa de adopción del parche. Los vehículos sin parchear permanecieron vulnerables a ataques por Wi-Fi incluso después del bloqueo de Sprint. No se documentaron públicamente lecciones aprendidas formales."

**🛡 Escudo Defensivo:**
- *¿Qué hubiera cambiado si FCA tenía un CSIRT activo antes del incidente?*
  > "Un CSIRT activo, alineado con la fase de Preparación del NIST SP 800-61, habría implicado al menos tres diferencias concretas: primero, un plan de respuesta a incidentes predefinido para vulnerabilidades de ciberseguridad vehicular; segundo, canales de comunicación formales con los proveedores como Harman y Sprint antes de que la situación se volviera pública; y tercero, un proceso de threat intelligence que probablemente hubiera detectado la investigación de Miller y Valasek antes de la publicación en Wired, permitiendo una respuesta coordinada y no reactiva. La diferencia entre respuesta proactiva y reactiva en este caso era la diferencia entre un parche silencioso y un recall de 1.4 millones de unidades."

---

**Diapositiva 7: Pericias Forenses y Cadena de Custodia**

**Tiempo estimado:** 1 minuto**

**Contenido Visual Sugerido:**
- Pirámide o lista ordenada de arriba hacia abajo (orden de volatilidad RFC 3227):
  - 🔴 **Alta volatilidad:** RAM del OMAP-DM3730 · Caché ARP · Sesiones D-Bus activas en /dev/shmem
  - 🟡 **Volatilidad media:** Logs QNX slogger · Sistema ETFS /fs/etfs · Tráfico celular Sprint (pcap)
  - 🟢 **Baja volatilidad:** Imagen NAND flash (IFS/ETFS/IPL/MMC) · Dump firmware V850 · Bus logs CAN (OBD-II)
- Nota al pie: *"ISO/IEC 27037 · RFC 3227 · CPPN Arts. 253–276 (contexto AR)"*

**Guion de Exposición:**
"La investigación forense de este incidente presenta desafíos específicos derivados de su naturaleza embebida en hardware vehicular. Los artefactos forenses se ordenan según la RFC 3227 y la ISO/IEC 27037, de mayor a menor volatilidad.

Con prioridad máxima: el volcado de memoria RAM del chip OMAP-DM3730, que contiene procesos en ejecución, claves de sesión y posibles payloads residentes. Junto a esto, el caché ARP y las sesiones D-Bus activas en /dev/shmem, que contienen las trazas de invocación al servicio NavTrailService.

Con volatilidad media: los logs del slogger de QNX y el sistema de archivos ETFS, que puede contener herramientas depositadas por el atacante durante la explotación.

Con baja volatilidad: la imagen forense bit a bit del chip NAND flash, que es la fuente principal para análisis de firmware y recuperación de archivos eliminados.

En cuanto a cadena de custodia, el vehículo completo debe tratarse como dispositivo portador de evidencia, almacenado en jaula de Faraday para impedir conectividad celular y Wi-Fi. La adquisición de la NAND debe realizarse con write-blocker. En el contexto argentino, cada intervención debe documentarse según los requisitos del CPPN artículos 253 a 276 para validez pericial."

**🛡 Escudo Defensivo:**
- *¿Por qué es contraindicado usar el propio sistema de actualización del Uconnect como vía de adquisición forense?*
  > "Porque el proceso de actualización propio del sistema modifica el estado del almacenamiento. Usar esa vía para adquirir evidencia violaría el principio cardinal de preservación de la evidencia digital: que el proceso de adquisición no debe alterar los datos originales. Esto está explícitamente establecido en la ISO/IEC 27037 y la RFC 3227. La adquisición correcta requiere herramientas write-blocker externas que bloqueen cualquier operación de escritura durante la lectura. Y el hash SHA-256 debe tomarse antes y después de la adquisición, comparando contra los hashes publicados en el ISO de actualización oficial de Chrysler para verificar integridad."

---

**Diapositiva 8: Propuestas de Mejora — Técnicas y Organizacionales**

**Tiempo estimado:** 1 minuto 30 segundos

**Contenido Visual Sugerido:**
- Cuatro tarjetas técnicas + una organizacional, con ícono y una línea de descripción cada una:
  - 🔒 **Gateway CAN** | Whitelist de mensajes entre dominio infotainment y dominio control | Ref: AUTOSAR SecOC
  - 🔐 **Hardening D-Bus** | Deshabilitar exposición en interfaz externa. TLS/mTLS si se requiere API | Ref: OWASP Embedded Security
  - 🏛 **Secure Boot V850** | Firma criptográfica + challenge-response + HSM | Ref: UNECE WP.29 / ISO/SAE 21434
  - 📡 **OTA Segura y Automática** | Entrega automática + verificación criptográfica + rollback | Ref: UNECE WP.29
  - 🏢 **Secure SDLC + CVD** | ISO/SAE 21434. Threat modeling desde diseño. Canal formal de divulgación | Ref: ISO 27001:2022 Ctrl 8.25

**Guion de Exposición:**
"Las propuestas de mejora abordan las causas raíz identificadas en cada riesgo, no síntomas superficiales.

La primera recomendación técnica, para mitigar el R2, es implementar un Gateway de Seguridad CAN dedicado con una whitelist de mensajes permitidos desde el dominio de infotainment hacia el dominio de control. El gateway debe ser físicamente independiente del OMAP, de manera que su compromiso no implique automáticamente el compromiso del controlador de buses CAN. El estándar de referencia es AUTOSAR SecOC, con Message Authentication Codes sobre mensajes CAN.

La segunda, para el R1, es el hardening completo del servicio D-Bus: deshabilitar su exposición en interfaces externas, migrar cualquier API externa a TLS con autenticación mutua por certificado, y eliminar el método execute del servicio NavTrailService.

La tercera, para el R3, es implementar Secure Boot en el V850 con firma criptográfica del firmware, mecanismo challenge-response para autorizar flasheos, y Hardware Security Module para protección de claves. Referencia: UNECE WP.29 y ISO/SAE 21434.

La cuarta, para el R5, es diseñar una infraestructura OTA con entrega automática, verificación criptográfica, rollback ante fallos, y monitoreo del estado de adopción del parche en la flota.

Y la recomendación organizacional es adoptar un Secure SDLC bajo ISO/SAE 21434 con threat modeling desde la fase de diseño de arquitectura, más un programa formal de Coordinated Vulnerability Disclosure para que investigadores externos tengan un canal estructurado de reporte."

**🛡 Escudo Defensivo:**
- *¿El Gateway CAN no podría ser también comprometido si el OMAP es atacado?*
  > "Es un punto válido. La defensa en profundidad no implica impermeabilidad absoluta de un único control; implica que cada capa agrega fricción y reduce la superficie de ataque efectiva. Un gateway CAN físicamente separado del OMAP interrumpe la cadena de compromiso automático: incluso si el OMAP es comprometido, el atacante necesitaría comprometer también el gateway, que opera con firmware distinto, en hardware distinto, con reglas de filtrado propias. Adicionalmente, AUTOSAR SecOC agrega Message Authentication Codes a los mensajes CAN, lo que significa que aunque un mensaje sea inyectado, el receptor verifica su autenticidad criptográfica. Son dos capas complementarias."

---

**Diapositiva 9: Cierre — Síntesis y Lección Central**

**Tiempo estimado:** 45 segundos

**Contenido Visual Sugerido:**
- Fondo limpio, texto centrado grande:
  > *"El costo de diseñar bien es siempre fraccionariamente menor al costo de remediar tarde."*
- Debajo, tres íconos en línea representando las tres secciones optativamente elegidas:
  - 🧮 Gestión de Riesgos (ISO 27005 · ALE · R1–R5)
  - 🔍 Respuesta al Incidente (NIST SP 800-61)
  - 📋 Pericias Forenses (ISO/IEC 27037 · RFC 3227)
- Datos de impacto finales: **1.4M vehículos · USD 200M · recall físico evitable**

**Guion de Exposición:**
"Para cerrar: el caso Jeep Cherokee no es la historia de un ataque genial. Es la historia de una organización que no incorporó la ciberseguridad como disciplina integral en su ciclo de vida de producto, y pagó las consecuencias en términos de impacto físico potencial sobre vidas humanas, y un recall de 1.4 millones de unidades con pérdidas que superaron los 200 millones de dólares. La lección central del análisis cuantitativo ALE es que el ROSI de diseñar bien, implementando OTA, Secure Boot y segmentación CAN desde el inicio, habría sido abismalmente superior a la inversión en remediación tardía. Quedo a disposición para la ronda de preguntas."

---

## ⏱ Control de Tiempo Total

| Diapositiva | Tiempo |
|---|---|
| 1 — Portada / Apertura | 0:45 |
| 2 — Contexto y Arquitectura | 1:30 |
| 3 — Actores, Cronología e Impacto | 1:15 |
| 4 — Las Tres Vulnerabilidades | 1:30 |
| 5 — Gestión de Riesgos / ALE | 1:45 |
| 6 — Respuesta al Incidente NIST | 1:30 |
| 7 — Pericias Forenses | 1:00 |
| 8 — Propuestas de Mejora | 1:30 |
| 9 — Cierre | 0:45 |
| **TOTAL** | **~11:00** |

---

## 💡 Tres Consejos Finales para la Defensa

**Anticipa la pregunta trampa más probable.** Favro casi con certeza va a preguntar sobre la sección que **no incluiste**: MITRE ATT&CK o Marco Legal Argentino. Prepara una respuesta corta y honesta del tipo: "Elegí abordar gestión de riesgos, respuesta al incidente y pericias forenses, que son los marcos que la cátedra desarrolló con mayor profundidad. Si hubiese incorporado MITRE ATT&CK, las técnicas centrales habrían sido T1190 (exploit público de aplicación expuesta) para el D-Bus, T0821 (modificación de firmware) para el V850, y T0866 (pivoting en red CAN) para la escalada hacia ECUs."

**No leas las diapositivas.** Úsalas como mapa, no como guion visible. Las diapositivas son para el tribunal; el guion es para tu cabeza.

**Si te cortan, no te desestabilices.** Una interrupción con pregunta es una señal de interés. Respondé concisamente, ancla siempre en un marco teórico (ISO, NIST, RFC) y pedí continuar: "Exactamente, eso está desarrollado en la siguiente sección, ¿avanzo?"