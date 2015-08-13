var express = require('express');
var router = express.Router();
var showManager = require('./show-manager');

router.use('*', function(req, res){
  res.json(showManager.filter(req.body.payload));
});

module.exports = router;
