/**
 * Copyright (C) 2016 yanni4night.com
 * app.js
 *
 * changelog
 * 2016-04-13[17:51:10]:revised
 *
 * @author yanni4night@gmail.com
 * @version 1.0.0
 * @since 1.0.0
 */
require('babel-core/register')({
    presets: ['es2015-node5', 'stage-3']
});

const path = require('path');
const antiaris = require('./kernel/');
const conf = require('./conf/');

const app = antiaris.bootstrap({
    appDir: path.join(__dirname, 'app')
});

console.log(`Listening at ${conf.PORT}`);
app.listen(conf.PORT);