/**
  * Copyright (C) 2016 yanni4night.com
  * index.js
  *
  * changelog
  * 2016-05-27[17:02:56]:revised
  *
  * @author yanni4night@gmail.com
  * @version 1.0.0
  * @since 1.0.0
  */
const Base = require('../base/');

class Nav extends Base {
    constructor(props) {
        super(props ,'Nav');
    }
    render() {
        return <div className="nav">Nav</div>;
    }
}
module.exports = Nav;
