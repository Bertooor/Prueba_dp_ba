# Bilbao accesible

- En esta API se publican lugares de la ciudad con problemas de accesibilidad, para denunciarlos.

- Los problemas serán definidos únicamente por el administrador.
  Cada lugar deberá definirse con 3 imágenes máximo.

- Cualquier usuario puede escoger un barrio de la ciudad y ver la lista de lugares con problemas de accesibilidad
  en ese barrio, tanto activos, como los que fueron resueltos.

- Los usuarios logueados podrán denunciar(a través de un voto), los problemas que consideren deberían ser resueltos.
  Solo prodrán tener una imagen como avatar.
  Además podrán proponer nuevos problemas de accesibilidad que serán añadidos a la lista de problemas, después de ser revisados y aprobados por el administrador.

- Para utilizar esta API, puedes clonar el repositorio.
  npm i => para instalar las dependencias.
  Debes añadir el archivo.env
  npm run dev => para arrancar el servidor con nodemon.

- Además tienes un front creado con REACT para visualizar como funciona en:
  https://github.com/Bertooor/Bilbao_accesible_front
