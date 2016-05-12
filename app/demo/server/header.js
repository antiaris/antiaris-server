/**
  * Copyright (C) 2016 yanni4night.com
  * header.js
  *
  * changelog
  * 2016-05-12[18:27:25]:revised
  *
  * @author yanni4night@gmail.com
  * @version 1.0.0
  * @since 1.0.0
  */

const React = require('react');

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Header';
    }
    render() {
        const {title} = this.props;
        return <header>{title}</header>;
    }
}

module.exports = Header;
