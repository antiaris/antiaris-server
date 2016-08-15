/**
  * Copyright (C) 2016 antiaris.xyz
  * index.js
  *
  * changelog
  * 2016-05-27[17:52:26]:revised
  *
  * @author yanni4night@gmail.com
  * @version 1.0.0
  * @since 1.0.0
  */
module.exports = antiaris => {
     Object.defineProperty(global, 'antiaris', {
        value: antiaris,
        writable: false,
        enumerable: true,
        configurable: false
    });
};