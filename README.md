# Parque Acuático Winifreda - Web Oficial

Este proyecto es una **Single Page Application (SPA)** desarrollada para ofrecer una experiencia de usuario fluida, rápida y con toda la información necesaria para los turistas y posibles visitantes del parque acuático, optimizando al máximo los recursos y costos de mantenimiento.

**Web:** [parqueacuaticowinifreda.com.ar](https://parqueacuaticowinifreda.com.ar/) actualmente en producción!
**Desarrollador:** Bladimir Rosane ([@BlaDds](https://github.com/BlaDds))

Este repositorio contiene el código fuente desplegado en producción durante Enero 2026. El desarrollador no se hace responsable por modificaciones posteriores realizadas por terceros en el dominio oficial.

## Tecnologías

El stack fue elegido para garantizar velocidad y facilidad de mantenimiento:

- ![React](https://img.shields.io/badge/-React-61DAFB?style=flat&logo=react&logoColor=black) **React (Vite):** Para un desarrollo ágil y una carga instantánea.
- ![Tailwind](https://img.shields.io/badge/-Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white) **Tailwind CSS:** Diseño responsivo y moderno.
- ![Python](https://img.shields.io/badge/-Python-3776AB?style=flat&logo=python&logoColor=white) **Python:** Scripting para backend y automatización.
- **7Timer API:** Integración de clima en tiempo real sin claves de API restrictivas.

---

## Optimización de Instagram Feed

Uno de los desafíos fue mostrar las últimas fotos de Instagram del parque sin pagar servicios ni agotar los créditos de la API de _Behold_.

**Problema:**
Si cada usuario que entra a la web hace una petición directa a la API de Behold, los créditos gratuitos se consumen rápidamente y se bloquea la sección en la página.

**Mi solución:**
En lugar de que el frontend llame a la API, desarrollé un script en Python que actúa como intermediario inteligente:

1. Se ejecuta de forma programada (cron job).
2. Consulta la API de Behold (una sola vez por día).
3. Guarda la respuesta en un archivo local `instagram_feed.json`.
4. La web de React lee ese archivo JSON local y lo muestra en la web.

0 costo, sin tener que hacer que cada usuario espere la llamada a la API, y si se cayese la API, la web sigue mostrando las últimas fotos guardadas

---

## Funcionalidades

- **Semáforo de Estado:** Lógica en tiempo real que detecta si el parque está ABIERTO o CERRADO basándose en:
  - Hora actual (Argentina).
  - Día de la semana.
  - **Feriados Nacionales:** Cruce de datos con la API de feriados de Argentina para detectar fines de semana largos automáticamente.
- **Widget de Clima:** Adaptación de datos meteorológicos crudos para mostrar un pronóstico limpio y visual.
- **Mapas y Contacto:** Integración directa para navegación y WhatsApp.
- **Easter Egg:** Si saludás a la consola con un simple `hola`.

---

## Instalación y Despliegue

Si querés clonar este proyecto para chusmear el código:

1.  **Clonar repositorio:**

    ```bash
    git clone https://github.com/BlaDds/parque-acuatico-winifreda-web.git
    cd parque-acuatico-winifreda-web
    ```

2.  **Instalar dependencias:**

    ```bash
    npm install
    ```

3.  **Correr en local:**
    ```bash
    npm run dev
    ```

---

## Contacto

Si tenés alguna duda sobre el código, querés reportar un bug o simplemente charlar sobre desarrollo:

- **GitHub:** [BlaDds](https://github.com/BlaDds)
- **Email:** [Bladimir Rosane](mailto:Bladimirrosane@gmail.com)

---

## Créditos y Multimedia

- **Diseño Visual:** Todo el material audiovisual (videos, fotografías e imágenes) es propiedad de **Sebastián Pascual**.
- **Licencia de Multimedia:** El material multimedia incluido en este repositorio **no está cubierto** por la licencia MIT de este proyecto. Su uso está restringido exclusivamente a esta aplicación web. No se permite su redistribución o uso comercial sin el consentimiento expreso del autor original.
- **Optimización:** Bladimir Rosane (Procesamiento técnico y conversión a formatos eficientes .webp/.mp4).

---
