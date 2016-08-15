/**
 * Copyright (C) 2016 antiaris.xyz
 * index.js
 *
 * changelog
 * 2016-05-13[17:45:41]:revised
 *
 * @author yanni4night@gmail.com
 * @version 1.0.0
 * @since 1.0.0
 */
'use strict';
const url = require('url');

module.exports = ({app}) => {
    app.use((ctx, next) => {
        const appName = url.parse(ctx.request.url).pathname.replace(/(^\/|\/$)/m, '').split(/\//)[0];
        // 应用名
        ctx.__appName = appName;
        return next();
    });
};