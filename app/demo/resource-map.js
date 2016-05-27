/**
 * Copyright (C) 2016 yanni4night.com
 * resource-map.js
 *
 * changelog
 * 2016-05-27[22:14:22]:revised
 *
 * @author yanni4night@gmail.com
 * @version 1.0.0
 * @since 1.0.0
 */
'use strict';
module.exports = {
    'demo/component/nav/nav.css': {
        uri: 'demo/static/nav/nav.css',
        deps: []
    },
    'demo/component/nav/nav.js': {
        uri: 'demo/static/nav/nav.js',
        deps: ['lib/static/react-dom.js']
    },
    'demo/component/nav/index.js': {
        uri: 'demo/static/nav/index.js',
        deps: ['demo/component/base/index.js']
    },
    'demo/component/base/index.js': {
        uri: 'demo/static/base/index.js',
        deps: ['lib/static/antiaris-component.js']
    },
    'demo/static/lib/system-register-only.js': {
        uri: 'demo/static/lib/system-register-only.js',
        deps: []
    }
};