/**
 * Copyright (C) 2016 yanni4night.com
 * index.js
 *
 * changelog
 * 2016-04-13[19:44:00]:revised
 *
 * @author yanni4night@gmail.com
 * @version 1.0.0
 * @since 1.0.0
 */

module.exports = router => {
    router.get('/', (ctx, next) => {
       ctx.body = '<html><head><link rel="stylesheet" href="/demo/static/index.css" /></head><body><h1>Hello</h1></body></html>';
    });

    router.get('/show', (ctx, next) => {
        ctx.body = ctx.url;
        return next();
    });
};