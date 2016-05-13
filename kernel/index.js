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

        // Prevent from remove or reset
        Object.defineProperty(this, 'app', {
            enumerable: true,
            writable: false,
            configurable: false,
            value: app || new Koa()
        });

        this.app.use(favicon(path.join(confDir, 'favicon.ico')));
        this.app.use(serveStatic(appDir));

        const loadCustomMiddleWare = midPath => {
            const stat = fs.statSync(midPath);
            if (stat.isDirectory() && fs.existsSync(path.join(midPath, 'index.js'))) {
                this.app.use(require(midPath));
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
            if (stat.isDirectory() && fs.existsSync(path.join(subPath, 'index.js'))) {
                const appRouter = new Router();
                require(subPath)(appRouter);
                rootRouter.use(`/${appName}`, appRouter.routes(), appRouter.allowedMethods());
            }
        });

        this.app.use(rootRouter.routes());

        return this.app;
    }
}

const antiaris = new Antiaris();

module.exports = antiaris;