const express = require('express');
const { builder } = require('@netlify/functions');

const app = express();

app.get('/api', (req, res) => {
    res.json({ message: 'Hello from Express.js!' });
});

const handler = (req, res) => {
    const serverlessExpress = require('@vendia/serverless-express');
    const server = serverlessExpress({ app });
    return server(req, res);
};

module.exports.handler = builder(handler);
