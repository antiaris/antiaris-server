/**
 * Copyright (C) 2016 yanni4night.com
 * nav.js
 *
 * changelog
 * 2016-05-27[22:21:37]:revised
 *
 * @author yanni4night@gmail.com
 * @version 1.0.0
 * @since 1.0.0
 */


System.register('demo/component/nav', ['demo/component/base'], function (Base) {

    class Nav extends Base {
        constructor(props) {
            super(props, 'Nav');
        }
        render() {
            return React.createElement(
                "div", {
                    className: "nav"
                },
                "Nav"
            );
        }
    }
    return Nav;
});