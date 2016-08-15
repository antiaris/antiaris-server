/**
 * Copyright (C) 2016 antiaris.xyz
 * app.js
 *
 * changelog
 * 2016-04-13[17:51:10]:revised
 *
 * @author yanni4night@gmail.com
 * @version 1.0.0
 * @since 1.0.0
 */
'use strict';

require("babel-polyfill");
const path = require('path');
const antiaris = require('./kernel/');
const conf = require('./conf/');
const fs = require('fs');
const mkdirp = require('mkdirp');

const appDir = path.join(__dirname, 'app');


if (!fs.existsSync(appDir)) {
    mkdirp.sync(appDir);
}

const app = antiaris.bootstrap({
    appDir,
    conf,
    confDir: path.join(__dirname, 'conf'),
    middlewareDir: path.join(__dirname, 'middleware')
});

console.log(`Listening at ${conf.PORT}`);
app.listen(conf.PORT);