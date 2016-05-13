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

module.exports = (ctx, next) => {
  // 静态资源

  Object.defineProperties(ctx, {
    '__resource': {
      value: {
        css: [],
        js: []
      },
      writable: false,
      enumerable: true,
      configurable: false
    },
    css: {
      value: cssModule => {
        if (ctx.__resource.css.indexOf(cssModule) === -1) {
          ctx.__resource.css.push(cssModule);
        }
      },
      writable: false,
      enumerable: true,
      configurable: false
    },
    comboCss: {
      value: () => {
        return ctx.__resource.css;
      },
      writable: false,
      enumerable: true,
      configurable: false
    },
    js: {
      value: jsModule => {
        if (ctx.__resource.js.indexOf(jsModule) === -1) {
          ctx.__resource.js.push(jsModule);
        }
      },
      writable: false,
      enumerable: true,
      configurable: false
    },
    comboJs: {
      value: () => {
        return ctx.__resource.js;
      },
      writable: false,
      enumerable: true,
      configurable: false
    }
  });

  return next();
};