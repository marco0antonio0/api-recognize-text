const express = require('express');
const serverless = require('serverless-http');

const app = express();

app.get('/api', (req, res) => {
    res.json({ message: 'Hello from Express.js!' });
});

// Adaptar o caminho para a função Netlify
app.use('/.netlify/functions/api', app);

module.exports.handler = serverless(app);
