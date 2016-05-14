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
const Header = require('./server/header');
const nunjucks = require('nunjucks');
const path = require('path');

const env = nunjucks.configure(path.join(__dirname, 'views'), {
    autoescape: true
});

module.exports = router => {
    router.get('/raw', (ctx, next) => {
        ctx.body = '<!DOCTYPE html><html><head><link rel="stylesheet" href="/demo/static/index.css" /></head><body><h1>Hello</h1></body></html>';
        return next();
    });

    router.get('/react', (ctx, next) => {
        const {appendCss, appendScript} = ctx;
        ctx.body = env.render('skeleton.tpl', {
            css: ctx.comboCss(),
            content: ReactDOMServer.renderToString( <Header title="Hello" appendScript={appendScript} appendCss={appendCss} /> )
        });
        return next();
    });
};