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

    function getResources(res) {
        const ret = [];
        const appName = res.split('/')[0];
        const rmap = require(path.join(opts.appDir, appName,
            'resource-map'));
        if (rmap[res]) {
            if (Array.isArray(rmap[res].deps)) {
                rmap[res].deps.forEach(r => {
                    let deps = getResources(r);
                    ret.push(...deps);
                });
            }
            ret.push(rmap[res].uri);
        }
        return ret;
    }

    function getArrayResources(resArr){
        const ret=[]
        resArr.forEach(res=>{
            let reses = getResources(res);
            ret.push(...reses);
        });
        return ret;
    }

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
                return getArrayResources(ctx.__resource.css)
            }),
            addScript: createFrozenProperty(jsModule => {
                if (ctx.__resource.script.indexOf(jsModule) === -1) {
                    ctx.__resource.script.push(jsModule);
                }
            }),
            comboScript: createFrozenProperty(() => {
                return getArrayResources(ctx.__resource.script);
            }),
            addJs: createFrozenProperty(jsModule => {
                if (ctx.__resource.js.indexOf(jsModule) === -1) {
                    ctx.__resource.js.push(jsModule);
                }
            }),
            comboJs: createFrozenProperty(() => {
                return getArrayResources(ctx.__resource.js);
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