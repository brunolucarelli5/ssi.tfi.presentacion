He procesado en detalle tanto tu informe como la consigna. Aquí va el diseño completo de la defensa oral:

---

# Defensa Oral — TFI SSI: Hackeo Remoto del Jeep Cherokee (2015)
## Guion Diapositiva por Diapositiva (13 slides)

---

**Diapositiva 1: Portada / Apertura**

**Tiempo estimado:** 45 segundos

**Contenido Visual:**
- Logo UTN (esquina) y logo Jeep
- Badge: *TFI — Seguridad en Sistemas de Información*
- Título: **"Hackeo Remoto del Jeep Cherokee (2015)"**
- Subtítulo: *Explotación remota de un vehículo de pasajeros sin modificaciones*
- Meta: Autor Bruno Lucarelli — Leg. 14988 · Docente Ing. Ignacio Daniel Favro · Institución UTN — FR Villa María
- Imagen hero del Jeep Cherokee a la derecha
- Footer: *Trabajo Final Integrador*

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
- Footer: logos Uconnect (*Sistema central del ataque · Harman International*) y Harman

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
  - **Control crítico** (foto motor): V850 · CAN-C · frenos · dirección · motor
- Banner de advertencia: *"Sin gateway · Sin ACL · Sin autenticación de origen de mensajes"*

**Guion de Exposición:**
"La vulnerabilidad arquitectónica central va más allá de un servicio mal configurado: la head unit conectaba Internet con los buses de control del vehículo sin ningún gateway de seguridad. El dominio de infotainment agrupaba sistemas de confort — climatización, audio — sobre el bus CAN-IHS. El dominio de control crítico, en cambio, interconectaba los módulos de seguridad activa sobre el CAN-C. El chip Renesas V850ES actuaba como puente directo y sin aislamiento adecuado entre ambos mundos."

**🛡 Escudo Defensivo:**
- *¿Qué diferencia al CAN-C del CAN-IHS en términos de criticidad para la Tríada CIA?*
  > "El CAN-IHS agrupa sistemas de confort: climatización, audio, iluminación interior. Su compromiso afecta principalmente la Confidencialidad y en menor medida la Disponibilidad, con riesgo físico BAJO. El CAN-C, en cambio, es el bus de alta criticidad: interconecta los módulos de seguridad activa. Su compromiso implica violación directa de la Disponibilidad e Integridad en su expresión más severa, con consecuencias irreversibles sobre vidas humanas. Por eso en la matriz de riesgos, los riesgos que involucran el CAN-C reciben impacto máximo de 5."

---

**Diapositiva 4: Actores del Incidente**

**Tiempo estimado:** 45 segundos

**Contenido Visual:**
- Título: *"Quién intervino en el incidente"*
- Hero destacado: **Chris Valasek · Charlie Miller** — IOActive · Artículo con Andy Greenberg en Wired · Financiados por DARPA (logo DARPA)
- Grid de ecosistema industrial con logos: **FCA** y **Sprint** (destacados), Harman, QNX
- Leyenda: rol central en el incidente vs. cadena de suministro

**Guion de Exposición:**
"Los investigadores son Chris Valasek de IOActive y Charlie Miller, ambos con financiamiento previo de DARPA. Al publicar junto con el periodista Andy Greenberg de Wired, forzaron a la industria a reconocer que la conectividad celular en vehículos representaba una superficie de ataque explotable desde cualquier punto del planeta. En el ecosistema industrial intervinieron FCA como fabricante, Sprint como operador celular, Harman como desarrollador del Uconnect, y QNX como sistema operativo del OMAP. La NHTSA, como regulador que ordenó el recall, aparece en la cronología y el impacto de negocio que veremos a continuación."

---

**Diapositiva 5: Cronología del Incidente**

**Tiempo estimado:** 45 segundos

**Contenido Visual:**
- Título: *"De la divulgación al recall"*
- Subtítulo: *Miller y Valasek refutaron que hackear un auto requería acceso físico al OBD-II*
- Timeline vertical con 5 hitos:
  - `Octubre de 2014` — Divulgación: reporte responsable del D-Bus a FCA
  - `Marzo de 2015` — Investigación: reprogramación del V850 informada
  - `16 de Julio de 2015` — Mitigación: parche firmware 15.26.1
  - `21 de Julio de 2015` — Crisis pública: publicación en Wired (logo Wired)
  - `24 de Julio de 2015` — Respuesta: Sprint bloquea el puerto 6667 · Recall NHTSA
- Aside: **5 días** entre parche y publicación Wired · **3 días** hasta bloqueo Sprint y recall
- Nota: *"Ventana crítica donde el vector remoto seguía activo para millones de vehículos"*

**Guion de Exposición:**
"La cronología muestra una respuesta reactiva con ventanas críticas peligrosas. Miller y Valasek demostraron que hackear un vehículo no requería acceso físico al OBD-II. La divulgación responsable comenzó en octubre de 2014. FCA recibió el parche de firmware 15.26.1 el 16 de julio de 2015, pero la demostración pública en Wired ocurrió cinco días después, el 21 de julio. Solo tres días más tarde, el 24 de julio, Sprint bloqueó el puerto 6667 y FCA anunció el recall oficial ante la NHTSA. Durante esas ventanas, el vector de ataque remoto seguía activo para millones de vehículos en la flota."

---

**Diapositiva 6: Impacto de Negocio**

**Tiempo estimado:** 45 segundos

**Contenido Visual:**
- Título: *"Costo de negocio y alcance del recall"*
- Imagen del Jeep Cherokee con enlace al PDF del recall NHTSA 15V461000
- Chips de marcas afectadas: Jeep, Dodge, Ram, Chrysler
- Stat cards:
  - **USD 200.000.000** — Costo estimado del recall físico
  - **1.400.000** — Vehículos afectados en Norteamérica
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
- Título: *"Tres vulnerabilidades encadenadas"*
- Tres tarjetas con badges CIA y logo de marca (Sprint, Harman, QNX):
  - 🔓 **R1 — D-Bus expuesto** | Puerto TCP 6667 con auth ANONYMOUS en la red celular de Sprint | Ejecución remota de código con shell root | C · I · D
  - 🔀 **R2 — Sin segmentación CAN** | Head unit conectada directamente a CAN-C sin gateway | Pivoting desde OMAP hacia ECUs críticas | I · D
  - 🔑 **R3 — Sin Secure Boot V850** | Firmware reemplazable por SPI sin verificación criptográfica | Compromiso lógico convertido en ataque físico persistente | I · D
- Footer: *"R1 + R2 + R3 → Control de frenos, dirección y motor sin acceso físico"*

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
- Título: *"Matriz de riesgo inherente y ALE"*
- Mitad izquierda: Matriz de calor 5×5 con riesgos R1–R5 proyectados en sus coordenadas P×I, leyenda de colores (Bajo 1–7 · Medio 8–14 · Alto 15–19 · Crítico 20–25)
- Mitad derecha: Panel ALE — *"El recall físico de 1,4M vehículos domina el análisis cuantitativo"*
  - **R1 — D-Bus RCE** → USD 400K · CRÍTICO
  - **R2 — Pivoting CAN** → USD 360K · CRÍTICO
  - **R5 — Sin OTA** → USD 200M · CRÍTICO (destacada)
- Footnote: *"R1–R4: crítico (15–25 pts) · R5: alto (16 pts) · ROSI OTA: abismalmente positivo"*
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
- Título: *"Evaluación según NIST SP 800-61"*
- Lista de 4 fases con evaluación semáforo:
  - 1. Preparación → **Deficiente** — Sin CSIRT ni SOC vehicular. Vulnerabilidad descubierta por investigadores externos
  - 2. Detección y análisis → **Ausente** — Sin SIEM ni IDS. Dependencia total de la divulgación de Miller y Valasek
  - 3. Contención / erradicación → **Parcial** — Sprint bloqueó el puerto 6667 (24 jul). Parche 15.26.1 efectivo, pero tardío
  - 4. Recuperación / post-incidente → **Deficiente** — Recall manual por USB. Sin OTA. Sin lecciones aprendidas formales documentadas
- Aside: **3/4** fases deficientes o ausentes · **0 %** detección interna · Nota sobre respuesta reactiva · Marco: **NIST SP 800-61 Rev. 2**

**Guion de Exposición:**
"La evaluación de la respuesta al incidente se realiza contrastando las acciones de FCA y Sprint contra las cuatro fases del NIST SP 800-61 Rev. 2, tal como se abordó en la cátedra. Como resumen: tres de cuatro fases resultan deficientes o ausentes, y la detección interna fue del cero por ciento — todo llegó por divulgación externa.

En Preparación: deficiente. FCA carecía de un CSIRT o SOC con capacidad de detección vehicular proactiva.

En Detección y Análisis: ausente. FCA no contó con SIEM ni IDS que detectaran la actividad maliciosa.

En Contención y Erradicación: parcial. Sprint bloqueó el puerto 6667 el 24 de julio de 2015, lo cual fue efectivo a corto plazo pero no eliminó la vulnerabilidad en vehículos sin parchear. El parche 15.26.1 fue técnicamente aceptable, pero tardío.

En Recuperación y Post-incidente: deficiente. La ausencia de OTA redujo la tasa de adopción del parche. Los vehículos sin parchear permanecieron vulnerables incluso por Wi-Fi después del bloqueo de Sprint. No se documentaron lecciones aprendidas formales."

**🛡 Escudo Defensivo:**
- *¿Qué hubiera cambiado si FCA tenía un CSIRT activo antes del incidente?*
  > "Un CSIRT activo, alineado con la fase de Preparación del NIST SP 800-61, habría implicado al menos tres diferencias concretas: primero, un plan de respuesta a incidentes predefinido para vulnerabilidades de ciberseguridad vehicular; segundo, canales de comunicación formales con los proveedores como Harman y Sprint antes de que la situación se volviera pública; y tercero, un proceso de threat intelligence que probablemente hubiera detectado la investigación de Miller y Valasek antes de la publicación en Wired, permitiendo una respuesta coordinada y no reactiva. La diferencia entre respuesta proactiva y reactiva en este caso era la diferencia entre un parche silencioso y un recall de 1.4 millones de unidades."

---

**Diapositiva 10: Pericias Forenses y Cadena de Custodia**

**Tiempo estimado:** 1 minuto

**Contenido Visual:**
- Título: *"Artefactos y cadena de custodia"*
- Subtítulo: *RFC 3227 · ISO/IEC 27037 · CPPN Arts. 253–276*
- Tres capas de volatilidad (mayor → menor):
  - **Alta volatilidad:** RAM OMAP-DM3730 · Caché ARP · Sesiones D-Bus · /dev/shmem
  - **Volatilidad media:** Logs QNX (slogger) · Sistema ETFS · Tráfico celular Sprint (pcap)
  - **Baja volatilidad:** Imagen NAND flash · Dump firmware V850 · Bus logs CAN vía OBD-II
- Imagen del vehículo — *"El vehículo completo es portador de evidencia digital"*
- Cadena de custodia: Jaula de Faraday · Write-blocker · SHA-256 antes y después

**Guion de Exposición:**
"La investigación forense de este incidente presenta desafíos específicos derivados de su naturaleza embebida en hardware vehicular. Los artefactos forenses se ordenan según la RFC 3227 y la ISO/IEC 27037, de mayor a menor volatilidad.

Con prioridad máxima: el volcado de memoria RAM del chip OMAP-DM3730, que contiene procesos en ejecución, claves de sesión y posibles payloads residentes. Junto a esto, el caché ARP y las sesiones D-Bus activas en /dev/shmem, que contienen las trazas de invocación al servicio NavTrailService.

Con volatilidad media: los logs del slogger de QNX y el sistema de archivos ETFS, que puede contener herramientas depositadas por el atacante durante la explotación.

Con baja volatilidad: la imagen forense bit a bit del chip NAND flash, que es la fuente principal para análisis de firmware y recuperación de archivos eliminados.

En cuanto a cadena de custodia, el vehículo completo debe tratarse como dispositivo portador de evidencia, almacenado en jaula de Faraday para impedir conectividad celular y Wi-Fi. La adquisición de la NAND debe realizarse con write-blocker, tomando hash SHA-256 antes y después para verificar integridad. En el contexto argentino, cada intervención debe documentarse según los requisitos del CPPN artículos 253 a 276 para validez pericial."

**🛡 Escudo Defensivo:**
- *¿Por qué es contraindicado usar el propio sistema de actualización del Uconnect como vía de adquisición forense?*
  > "Porque el proceso de actualización propio del sistema modifica el estado del almacenamiento. Usar esa vía para adquirir evidencia violaría el principio cardinal de preservación de la evidencia digital: que el proceso de adquisición no debe alterar los datos originales. Esto está explícitamente establecido en la ISO/IEC 27037 y la RFC 3227. La adquisición correcta requiere herramientas write-blocker externas que bloqueen cualquier operación de escritura durante la lectura. Y el hash SHA-256 debe tomarse antes y después de la adquisición, comparando contra los hashes publicados en el ISO de actualización oficial de Chrysler para verificar integridad."

---

**Diapositiva 11: Propuestas de Mejora — Técnicas y Organizacionales**

**Tiempo estimado:** 1 minuto 30 segundos

**Contenido Visual:**
- Título: *"Mitigaciones técnicas y organizacionales"*
- Grid de 5 tarjetas con referencia al riesgo mitigado:
  - 🔒 **Gateway CAN** — Filtrar mensajes entre infotainment y control. Hardware independiente del OMAP · *Mitiga R2*
  - 🔐 **Hardening D-Bus** — Sin exposición en red externa. Eliminar método execute de NavTrailService · *Mitiga R1*
  - 🏛 **Secure Boot V850** — Firma criptográfica, challenge-response y HSM para claves · *Mitiga R3*
  - 📡 **OTA segura** — Entrega automática, verificación criptográfica y rollback ante fallos · *Mitiga R5*
  - 🏢 **Secure SDLC + CVD** — Threat modeling desde diseño. Canal formal de divulgación coordinada · *Organizacional*

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

**Diapositiva 12: Cierre — Lección Central**

**Tiempo estimado:** 30 segundos

**Contenido Visual:**
- Título: *"Lección central del análisis"*
- Quote central a pantalla completa: *"El costo de diseñar bien es siempre fraccionariamente menor al costo de remediar tarde."*

**Guion de Exposición:**
"Para cerrar: el caso Jeep Cherokee no es la historia de un ataque genial. Es la historia de una organización que no incorporó la ciberseguridad como disciplina integral en su ciclo de vida de producto, y pagó las consecuencias con impacto físico potencial sobre vidas humanas, un recall de 1.4 millones de unidades y pérdidas que superaron los 200 millones de dólares. La lección central — la que resume toda la presentación — es la que ven en pantalla: diseñar bien desde el inicio, con OTA, Secure Boot y segmentación CAN, habría costado una fracción de lo que costó remediar tarde."

---

**Diapositiva 13: Agradecimiento**

**Tiempo estimado:** 15 segundos

**Contenido Visual:**
- Título: **"Gracias"**
- Subtítulo: *"Quedo a disposición para preguntas"*

**Guion de Exposición:**
"Muchas gracias. Quedo a disposición para preguntas."

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
| 12 — Cierre | 0:30 |
| 13 — Agradecimiento | 0:15 |
| **TOTAL** | **~12:45** |

---

## 💡 Tres Consejos Finales para la Defensa

**Anticipa la pregunta trampa más probable.** Favro casi con certeza va a preguntar sobre la sección que **no incluiste**: MITRE ATT&CK o Marco Legal Argentino. Prepara una respuesta corta y honesta del tipo: "Elegí abordar gestión de riesgos, respuesta al incidente y pericias forenses, que son los marcos que la cátedra desarrolló con mayor profundidad. Si hubiese incorporado MITRE ATT&CK, las técnicas centrales habrían sido T1190 (exploit público de aplicación expuesta) para el D-Bus, T0821 (modificación de firmware) para el V850, y T0866 (pivoting en red CAN) para la escalada hacia ECUs."

**No leas las diapositivas.** Úsalas como mapa, no como guion visible. Las diapositivas son para el tribunal; el guion es para tu cabeza.

**Si te cortan, no te desestabilices.** Una interrupción con pregunta es una señal de interés. Respondé concisamente, ancla siempre en un marco teórico (ISO, NIST, RFC) y pedí continuar: "Exactamente, eso está desarrollado en la siguiente sección, ¿avanzo?"
