/**
 * Copyright (C) 2016 antiaris.xyz
 * index.js
 *
 * changelog
 * 2016-08-15[18:01:15]:revised
 *
 * @author yanni4night@gmail.com
 * @version 0.1.0
 * @since 0.1.0
 */
'use strict';

const Router = require('koa-router');
const fs = require('fs');
const path = require('path');

module.exports = ({app, opts}) => {
    const {
        appDir
    } = opts;

    const staticRouter = new Router();

    staticRouter.get('/s', (ctx, next) => {
        const files = ctx.request.query.m.replace(/^\?*/, '').split(',');
        const tasks = files.map(file => new Promise(resolve => {
            fs.readFile(path.join(appDir, 'static', file), 'utf-8', (err, content) => {
                resolve(err ? '' : content);
            });
        }));

        return Promise.all(tasks).then(contents => {
            const contentType = /css/.test(ctx.request.headers['accept']) ? 'text/css' :
                'text/javascript';
            ctx.response.set('content-type', contentType);
            ctx.body = contents.reduce((s1, s2) => (s1 + s2));
        });
    });

    app.use(staticRouter.routes());
};