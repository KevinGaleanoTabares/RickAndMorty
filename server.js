// global.crypto = require('crypto'); // 1 
require('dotenv').config(); // 2
const express = require('express'); // 3
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcrypt');
// const user = require('./models/User');
const jwt = require('jsonwebtoken');


const app = express(); // 4

app.use(express.json()); // 5
console.log("conexion es: ", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI) // 6
    .then(() => console.log('Mongo conectado')) // 7
    .catch(err => console.log(err)); // 8


    const verifyToken = (req, res, next) => { // 18
        const token = req.headers['authorization']; // 19

        if (!token) {
            return res.status(403).json({message: "Token Requerido"});
        }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);// 20
        req.user = decoded; // 21
        next (); // 22
    }   catch (error) {
        return res.status(401).json({message: "Token Inválido"});
    }
    };

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

        // Aquí creo el token JWT
        const token = jwt.sign(  // 15
            { id: user._id, email: user.email }, // 16
            process.env.JWT_SECRET, 
            { expiresIn: '1h'}
        );

        res.json({message: "Login exitoso!",
            token //
        });
    }   catch (error){
        res.status(500).json({error: error.message}); // 17
    }
    
    app.get('/profile', verifyToken, (req, res) => { // 23 
    res.json( {
        message: 'Acceso permitido',
        user: req.user // 24
    });
});
});


///////////////////////////////////////////////////////////////////////////////////////////

app.get('/users', async (req, res) => {
    try {
        const users =  await User.find().select('-password'); // 25
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
});


///////////////////////////////////////////////////////////////////////////////////////////



app.get('/users/:id', async (req,res) => {
    try {
        const user = await User.findById(req.params.id).select('-password'); // 26
        res.json(user);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});


///////////////////////////////////////////////////////////////////////////////////////////



app.put('/users/:id', verifyToken, async (req, res) => {
    const {name, email, password, age} = req.body
    try {
        const updatedUser = await User.findByIdAndUpdate( 
            req.params.id,
            { name, email, age }, // 27
            { new: true }
        );  

        res.json(updatedUser);
    }   catch (error) {
        res.status(500).json( {error: error.message} );
    }
});



///////////////////////////////////////////////////////////////////////////////////////////


app.delete('/users/:id', verifyToken, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "Usuario eliminado"}); 
    } catch (error) {
        res.status(500).json({ error: error.message });
        
    }
});
