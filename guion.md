He procesado en detalle tanto tu informe como la consigna. Aquí va el diseño completo de la defensa oral:

---

# Defensa Oral — TFI SSI: Hackeo Remoto del Jeep Cherokee (2015)
## Guion Diapositiva por Diapositiva (12 slides)

---

**Diapositiva 1: Portada / Apertura**

**Tiempo estimado:** 45 segundos

**Contenido Visual:**
- Badge: *TFI — Seguridad en Sistemas de Información*
- Título: **"Hackeo Remoto del Jeep Cherokee (2015)"**
- Subtítulo: *Explotación remota de un vehículo de pasajeros sin modificaciones*
- Meta: Bruno Lucarelli — Leg. 14988 · Ing. Ignacio Daniel Favro · UTN — FR Villa María
- Imagen del Jeep Cherokee de fondo con overlay oscuro

**Guion de Exposición:**
"Buenas tardes. Mi nombre es Bruno Lucarelli, legajo 14988. El trabajo que presento hoy analiza el hackeo remoto del Jeep Cherokee de 2015, documentado en el whitepaper de Miller y Valasek para IOActive. Lo que hace a este caso único no es que alguien haya 'hackeado un auto': es que lo hizo desde cualquier punto del país, sin acceso físico, explotando fallas sistémicas de diseño en un vehículo de producción comercial. Este análisis lo abordé desde los marcos de la cátedra: gestión de riesgos bajo ISO 27005, respuesta a incidentes bajo NIST SP 800-61, y pericias forenses bajo ISO/IEC 27037 y RFC 3227."

**🛡 Escudo Defensivo:**
- *¿Por qué eligió este caso siendo que no estaba en la lista sugerida de la consigna?*
  > "La consigna habilita casos alternativos con aprobación del docente. Elegí el caso Jeep Cherokee porque es el incidente fundacional en seguridad de sistemas ciberfísicos embebidos. A diferencia de los casos de la lista, que involucran sistemas de información tradicionales, este caso permite analizar la intersección entre ciberseguridad y seguridad física, con impacto directo sobre vidas humanas. Eso lo hace especialmente rico para aplicar todos los marcos de la cátedra."

---

**Diapositiva 2: Cadena de Compromiso del Uconnect**

**Tiempo estimado:** 45 segundos

**Contenido Visual:**
- Pipeline horizontal de 5 pasos con zonas coloreadas: *Acceso remoto → Head unit Uconnect → Control físico*
- Pasos: **Red Sprint (Internet/4G)** → **OMAP-DM3730 (QNX + D-Bus)** → **V850ES (Puente SPI)** → **CAN-C (Bus crítico)** → **ABS · EPS · PCM (Seguridad activa)**
- Lead: *"5 saltos consecutivos — sin gateway, sin ACL, sin autenticación"*
- Footer: logos Uconnect y Harman International

**Guion de Exposición:**
"Fiat Chrysler comercializaba desde 2013 el Jeep Cherokee equipado con el sistema Uconnect, desarrollado por Harman International. Esta unidad integraba conectividad celular a través de la red de Sprint. La cadena de compromiso resultante era lineal y sin interrupciones: interfaz celular, procesador OMAP con QNX, chip V850 como puente SPI, bus CAN-C y finalmente las ECUs de seguridad activa — frenos ABS, dirección asistida EPS y motor PCM. No existía ningún gateway de seguridad, ninguna lista de control de acceso, ni ningún mecanismo de autenticación de origen de mensajes que interrumpiera ese camino de ataque."

**🛡 Escudo Defensivo:**
- *¿Por qué el puerto 6667 específicamente era tan grave?*
  > "Porque D-Bus es un protocolo de IPC diseñado para comunicación interprocess local, dentro del sistema operativo. Su exposición sobre TCP en una interfaz de red pública fue una decisión de diseño incorrecta de raíz, no una misconfiguration menor. Además, el rango de IPs asignado por Sprint a los dispositivos Uconnect era una subred /8, lo que permitía el escaneo automatizado y masivo de todos los vehículos afectados desde cualquier punto de la red."

---

**Diapositiva 3: Dos Dominios sin Aislamiento**

**Tiempo estimado:** 45 segundos

**Contenido Visual:**
- Dos bloques lado a lado unidos por un conector *"Sin gateway"*:
  - **Infotainment** (foto consola central): OMAP · QNX · D-Bus · CAN-IHS (clima, audio)
  - **Control crítico** (foto motor): V850 · CAN-C · ABS · EPS · PCM
- Banner de advertencia: *"Sin gateway · Sin ACL · Sin autenticación de origen"*

**Guion de Exposición:**
"La vulnerabilidad arquitectónica central va más allá de un servicio mal configurado: la head unit conectaba Internet con los buses de control del vehículo sin ningún gateway de seguridad. El dominio de infotainment agrupaba sistemas de confort — climatización, audio — sobre el bus CAN-IHS. El dominio de control crítico, en cambio, interconectaba los módulos de seguridad activa sobre el CAN-C. El chip Renesas V850ES actuaba como puente directo y sin aislamiento adecuado entre ambos mundos."

**🛡 Escudo Defensivo:**
- *¿Qué diferencia al CAN-C del CAN-IHS en términos de criticidad para la Tríada CIA?*
  > "El CAN-IHS agrupa sistemas de confort: climatización, audio, iluminación interior. Su compromiso afecta principalmente la Confidencialidad y en menor medida la Disponibilidad, con riesgo físico BAJO. El CAN-C, en cambio, es el bus de alta criticidad: interconecta los módulos de seguridad activa. Su compromiso implica violación directa de la Disponibilidad e Integridad en su expresión más severa, con consecuencias irreversibles sobre vidas humanas. Por eso en la matriz de riesgos, los riesgos que involucran el CAN-C reciben impacto máximo de 5."

---

**Diapositiva 4: Actores del Incidente**

**Tiempo estimado:** 45 segundos

**Contenido Visual:**
- Hero destacado: **Chris Valasek · Charlie Miller** — IOActive · Artículo con Andy Greenberg en Wired · Financiados por DARPA
- Grid de ecosistema industrial con logos: FCA (destacado), Sprint (destacado), Harman, QNX, NHTSA, etc.
- Leyenda: rol central vs. cadena de suministro

**Guion de Exposición:**
"Los investigadores son Chris Valasek de IOActive y Charlie Miller, ambos con financiamiento previo de DARPA. Su objetivo explícito era refutar el paradigma dominante en la industria: que hackear un vehículo requería acceso físico previo al puerto OBD-II. Al publicar junto con el periodista Andy Greenberg de Wired, forzaron a la industria a reconocer que la conectividad celular en vehículos representaba una superficie de ataque explotable desde cualquier punto del planeta. En el ecosistema industrial intervinieron FCA como fabricante, Sprint como operador celular, Harman como desarrollador del Uconnect, y la NHTSA como regulador que finalmente ordenó el recall."

---

**Diapositiva 5: Cronología del Incidente**

**Tiempo estimado:** 45 segundos

**Contenido Visual:**
- Timeline vertical con 5 hitos:
  - `Oct 2014` — Divulgación: reporte responsable del D-Bus a FCA
  - `Mar 2015` — Investigación: reprogramación del V850 informada
  - `16 Jul 2015` — Mitigación: parche firmware 15.26.1
  - `21 Jul 2015` — Crisis pública: publicación en Wired (logo Wired)
  - `24 Jul 2015` — Respuesta: Sprint bloquea :6667 · Recall NHTSA
- Aside: **5 días** entre parche y publicación Wired · **3 días** hasta bloqueo Sprint y recall
- Nota: *"Ventana crítica donde el vector remoto seguía activo para millones de vehículos"*

**Guion de Exposición:**
"La cronología muestra una respuesta reactiva con ventanas críticas peligrosas. La divulgación responsable comenzó en octubre de 2014. FCA recibió el parche de firmware 15.26.1 el 16 de julio de 2015, pero la demostración pública en Wired ocurrió cinco días después, el 21 de julio. Solo tres días más tarde, el 24 de julio, Sprint bloqueó el puerto 6667 y FCA anunció el recall oficial. Durante esas ventanas, el vector de ataque remoto seguía activo para millones de vehículos en la flota."

---

**Diapositiva 6: Impacto de Negocio**

**Tiempo estimado:** 45 segundos

**Contenido Visual:**
- Imagen del Jeep Cherokee con enlace al PDF del recall NHTSA 15V461000
- Chips de marcas afectadas: Jeep, Dodge, Ram, Chrysler
- Stat cards:
  - **USD 200M** — Costo estimado del recall físico
  - **1.4M** — Vehículos afectados en Norteamérica
- Quote: distribución de parches por USB a concesionarios, sin OTA
- Footnote: primer recall de ciberseguridad automotriz a escala masiva

**Guion de Exposición:**
"En términos de impacto al negocio: FCA debió emitir el recall voluntario 15V461000 ante la NHTSA, abarcando 1.4 millones de vehículos entre modelos Jeep, Dodge, Ram y Chrysler fabricados entre 2013 y 2015. La ausencia de un mecanismo OTA obligó a la distribución física de memorias USB, con pérdidas operativas estimadas en 200 millones de dólares. Adicionalmente, la cotización de acciones de FCA cayó de forma inmediata. Este fue el primer recall de ciberseguridad automotriz a escala masiva, un precedente regulatorio y de la industria."

**🛡 Escudo Defensivo:**
- *¿Por qué clasifica las pérdidas como operativas y no solo como reputacionales?*
  > "Porque el impacto económico tiene componentes mensurables y directos: aprovisionamiento, grabación y distribución física de memorias USB a 1.4 millones de usuarios, más el soporte técnico presencial en la red de concesionarios. Eso es un costo logístico concreto. Las pérdidas reputacionales, como la caída de cotización bursátil y la degradación del índice de confianza del consumidor, son adicionales e intangibles. En el análisis ALE del informe, cuantifico el R5 con un ALE de 200 millones de dólares, que es precisamente el recall físico, al ser el evento de pérdida más impactante y documentado."

---

**Diapositiva 7: Tres Vulnerabilidades Críticas (Kill Chain)**

**Tiempo estimado:** 1 minuto 30 segundos

**Contenido Visual:**
- Tres tarjetas verticales con badges CIA:
  - 🔓 **R1 — D-Bus expuesto** | Puerto TCP 6667 con auth ANONYMOUS en Sprint | RCE con shell root | C · I · D
  - 🔀 **R2 — Sin segmentación CAN** | Head unit conectada a CAN-C sin gateway | Pivoting hacia ECUs críticas | I · D
  - 🔑 **R3 — Sin Secure Boot V850** | Firmware reemplazable por SPI sin firma | Ataque físico persistente | I · D
- Footer: *"Encadenadas → Control físico total del vehículo en movimiento"*

**Guion de Exposición:**
"El ataque se construye sobre tres vulnerabilidades encadenadas. La primera es la exposición del servicio D-Bus en el puerto TCP 6667 a través de la red celular pública de Sprint, con configuración de autenticación ANONYMOUS. Esto habilitó la invocación remota del método execute del servicio NavTrailService, logrando ejecución de código arbitrario con privilegios de administrador root. Es una violación directa del principio de mínima superficie de ataque de OWASP Embedded Security.

La segunda vulnerabilidad es arquitectónica: la ausencia de un gateway de seguridad entre el dominio de infotainment y el dominio de control físico. Una vez comprometido el procesador OMAP, el atacante utilizó el protocolo SPI local para pivotar hacia el V850 y desde ahí inyectar mensajes en el bus CAN-C, llegando a las ECUs de seguridad activa.

La tercera vulnerabilidad sella la cadena: el firmware del chip V850 podía ser reemplazado mediante SPI sin ninguna verificación criptográfica. Sin firma digital, sin Secure Boot, sin mecanismo challenge-response. Esto convirtió un compromiso lógico en un ataque físico permanente y persistente."

**🛡 Escudo Defensivo:**
- *¿Cómo mapearía estas vulnerabilidades al modelo STRIDE?*
  > "El D-Bus expuesto aplica a Spoofing (autenticación ANONYMOUS permite suplantar cualquier identidad) y a Elevation of Privilege (se obtiene shell root desde un proceso sin privilegios). La ausencia de segmentación CAN aplica a Tampering (inyección de mensajes CAN falsificados hacia ECUs) y Denial of Service (apagado del motor PCM). Y el flasheo del V850 sin firma aplica a Tampering en su expresión más severa: modificación permanente del firmware del controlador de buses críticos."

---

**Diapositiva 8: Gestión de Riesgos — Matriz 5×5 y ALE**

**Tiempo estimado:** 1 minuto 45 segundos

**Contenido Visual:**
- Mitad izquierda: Matriz de calor 5×5 con riesgos R1–R5 proyectados en sus coordenadas P×I, leyenda de colores centrada (Bajo 1–7 · Medio 8–14 · Alto 15–19 · Crítico 20–25)
- Mitad derecha: Panel ALE con tres tarjetas expandidas:
  - **R1 — D-Bus RCE** → USD 400K · CRÍTICO
  - **R2 — Pivoting CAN** → USD 360K · CRÍTICO
  - **R5 — Sin OTA** → USD 200M · CRÍTICO (destacada)
- Footnote centrado: *"R1–R4: crítico (15–25 pts) · R5: alto (16 pts) · ROSI OTA: abismalmente positivo"*
- Subtítulo: *"ISO 31000 / ISO/IEC 27005 · Riesgo = Probabilidad × Impacto (escala 1–5)"*

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

**Diapositiva 9: Respuesta al Incidente — Evaluación NIST SP 800-61**

**Tiempo estimado:** 1 minuto 30 segundos

**Contenido Visual:**
- Logos FCA y Sprint en header
- Tabla de 4 fases con evaluación semáforo:
  - 1. Preparación → **DEFICIENTE** — Sin CSIRT ni SOC vehicular
  - 2. Detección y análisis → **AUSENTE** — Sin SIEM/IDS. 100% divulgación externa
  - 3. Contención / erradicación → **PARCIAL** — Sprint bloqueó :6667; parche efectivo pero tardío
  - 4. Recuperación / post-incidente → **DEFICIENTE** — Recall manual por USB. Sin OTA

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

**Diapositiva 10: Pericias Forenses y Cadena de Custodia**

**Tiempo estimado:** 1 minuto

**Contenido Visual:**
- Tres capas de volatilidad (RFC 3227 / ISO/IEC 27037):
  - 🔴 **Alta volatilidad:** RAM OMAP-DM3730 · Caché ARP · Sesiones D-Bus en /dev/shmem
  - 🟡 **Volatilidad media:** Logs QNX (slogger) · Sistema ETFS · Tráfico celular Sprint (pcap)
  - 🟢 **Baja volatilidad:** Imagen NAND flash · Dump firmware V850 · Bus logs CAN vía OBD-II
- Imagen del vehículo + logo QNX
- Nota de cadena de custodia: jaula de Faraday, write-blocker, CPPN Arts. 253–276

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

**Diapositiva 11: Propuestas de Mejora — Técnicas y Organizacionales**

**Tiempo estimado:** 1 minuto 30 segundos

**Contenido Visual:**
- Grid de 5 tarjetas con referencia al riesgo mitigado:
  - 🔒 **Gateway CAN** — Filtrar mensajes entre infotainment y control · AUTOSAR SecOC · *Mitiga R2*
  - 🔐 **Hardening D-Bus** — Sin exposición en red externa · OWASP Embedded · *Mitiga R1*
  - 🏛 **Secure Boot V850** — Firma criptográfica + HSM · ISO/SAE 21434 · *Mitiga R3*
  - 📡 **OTA segura** — Entrega automática + verificación + rollback · UNECE WP.29 · *Mitiga R5*
  - 🏢 **Secure SDLC + CVD** — Threat modeling desde diseño · ISO 27001 Ctrl 8.25 · *Organizacional*

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

**Diapositiva 12: Cierre — Síntesis y Lección Central**

**Tiempo estimado:** 45 segundos

**Contenido Visual:**
- Quote central: *"El costo de diseñar bien es siempre fraccionariamente menor al costo de remediar tarde."*
- Tres marcos abordados:
  - 🧮 Gestión de riesgos — ISO 27005 · ALE · R1–R5
  - 🔍 Respuesta al incidente — NIST SP 800-61
  - 📋 Pericias forenses — ISO/IEC 27037 · RFC 3227
- Barra de impacto: **1.4M vehículos · USD 200M en recall · evitable con OTA y Secure Boot**
- Imagen del Jeep Cherokee + logo UTN

**Guion de Exposición:**
"Para cerrar: el caso Jeep Cherokee no es la historia de un ataque genial. Es la historia de una organización que no incorporó la ciberseguridad como disciplina integral en su ciclo de vida de producto, y pagó las consecuencias en términos de impacto físico potencial sobre vidas humanas, y un recall de 1.4 millones de unidades con pérdidas que superaron los 200 millones de dólares. La lección central del análisis cuantitativo ALE es que el ROSI de diseñar bien, implementando OTA, Secure Boot y segmentación CAN desde el inicio, habría sido abismalmente superior a la inversión en remediación tardía. Quedo a disposición para la ronda de preguntas."

---

## ⏱ Control de Tiempo Total

| Diapositiva | Tiempo |
|---|---|
| 1 — Portada / Apertura | 0:45 |
| 2 — Cadena de Compromiso del Uconnect | 0:45 |
| 3 — Dos Dominios sin Aislamiento | 0:45 |
| 4 — Actores del Incidente | 0:45 |
| 5 — Cronología del Incidente | 0:45 |
| 6 — Impacto de Negocio | 0:45 |
| 7 — Tres Vulnerabilidades Críticas | 1:30 |
| 8 — Gestión de Riesgos / ALE | 1:45 |
| 9 — Respuesta al Incidente NIST | 1:30 |
| 10 — Pericias Forenses | 1:00 |
| 11 — Propuestas de Mejora | 1:30 |
| 12 — Cierre | 0:45 |
| **TOTAL** | **~12:30** |

---

## 💡 Tres Consejos Finales para la Defensa

**Anticipa la pregunta trampa más probable.** Favro casi con certeza va a preguntar sobre la sección que **no incluiste**: MITRE ATT&CK o Marco Legal Argentino. Prepara una respuesta corta y honesta del tipo: "Elegí abordar gestión de riesgos, respuesta al incidente y pericias forenses, que son los marcos que la cátedra desarrolló con mayor profundidad. Si hubiese incorporado MITRE ATT&CK, las técnicas centrales habrían sido T1190 (exploit público de aplicación expuesta) para el D-Bus, T0821 (modificación de firmware) para el V850, y T0866 (pivoting en red CAN) para la escalada hacia ECUs."

**No leas las diapositivas.** Úsalas como mapa, no como guion visible. Las diapositivas son para el tribunal; el guion es para tu cabeza.

**Si te cortan, no te desestabilices.** Una interrupción con pregunta es una señal de interés. Respondé concisamente, ancla siempre en un marco teórico (ISO, NIST, RFC) y pedí continuar: "Exactamente, eso está desarrollado en la siguiente sección, ¿avanzo?"
