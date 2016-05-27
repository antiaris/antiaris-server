/**
 * Copyright (C) 2016 yanni4night.com
 * nav.js
 *
 * changelog
 * 2016-05-27[22:39:59]:revised
 *
 * @author yanni4night@gmail.com
 * @version 1.0.0
 * @since 1.0.0
 */

Promise.all([System.import('demo/component/nav'), System.import('lib/static/react'), System.import(
    'lib/static/react-dom')]).then(function ([nav, react, reactDOM]) {
    const Nav = nav.Nav;
    const React = react.React;
    const ReactDOM = reactDOM.ReactDOM;
    ReactDOM.render(React.createElement(Nav, {text: 'Nav'}), document.querySelector('#react-dom'));
}, function (e) {
    console.error('FATAL:', e);
});