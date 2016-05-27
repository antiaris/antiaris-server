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

const path = require('path');

const createFrozenProperty = value => {
    return {
        value,
        writable: false,
        enumerable: true,
        configurable: false
    }
};

module.exports = ({
    app,
    opts
}) => {
    app.use((ctx, next) => {
        // 静态资源

        Object.defineProperties(ctx, {
            '__resource': createFrozenProperty({
                css: [],
                script: [],
                js: []
            }),
            addCss: createFrozenProperty(cssModule => {
                if (ctx.__resource.css.indexOf(cssModule) === -1) {
                    ctx.__resource.css.push(cssModule);
                }
            }),
            comboCss: createFrozenProperty(() => {
                return ctx.__resource.css.map(css => {
                    const appName = css.split('/')[0];
                    const rmap = require(path.join(opts.appDir, appName,
                        'resource-map'));
                    if (rmap[css]) {
                        return rmap[css].uri;
                    } else {
                        return css;
                    }
                });
            }),
            addScript: createFrozenProperty(jsModule => {
                if (ctx.__resource.script.indexOf(jsModule) === -1) {
                    ctx.__resource.script.push(jsModule);
                }
            }),
            comboScript: createFrozenProperty(() => {
                return ctx.__resource.script.map(css => {
                    const appName = css.split('/')[0];
                    const rmap = require(path.join(opts.appDir, appName,
                        'resource-map'));
                    if (rmap[css]) {
                        return rmap[css].uri;
                    } else {
                        return css;
                    }
                });
            }),
            addJs: createFrozenProperty(jsModule => {
                if (ctx.__resource.js.indexOf(jsModule) === -1) {
                    ctx.__resource.js.push(jsModule);
                }
            }),
            comboJs: createFrozenProperty(() => {
                return ctx.__resource.js.map(css => {
                    const appName = css.split('/')[0];
                    const rmap = require(path.join(opts.appDir, appName,
                        'resource-map'));
                    if (rmap[css]) {
                        return rmap[css].uri;
                    } else {
                        return css;
                    }
                });
            }),
            add: createFrozenProperty(mpath => {
                const modulePath = mpath.toLowerCase();
                const arr = modulePath.split('/');
                const moduleName = arr[arr.length - 1];
                ctx.addCss(`${modulePath}/${moduleName}.css`);
                ctx.addJs(`${modulePath}/${moduleName}.js`);
                ctx.addScript(`${modulePath}/index.js`);
            })
        });

        return next();
    });
};