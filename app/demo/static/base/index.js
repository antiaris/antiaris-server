/**
 * Copyright (C) 2016 yanni4night.com
 * index.js
 *
 * changelog
 * 2016-05-27[22:58:20]:revised
 *
 * @author yanni4night@gmail.com
 * @version 1.0.0
 * @since 1.0.0
 */
System.register('demo/component/base', ['lib/static/antiaris-component'], function (_export) {

    var AntiarisComponent;
    return {
        setters: [function (_) {
            AntiarisComponent = _.AntiarisComponent;
        }],
        execute: function () {
            class Base extends AntiarisComponent {
                constructor(props, displayName) {
                    super(props, 'demo', displayName);
                }

            }
            _export('Base', Base);
        }
    };
});