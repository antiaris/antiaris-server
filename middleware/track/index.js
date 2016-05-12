/**
  * Copyright (C) 2016 yanni4night.com
  * index.js
  *
  * changelog
  * 2016-05-12[17:20:49]:revised
  *
  * @author yanni4night@gmail.com
  * @version 1.0.0
  * @since 1.0.0
  */
module.exports = (ctx, next) => {
    console.log(`Incoming ${ctx.__appName}`);
    return next();
};