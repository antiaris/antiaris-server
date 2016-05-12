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
const Antiaris = require('./kernel/');

const antiaris = new Antiaris({
    appDir: path.join(__dirname, 'app')
});

const app = antiaris.bootstrap();

console.log('Listening at 4098');
app.listen(4098);