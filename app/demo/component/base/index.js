/**
  * Copyright (C) 2016 yanni4night.com
  * index.js
  *
  * changelog
  * 2016-05-27[17:04:36]:revised
  *
  * @author yanni4night@gmail.com
  * @version 1.0.0
  * @since 1.0.0
  */
const AntiarisComponent = require('../../../../antiaris');

class Base extends AntiarisComponent {
    constructor(props, displayName) {
        super(props, 'demo', displayName);
    }

}
module.exports = Base;