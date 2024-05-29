const Hapi = require('@hapi/hapi');
const { builder } = require('@netlify/functions');

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT || 3000,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/api',
        handler: (request, h) => {
            return { message: 'Hello from Hapi.js!' };
        }
    });

    await server.initialize();
    return server;
};

let cachedServer;

const getServer = async () => {
    if (!cachedServer) {
        cachedServer = await init();
    }
    return cachedServer;
};

const handler = async (event, context) => {
    const hapiServer = await getServer();

    const { req, res } = hapiServer.listener._start(event, context);

    return new Promise((resolve, reject) => {
        res.on('finish', () => {
            resolve({
                statusCode: res.statusCode,
                headers: res.getHeaders(),
                body: res.outputPayload.payload.toString(),
            });
        });

        res.on('error', (err) => {
            reject(err);
        });

        hapiServer.listener.emit('request', req, res);
    });
};

module.exports.handler = builder(handler);
