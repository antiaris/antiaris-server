/**
 * Copyright (C) 2016 tieba.baidu.com
 * index.js
 *
 * changelog
 * 2016-05-12[13:21:43]:revised
 *
 * @author yanni4night@gmail.com
 * @version 1.0.0
 * @since 1.0.0
 */

'use strict';

const Koa = require('koa');
const Router = require('koa-router');
const serveStatic = require('koa-static');
const favicon = require('koa-favicon');
const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');

class Antiaris extends EventEmitter {
    bootstrap(options) {
        const opts = _.extend({}, options);
        const {
            appDir,
            confDir,
            middlewareDir,
            app
        } = opts;

        this.opts = opts;

        // Prevent from remove or reset
        Object.defineProperty(this, 'app', {
            enumerable: true,
            writable: false,
            configurable: false,
            value: app || new Koa()
        });

        this.app.use(favicon(path.join(confDir, 'favicon.ico')));
        this.app.use(serveStatic(appDir));

        const staticRouter = new Router();

        staticRouter.get('/s', (ctx, next) => {
            const files = ctx.request.querystring.split(',');
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

        this.app.use(staticRouter.routes());


        const loadCustomMiddleWare = midPath => {
            const stat = fs.statSync(midPath);
            if (stat.isDirectory() && fs.existsSync(path.join(midPath, 'index.js'))) {
                require(midPath)(this);
            }
        };

        // 加载 middleware，由内核定义
        const kernelMiddleDir = path.join(__dirname, 'middleware');
        fs.readdirSync(kernelMiddleDir).forEach(dir => {
            loadCustomMiddleWare(path.join(kernelMiddleDir, dir));

        });

        // 加载 middleware，由框架定义
        fs.readdirSync(middlewareDir).forEach(dir => {
            loadCustomMiddleWare(path.join(middlewareDir, dir));
        });

        const rootRouter = new Router();

        // 注册 APP 自动路由
        fs.readdirSync(appDir).forEach(dir => {
            const subPath = path.join(appDir, dir);
            const stat = fs.statSync(subPath);
            const appName = path.basename(subPath);
            if (stat.isDirectory() && fs.existsSync(path.join(subPath, 'src/router.js'))) {
                const appRouter = new Router();
                require(path.join(subPath, 'src/router.js'))(appRouter);
                rootRouter.use(`/${appName}`, appRouter.routes(), appRouter.allowedMethods());
            }
        });

        this.app.use(rootRouter.routes());

        return this.app;
    }
}

const antiaris = new Antiaris();

module.exports = antiaris;