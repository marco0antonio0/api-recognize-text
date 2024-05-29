const express = require('express');
const serverless = require('@netlify/functions');

const app = express();

app.get('/api', (req, res) => {
    res.json({ message: 'Hello from Express.js!' });
});

module.exports.handler = serverless.createHandler(app);
