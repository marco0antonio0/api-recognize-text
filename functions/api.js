const express = require('express');
const serverless = require('serverless-http');

const app = express();

// Defina suas rotas de API aqui
app.get('/hello', (req, res) => {
    res.json({ message: 'Hello from Express.js!' });
});

module.exports.handler = serverless(app);
