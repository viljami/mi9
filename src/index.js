var express = require('express');
var app = express();

var errorManager = require('./erro-manager');
var showManager = require('./show-manager');

app.get('*', function(req, res){
  var data = req.body;
  if (! data ) res.json({});

  showManager.filter(data);
});

app.listen(3000);
