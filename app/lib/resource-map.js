/**
 * Copyright (C) 2016 yanni4night.com
 * resource-map.js
 *
 * changelog
 * 2016-05-27[22:51:44]:revised
 *
 * @author yanni4night@gmail.com
 * @version 1.0.0
 * @since 1.0.0
 */

module.exports = {
    'lib/static/react.js': {
        uri: 'lib/static/react.js'
    },
    'lib/static/react-dom.js': {
        uri: 'lib/static/react-dom.js',
        deps: ['lib/static/react.js']
    },
    'lib/static/antiaris-component.js': {
        uri: 'lib/static/antiaris-component.js',
        deps: ['lib/static/react.js']
    }
};