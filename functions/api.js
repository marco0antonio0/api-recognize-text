const express = require('express');
const { builder } = require('@netlify/functions');
const serverless = require('serverless-http');

const app = express();

app.get('/api', (req, res) => {
    res.json({ message: 'Hello from Express.js!' });
});

const handler = serverless(app);

module.exports.handler = builder(handler);
