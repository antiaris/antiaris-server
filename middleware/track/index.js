/**
 * Copyright (C) 2016 antiaris.xyz
 * index.js
 *
 * changelog
 * 2016-05-12[17:20:49]:revised
 *
 * @author yanni4night@gmail.com
 * @version 1.0.0
 * @since 1.0.0
 */
module.exports = ({app}) => {
    app.use((ctx, next) => {
        console.log(`Incoming ${ctx.__appName}`);
        return next();
    });
};