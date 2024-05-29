const Koa = require('koa');
const { builder } = require('@netlify/functions');
const Router = require('@koa/router');

const app = new Koa();
const router = new Router();

router.get('/api', (ctx) => {
    ctx.body = { message: 'Hello from Koa.js!' };
});

app.use(router.routes()).use(router.allowedMethods());

module.exports.handler = builder(app.callback());
