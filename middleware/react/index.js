/**
 * Copyright (C) 2016 yanni4night.com
 * index.js
 *
 * changelog
 * 2016-05-27[17:49:20]:revised
 *
 * @author yanni4night@gmail.com
 * @version 1.0.0
 * @since 1.0.0
 */
const React = require('react');

module.exports = () => {
    Object.defineProperty(global, 'React', {
        value: React,
        writable: false,
        enumerable: true,
        configurable: false
    });
};