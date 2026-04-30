// global.crypto = require('crypto'); // 1 
require('dotenv').config(); // 2
const express = require('express'); // 3
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcrypt');
const user = require('./models/User');


const app = express(); // 4

app.use(express.json()); // 5
console.log("conexion es: ", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI) // 6
    .then(() => console.log('Mongo conectado')) // 7
    .catch(err => console.log(err)); // 8



///////////////////////////////////////////////////////////////////////////////////////////


app.get('/', (req, res) => { // 9
    res.send('API funcionando');
}); 

app.listen(3000, () => {
    console.log('Servidor en puerto 3000');
});



app.post('/register', async (req, res) => {
    try {
        const {name, email, password, age} = req.body // 10

        const hashedPassword = await bcrypt.hash(password, 10); // 11

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            age
        });

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({message: "El usuario ya existe"});
        }

        await newUser.save(); // 12

        res.json({message: 'Usuario creado correctamente'});

    } catch (error) {
        res.status(500).json({error: error.message});
    }
});


///////////////////////////////////////////////////////////////////////////////////////////


app.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;

        // Encontrar usuario
        const user = await User.findOne({ email }); // 13

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado"});
        }

        // Comparar contraseña
        const isMatch = await bcrypt.compare(password, user.password); // 14

        if (!isMatch) {
            return res.status(400).json({message: "Contraseña incorrecta"});
        }

        res.json({message: "Login exitoso!"});
    }   catch (error){
        res.status(500).json({error: error.message}); // 15
    }
});


///////////////////////////////////////////////////////////////////////////////////////////


