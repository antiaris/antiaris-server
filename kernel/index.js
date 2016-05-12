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
const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const url = require('url');
const EventEmitter = require('events');

class Antiaris extends EventEmitter {
    bootstrap(options) {
        const opts = _.extend({}, options);
        const {
            appDir,
            middlewareDir,
            app
        } = opts;

        // Prevent from remove or reset
        Object.defineProperty(this, 'app', {
            enumerable: true,
            writable: false,
            configurable: false,
            value: app || new Koa()
        });

        // 前导变量
        this.app.use((ctx, next) => {
            const appName = url.parse(ctx.request.url).pathname.replace(/(^\/|\/$)/m, '').split(/\//)[0];
            ctx.__appName = appName;
            return next();
        });

        this.emit('before-register-middlewares');

        // 加载 middleware，有框架定义
        fs.readdirSync(middlewareDir).forEach(dir => {
            const subPath = path.join(middlewareDir, dir);
            const stat = fs.statSync(subPath);
            if (stat.isDirectory() && fs.existsSync(path.join(subPath, 'index.js'))) {
                this.app.use(require(subPath));
            }
        });

        this.emit('after-register-middlewares');

        const rootRouter = new Router();

        this.emit('before-register-routers');

        // 注册 APP 自动路由
        fs.readdirSync(appDir).forEach(dir => {
            const subPath = path.join(appDir, dir);
            const stat = fs.statSync(subPath);
            const appName = path.basename(subPath);
            if (stat.isDirectory() && fs.existsSync(path.join(subPath, 'index.js'))) {
                const appRouter = new Router();
                require(subPath)(appRouter);
                rootRouter.use(`/${appName}`, appRouter.routes(), appRouter.allowedMethods());
            }
        });

        this.app.use(rootRouter.routes());

        this.emit('after-register-routers');

        return this.app;
    }
}

const antiaris = new Antiaris();

module.exports = antiaris;