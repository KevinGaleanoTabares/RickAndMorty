- 1: Importa una libreria llamada crypto que es para encriptar las contraseñas globalmente en el proyecto mendiante el global.crypto y llamando la libreria con require('crypto').

- 2:

- 3: Con esta ruta inicializo para que llame en node_modules a require, este es un nombre convencional pero por buenas prácticas se llama igual a la libreria, express es para que pueda crear las rutas facilmente.

- 4: app es el nombre que se le da a la función, al usar express() se está diciendo que para usar las peticiones ya sean get, put, delete, etc. se usen empezando por app.

- 5: es un traductor middleware, (middleware es un puente, cuando el usuario final hace la peticion este hace 3 cosas observar que es lo que trae la peticion "ver mi perfil", modificar datos para que traiga mas cosas de la base de datos "foto, nombre, descripcion, etc." y decidir que es para saber si hace su peticion a next que es el siguiente proceso del codigo o si no tiene permisos devuelve un Log normalmente es 403 "Not authorized"). Esta línea es un traductor, Express no lee formato JSON por si solo, esta función hace que cuando se hace una petición por ejemplo desde Axios, lo convierte en un objeto JavaScript para que lo lea.

- 6: Todo URL es URI, pero no todo URI es URL. Esta línea específicamente lo que hace es que llame a la base de datos que esta en la URI que se escribió en el archivo .env, entrando al archivo y al comando especifico que se escribio donde esta la URI 

- 7: .then() significa que si el proceso anterior fue un exito entonces ejecuta este comando donde en este caso es un console.log para indicar que si hubo conexión.

- 8:

- 9: req es la peticion que llega al servidor (la que hace el cliente), res es la respuesta del servidor al cliente, por ejemplo un log, los resultados de su solicitud en formato JSON o en res.send() que es texto simple.