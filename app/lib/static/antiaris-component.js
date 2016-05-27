/**
 * Copyright (C) 2016 yanni4night.com
 * index.js
 *
 * changelog
 * 2016-05-27[18:01:40]:revised
 *
 * @author yanni4night@gmail.com
 * @version 1.0.0
 * @since 1.0.0
 */

System.register('lib/static/antiaris-component', ['lib/static/react'], function (_export) {


    var React;
    return {
        setters: [function (_) {
            React = _.React;
        }],
        execute: function () {
            class AntiarisComponent extends React.Component {
                constructor(props, appName, displayName) {
                        super(props);
                        this.appName = appName;
                        this.displayName = displayName;
                        this.collectResource();
                    }
                    /**
                     * 收集一个 Component 目录下的所有静态资源。
                     */
                collectResource() {
                    const {
                        appName,
                        displayName,
                        props
                    } = this;
                    const {
                        add
                    } = props;
                    if ('function' === typeof add) {
                        add(`${appName}/component/${displayName}`);
                    }
                }
            }
            _export('AntiarisComponent', AntiarisComponent);
        }
    };
});