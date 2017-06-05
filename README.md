[![Build Status](https://travis-ci.com/ULL-ESIT-DSI-1617/proyecto-dsi-berkan-javier-35l1-1.svg?token=zsg7W1SNzKPhkVpKaLTH&branch=master)](https://travis-ci.com/ULL-ESIT-DSI-1617/proyecto-dsi-berkan-javier-35l1-1)
[![Github Issues](http://img.shields.io/github/issues/ULL-ESIT-DSI-1617/proyecto-dsi-berkan-javier-35l1-1.svg)](https://github.com/ULL-ESIT-DSI-1617/proyecto-dsi-berkan-javier-35l1-1/issues)
[![GitHub contributors](https://img.shields.io/github/contributors/ULL-ESIT-DSI-1617/proyecto-dsi-berkan-javier-35l1-1.svg?style=flat-square/cdnjs.svg)](https://github.com/ULL-ESIT-DSI-1617/proyecto-dsi-berkan-javier-35l1-1/graphs/contributors)

# CHUCHU'S ADVENTURES

Aplicación/Juego web desarrollado como proyecto final de la asignatura Desarrollo de Sistemas Informáticos. Para esto han sido usadas varias de las tecnologías vistas y explicadas a lo largo del curso.

## Funcionalidad 
La app consta de dos pantallas:
* Una primera en la que los usuarios deben hacer login para acceder al juego. Para ello deben primero haberse registrado correctamente con un correo que no haya sido utilizado con anterioridad. Además de esto también podrán cambiar su contraseña una vez registrados si no se encuentran agusto con ella. El registro y el login quedará guardado en la base de datos mongodb para posterior tratamiento.
* Una segunda en la que se puede iniciar una nueva partida, continuar una guardada anteriormente, ver las mejores puntuaciones globales o cerrar la sesión activa.

## Autores
![logo-github](http://bigfatcorki.de/wp-content/themes/CreativePortfolioResFree/images/flickr-icon.png) [Berkan Reyes Hernández](https://berkanrhdz.github.io)

![logo-github](http://bigfatcorki.de/wp-content/themes/CreativePortfolioResFree/images/flickr-icon.png) [Javier Antonio González Hernández](https://javiergonher.github.io/)

## Despliegue y Enlaces
[Enlace documentación - ghpages](https://ull-esit-dsi-1617.github.io/proyecto-dsi-berkan-javier-35l1-1/)

## Forma de uso local
Para el uso local debemos ejecutar en primer lugar, tras haber descargado el proyecto y situarnos en la raíz de esta carpeta, el comando:
```bash
$ npm install
```
para instalar las dependencias necesarias para ejecutar la app.

A continuación, en una shell debemos correr la base de datos mongodb.

```bash
$ mongod
```

Y por último, en otra shell poner en marcha el servior con:

```bash
$ node server.js
```
y acceder a la direcctión:

```
http://localhost:8090/
```

## Tecnologías
Como se dijo anteriormente, para el desarrollo de la aplicación se han usado diversar tecnologías que serán explicadas a continuación y se dirá para que han sido utilizadas. 

### NPM. [![npm-logo](https://goodbits-production.s3.amazonaws.com/uploads/link/thumbnail/3114590/npm-logo.png)](https://www.npmjs.com/)
Npm es el manejador de paquetes por defecto para Node.js, un entorno de ejecución para JavaScript.

La mejor manera de gestionar los paquetes instalados localmente NPM es crear un package.json y eso es lo que se ha hecho, un package.json con la información del paquete, las dependencias necesarias para la ejecución de la app y algunas tareas/scripts para ejecutar pruebas.

### NODEJS. [![nodejs-logo](http://cdn.codesamplez.com/wp-content/uploads/2015/02/nodejs-tips-tricks-120x120.png)](https://nodejs.org/en/)
Node es un intérprete Javascript del lado del servidor que cambia la noción de cómo debería trabajar un servidor. Su meta es permitir a un programador construir aplicaciones altamente escalables y escribir código que maneje decenas de miles de conexiones simultáneas en una sólo una máquina física.

Aquí ha sido utilizada de la manera explicada, siendo el método para decirle al servidor como debe operar tras un login, un registro, un cambio de contraseña, etc. Además gestiona la base de datos a través del middleware mongoose.

### MONGODB. [![mongodb-logo](https://www.aadhya-analytics.com/wp-content/uploads/2015/07/mongodb_slide.png)](https://www.mongodb.com/es) 
MongoDB es una base de datos relacional que guarda datos en forma de documentos BSON, donde los BSON son una representación binaria de JSON con información adicional de tipo. 

Para realizar la conexión de mongo en node se necesita de la librería mongoose la cuál es instalada mediante npm.

Mongo es utilizado en nuestro proyecto para guardar los usuarios registrados y consultarlos cuando se realiza un login para ver si éste ya se encuentra registrado o no. Además de para esto, también es utilizado para guardar las puntuaciones de cada jugador cuando acaba una partida y mostrar aquellas que se encuentran en el top 10.

### HTML - CSS - JAVASCRIPT. ![Html-Css-Js-logo](https://www.cmaginet.com/wp-content/themes/cmaginet/static/img/css-html-js.svg)
Para el diseño de la app se ha usado el lenguaje de marcado 'html' y su hoja de estilo 'css'. La parte principal del cliente está basado en ambos, siendo esta un diseño totalmente propio y ayudado por el uso de funciones javascript para el control de acciones y prevención de algunos errores.

Además, el juego en el cual está basada la app web está realizado en javascript, dividido en distintas clases que concretamente se encuentran escritas en EcmaScript6. 

### MOCHA Y CHAI. [![mocha-logo](https://goodbits-production.s3.amazonaws.com/uploads/link/thumbnail/3588705/mocha.gif)](https://mochajs.org/)[![chai-logo](https://github.com/chaijs.png?size=120)](http://chaijs.com/)
Mocha es un framework de pruebas de JavaScript que se ejecuta en Node.js. Nos da la posibilidad de crear tanto tests síncronos como asíncronos de una forma muy sencilla. 

Chai es un librería de aserciones, la cual se puede emparejar con cualquier marco de pruebas de Javascript. Chai tiene varias interfaces: assert, expect y should, que permiten al desarrollador elegir el estilo que le resulte más legible y cómodo a la hora de desarrollar sus tests.

Esto ha sido utilizado para realizar pruebas sobre el código del juego. En el directorio /test se encuentran los archivos correspondientes.

### KARMA.  [![karma-logo](https://avatars.githubusercontent.com/u/8129835?size=120)](https://karma-runner.github.io/)
Karma es esencialmente una herramienta que crea un servidor web para ejecutar las pruebas para cada navegador asociado. El resultado de cada test en cada navegador asociado es examinado y desplegado en la línea de comando del desarrollador para poder observar que test falla y que test se superan.

### TRAVIS. [![travis-logo](https://avatars1.githubusercontent.com/u/639823?size=120)](https://travis-ci.com/) 
Travis permite conectar nuestro repositorio de Github y probar después de cada push que hagamos las pruebas mocha que hemos creado, regenerando el proyecto.

En nuestro caso ha sido creado el archivo .travis.yml configurado para ejecutar las pruebas con karma.

### JSDOC. [![jsdoc-logo](http://www.santhoshreddymandadi.com/img/javascript.png)](http://usejsdoc.org/) 
JSDoc es una aplicación realizada en Perl que nos genera la documentación de nuestros scripts Javascript de forma automática. Basado en el conocido javadoc, obtiene los comentarios de documentación (/** .. */) para obtener la informacion sobre las funciones.

Esta tecnología ha sido utilizada para documentar las distintas clases que conforman el juego javascript desarrollado para la app web.

