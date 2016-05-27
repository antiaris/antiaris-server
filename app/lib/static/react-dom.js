/**
 * ReactDOM v15.0.2
 *
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

System.register('lib/static/react-dom', ['lib/static/react'], function (_export) {
    var React;
    return {
        setters: [function (_) {
            React = _.React;
        }],
        execute: function () {
            _export('ReactDOM', React.__SECRET_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)
        }
    };
});