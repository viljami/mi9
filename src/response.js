module.exports = function Response (res){
  this.status = function(statusCode){
    res.statusCode = statusCode;
    return this;
  };

  this.send = function(data){
    console.log('send', data);
    res.write(data);
    // res.end();
  };

  this.json = function(json){
    res.setHeader('Content-Type', 'application/json');
    this.send(JSON.stringify(json));
  };
};
