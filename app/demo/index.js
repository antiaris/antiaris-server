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

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const nunjucks = require('nunjucks');
const path = require('path');
const Nav = require('./component/nav/');

const env = nunjucks.configure(path.join(__dirname, 'views'), {
    autoescape: true
});

module.exports = router => {
    router.get('/raw', (ctx, next) => {
        ctx.body =
            '<!DOCTYPE html><html><head><link rel="stylesheet" href="/demo/static/index.css" /></head><body><h1>Hello</h1></body></html>';
        return next();
    });

    router.get('/isomorphic', (ctx, next) => {
        const {add} = ctx;
        const ret = ReactDOMServer.renderToString(React.createElement(Nav, {
            title: "Hello",
            add
        }));
        ctx.body = env.render('skeleton.tpl', {
            css: ctx.comboCss(),
            script: ctx.comboScript(),
            js: ctx.comboJs(),
            content: ret
        });
        return next();
    });
};