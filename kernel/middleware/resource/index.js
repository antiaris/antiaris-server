/**
 * Copyright (C) 2016 antiaris.xyz
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
const uniq = require('lodash/uniq');
const defineFrozenProperty = require('define-frozen-property');

module.exports = ({
    app,
    opts
}) => {
    const {
        appDir,
        conf
    } = opts;

    function getSingleResource(res) {
        const ret = [];
        const appName = res.split(':')[0];
        const rmap = require(path.join(appDir, appName,
            'resource-map.json'));
        if (rmap[res]) {
            return rmap[res].uri;
        }
        return null;
    }

    function getResources(res) {
        const ret = [];
        const appName = res.split(':')[0];
        const rmap = require(path.join(appDir, appName,
            'resource-map.json'));
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

    function getArrayResources(resArr) {
        const ret = []
        resArr.forEach(res => {
            let reses = getResources(res);
            ret.push(...reses);
        });
        return ret;
    }

    function getResourceUris(resArr) {
        const ret = []
        resArr.forEach(res => {
            const appName = res.split(':')[0];
            const rmap = require(path.join(appDir, appName,
                'resource-map.json'));
            if (rmap[res] && rmap[res].uri) {
                ret.push(rmap[res].uri);
            }
        });
        return ret;
    }

    function getRecusiveResource(resArr) {
        const ret = []
        resArr.forEach(res => {
            const appName = res.split(':')[0];
            const rmap = require(path.join(appDir, appName,
                'resource-map.json'));
            if (rmap[res]) {
                if (Array.isArray(rmap[res].deps)) {
                    const deps = getRecusiveResource(rmap[res].deps);
                    ret.push(...deps);
                    ret.push(...rmap[res].deps);
                }
            }
        });
        ret.push(...resArr);
        return uniq(ret);
    }

    app.use((ctx, next) => {
        const styles = [];
        const scripts = [];

        defineFrozenProperty(ctx, 'comboScript', () => {
            const jsArray = getResourceUris(getRecusiveResource(scripts));
            return `<script src="${conf.URL.STATIC_PREFIX}${jsArray.join()}"></script>`;
        });

        defineFrozenProperty(ctx, 'comboStyle', () => {
            const jsArray = getRecusiveResource(scripts);
            let cssArray = jsArray.map(js=>{
                return js.replace(/\.jsx?$/i,'.less');
            });
            cssArray = getResourceUris(cssArray);
            return `<link rel="stylesheet" href="${conf.URL.STATIC_PREFIX}${cssArray.join()}" />`;
        });

        defineFrozenProperty(ctx, 'getStyle', mpath => {
            const style = getSingleResource(mpath);
            return `<link rel="stylesheet" href="${conf.URL.STATIC_PREFIX}${style}"/>`;
        });

        defineFrozenProperty(ctx, 'addStyle', mpath => {
            if (styles.indexOf(mpath) === -1) {
                styles.push(mpath);
            }
        });

        defineFrozenProperty(ctx, 'getScript', mpath => {
            const script = getSingleResource(mpath);
            return `<script src="${conf.URL.STATIC_PREFIX}?${script}"></script>`;
        });

        defineFrozenProperty(ctx, 'addScript', mpath => {
            if (scripts.indexOf(mpath) === -1) {
                scripts.push(mpath);
            }
        });

        return next();
    });
};