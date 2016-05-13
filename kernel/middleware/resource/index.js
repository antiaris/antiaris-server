/**
 * Copyright (C) 2016 yanni4night.com
 * index.js
 *
 * changelog
 * 2016-05-13[17:49:41]:revised
 *
 * @author yanni4night@gmail.com
 * @version 1.0.0
 * @since 1.0.0
 */
'use strict';

const createFrozenProperty = value => {
    return {
        value,
        writable: false,
        enumerable: true,
        configurable: false
    }
};

module.exports = (ctx, next) => {
    // 静态资源

    Object.defineProperties(ctx, {
        '__resource': createFrozenProperty({
            css: [],
            js: []
        }),
        css: createFrozenProperty(cssModule => {
            if (ctx.__resource.css.indexOf(cssModule) === -1) {
                ctx.__resource.css.push(cssModule);
            }
        }),
        comboCss: createFrozenProperty(() => {
            return ctx.__resource.css;
        }),
        js: createFrozenProperty(jsModule => {
            if (ctx.__resource.js.indexOf(jsModule) === -1) {
                ctx.__resource.js.push(jsModule);
            }
        }),
        comboJs: createFrozenProperty(() => {
            return ctx.__resource.js;
        })
    });

    return next();
};