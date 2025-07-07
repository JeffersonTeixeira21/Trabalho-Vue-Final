const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');
const userRoutes = require('./routes/userRoutes');
const curriculoRoutes = require('./routes/curriculoRoutes');
const { dbURI } = require('./config');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);
app.use('/api/curriculos', curriculoRoutes);

mongoose.connect(dbURI) 
    .then(() => console.log('Conectado ao MongoDB Atlas'))
    .catch(err => console.log('Erro ao conectar ao MongoDB Atlas:', err));

module.exports = app;