module.exports = function Response (res){
  this.status = function(statusCode){
    res.statusCode = statusCode;
    return this;
  };

  this.send = function(data){
    res.write(data);
  };

  this.json = function(json){
    res.setHeader('Content-Type', 'application/json');
    this.send(JSON.stringify(json));
  };
};
