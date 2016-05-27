/**
 * Copyright (C) 2016 yanni4night.com
 * antiaris.js
 *
 * changelog
 * 2016-05-27[17:06:57]:revised
 *
 * @author yanni4night@gmail.com
 * @version 1.0.0
 * @since 1.0.0
 */

class AntiarisComponent extends React.Component {
    constructor(props, appName, displayName) {
        super(props);
        this.appName = appName;
        this.displayName = displayName;
        this.collectResource();
    }
    collectResource() {
        const {add} = this.props;
        add(`${this.appName}/component/${this.displayName}`);
    }
}

module.exports = AntiarisComponent;