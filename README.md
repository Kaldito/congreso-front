# FRONTEND ASISTENCIAS CONGRESO

Esta aplicacion de Next.js necesita la api de [congreso-ticket](https://github.com/Kaldito/tickets-congreso-api) para funcionar. La API se ejecuta en el puerto 3001 y esta aplicacion se ejecuta en el puerto 3000, es importante que se respeten dichos puertos por que de otra forma no funcionara. Las dos aplicaciones deben estarse ejecutando a la vez.

Para iniciar el servidor en modo desarrollo ejecutar el siguiente comando en consola:
`npm run dev`

Para iniciar el servidor en el modo mejor optimizado ejecutar los sigueintes comandos:
`npm run build`
`npm run start`

**IMPORTANTE:** Antes de iniciar el servidor instalar todos los paquetes con `npm install`

## RUTAS PRINCIPALES:
- `/`: Aqui se muestra el formulario para poder registrar una asistencia de un alumno
- `/registro`: Aqui se muestra una tabla con todos los registros y las diferentes acciones que se pueden hacer con cada registro

## LIBRERIAS:
- https://chakra-ui.com

## DOCUMENTACION:
Toda la aplicacion se encuentra correctamente comentada y documentada, aqui se presentan los links presentes en el proyecto:
- https://legacy.reactjs.org/docs/hooks-state.html
- https://chakra-ui.com/docs/components/modal/usage*/
- https://reactjs.org/docs/hooks-effect.html
- https://chakra-ui.com/docs/feedback/menu
- https://nextjs.org/docs/pages/building-your-application/data-fetching/get-server-side-props

## PENDIENTE:
La aplicacion contiene la funcionalidad base esperada, falta el estilo y una QL update.
