Explicación: 

- 1: Importa una libreria llamada crypto que es para encriptar las contraseñas globalmente en el proyecto mendiante el global.crypto y llamando la libreria con require('crypto').

- 2: Esta línea encripta la contraseña para que no sea fácilmente legible mediante otros medios, es importante que seala primera en ejecutar porque el código se lee de arriba para abajo .config() hace que ejecute la acción inmediatamente trae el contenido de dotenv en este caso es la dirección URI de la base de datos.

- 3: Con esta ruta inicializo para que llame en node_modules a require, este es un nombre convencional pero por buenas prácticas se llama igual a la libreria, express es para que pueda crear las rutas facilmente.

- 4: app es el nombre que se le da a la función, al usar express() se está diciendo que para usar las peticiones ya sean get, put, delete, etc. se usen empezando por app.

- 5: es un traductor middleware, (middleware es un puente, cuando el usuario final hace la peticion este hace 3 cosas observar que es lo que trae la peticion "ver mi perfil", modificar datos para que traiga mas cosas de la base de datos "foto, nombre, descripcion, etc." y decidir que es para saber si hace su peticion a next que es el siguiente proceso del codigo o si no tiene permisos devuelve un Log normalmente es 403 "Not authorized"). Esta línea es un traductor, Express no lee formato JSON por si solo, esta función hace que cuando se hace una petición por ejemplo desde Axios, lo convierte en un objeto JavaScript para que lo lea.

- 6: Todo URL es URI, pero no todo URI es URL. Esta línea específicamente lo que hace es que llame a la base de datos que esta en la URI que se escribió en el archivo .env, entrando al archivo y al comando especifico que se escribio donde esta la URI, Node.js crea automáticamente "process", process se mete especificamente a is datos de WIdnows para conocerlos y tambíen para conocer la ubicacion URI de mi base de datos. 

- 7: .then() significa que si el proceso anterior fue un exito entonces ejecuta este comando donde en este caso es un console.log para indicar que si hubo conexión.

- 8: .cathc() es por si .then() no funcionó, es una línea para el manejo de error si el paso anterior no fue exitoso.

- 9: req es la peticion que llega al servidor (la que hace el cliente), res es la respuesta del servidor al cliente, por ejemplo un log, los resultados de su solicitud en formato JSON o en res.send() que es texto simple.

- 10: Esta línea para evitar redundancia se traen los datos y se guardan en {} en un objeto pero lo que hace es traer los datos y guardarlos con las mimas variables y los campos de la bd, por ejemplo nombre : name, pero como name tambien se llama asi en la bd se evita escribir clave valor, y en {} porque es un metodo js para que no se tenga que escribir const name = req.body.name; y asi sucesivamente, body es el formato en que traera los datos que en este caso es formato JSON.

- 11: Aquí lo que se hace es hashear la contraseña, el 10 significa las 10 veces que lo va a hacer random, da 10 vueltas, al principio por ejemplo es hola y cambia a jasjd, ahora en la segunda es 1a2p, y asi sucesivamente hasta llegar a la vuelta 10.

- 12: Esta línea lo que hace es guardar a neUser después de escribir los parámetros solicitados y el .save() de Mongoose lo guarda en la memoria de la base de datos ya que el usuario no se guarda por defecto debe hacerse el .save(). Y el await es necesario ya que el proceso de guardar al usuario en la base de datos no es instantáneo.

- 13: En esta línea se define user se usa await hasta que encuentre al primer usuario con el mismo email con el .findOne({email}), se usa email y no email: email ya que es un truco de js para minimizar codigo, entonces como la variable se llama igual al campo en la base de datos solo se pone una vez.

- 14: isMatch es una variable Booleana, bcrypt.compare() es un codigo ya definido que lo qeu hace es un proceso para verificar que la contraseña sea la misma ya que esta fue encriptada, la comparación que hace es de los valores que están dentro de los parentesis, el user.password sabe como encontrar password, ya que se hizo la conexión con User que User el modelo que se conecta  al base de datos mediante Mongoose por que user al buscar email se guarda completamente el objeto que esta como nombre, edad, password, etc.

- 15: jwt.sign() significa que mantendra la sesion activa mediante el id y el name, no se escribe la contraseña ya que esta puede llegar a ser desencriptada y afectar al usuario.

- 16: En esta línea se guardan lso datos del usuario su id y nombre para mantener la sesion iniciada y no tener que pedirle validacion por cada petición que este haga.

- 17: Js crea un objeto llamado error, lo que hace el error.message es transformar ese error a algo legible para el ser humano, se pone 500 por buenas practias para que el del frontend sepa el tipo de error y pueda solucionarlo sin especular.

- 18: Aquí se usa el next ya que el Middleware lo estoy creando yo si no lo coloco lo que va a pasar es que se quedará en cargando eternamente porque no tiene una petición de pasar al siguiente proceso, middleware es el que esta entre el medio de la peticion del usuario, principalmente verifica primero que el usuario si este registrado para hacerle un response a su request.

- 19: Headers significa que trae la inforamación de toda la petición, que petición es y quien la hizo, la linea lo que hace es buscar directamente la etiqueta authorization para ser ágil con las peticiones.

- 20: jwt es lo que importé, jwt es  , el .verify() significa qeu verificara el token , el token se llama token entonces ahi esta y el token del usuario y coge mi token original para hacer el proceso matematico que hizo con mi token y verificar si haciendo el mismo proceso matematico con el token del usuario revela sus datos si no es asi es un invalid token, decoded es para qeu se guarde ahi el objeto, por ejemplo { id: 1, name: juan} para que se puede reutilizar en el codgio y cada peticion verifique automaticamente la sesion del usuario sin tener que pedirsela.

- 21: Está linea es para que el sistema ya sepa quien es el usuario, como en decoded esta id 2 y name juan entonces ya cuando juan haga una solicitud req.user sepa que usuario es y traiga por ejemplo sus datos y no los de otros.

- 22: next() es para pasar a la siguiente petición, los () hace que pase a la siguiente petición de inmediato y haga la acción sin ellos no hace la petición.

- 23: El verifyToken se debe usar para que haga la verificaci+on antes de la petición y guardar su resultado en req.

- 24: user se usa para mostrar al usuario su petición, se usa user porque cuando se escribio req.user = decoded, user automaticamente guardo los datos del usuario que son id = 2 name = juan.

- 25: el .select("-password") hace que no se añada un campo en especifico, en este caso password, sin el - se mostraria aun asi password.

- 26: req.params es el que junta el nombre con el valor, para qeu Node pueda mostrar en este caso el ID debe de agarrarlo, req.params lo que hace es agarrar el ID para mostrarlo en la forma de variable que se establecio en el endpoint.

- 27: En esa línea se está especificando los valores qeu se cambiarán por los actuales 
