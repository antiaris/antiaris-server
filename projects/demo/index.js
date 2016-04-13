/**
 * Copyright (C) 2016 tieba.baidu.com
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
        ctx.body = ctx.url;
        return next();
    });

    router.get('/show', (ctx, next) => {
        ctx.body = ctx.url;
        return next();
    });
};