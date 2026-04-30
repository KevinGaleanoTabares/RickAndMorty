// global.crypto = require('crypto'); // 1 
require('dotenv').config(); // 2
const express = require('express'); // 3
const mongoose = require('mongoose');

const app = express(); // 4

app.use(express.json()); // 5
console.log("conexion es: ", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI) // 6
    .then(() => console.log('Mongo conectado')) // 7
    .catch(err => console.log(err)); // 8

app.get('/', (req, res) => { // 9
    res.send('API funcionando');
}); 

app.listen(3000, () => {
    console.log('Servidor en puerto 3000');
});

