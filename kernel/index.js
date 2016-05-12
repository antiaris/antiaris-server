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

const Koa = require('koa');
const Router = require('koa-router');
const _ = require('lodash');
const fs = require('fs');
const path = require('path');

class Antiaris {
    constructor(options) {
        this.opts = _.extend({}, options);
    }
    bootstrap() {
        const {appDir, app} = this.opts;
        this.app = app || new Koa();
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


module.exports = Antiaris;