var url = require('url');

function copy(a, b){
  return Object
  .keys(b)
  .reduce(function(o, key){
    o[key] = b[key];
    return o;
  }, a);
}

module.exports = function Request (req, data){
  this.headers = copy({}, req.headers);
  copy(this, url.parse(req.url));
  this.method = req.method;
  this.body = data;
  return this;
};
