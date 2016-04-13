/**
 * Copyright (C) 2016 yanni4night.com
 * app.js
 *
 * changelog
 * 2016-04-13[17:51:10]:revised
 *
 * @author yanni4night@gmail.com
 * @version 1.0.0
 * @since 1.0.0
 */
require('babel-core/register')({
    presets: ['es2015-node5', 'stage-3']
});

const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();

const rootRouter = new Router();
const projects = ['demo'];
projects.forEach(projectName => {
    const demoRouter = new Router();
    require(`./projects/${projectName}/`)(demoRouter);
    rootRouter.use(`/${projectName}`, demoRouter.routes(), demoRouter.allowedMethods());
    app.use(rootRouter.routes());
});

console.log('Listening at 4098');
app.listen(4098);