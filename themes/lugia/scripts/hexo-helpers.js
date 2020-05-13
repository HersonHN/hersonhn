'use strict';

const stringify = require('json-stringify-safe');

hexo.extend.helper.register('JSON', function print(obj) {
  let json = stringify(obj, null, 4);
  return json;
});
