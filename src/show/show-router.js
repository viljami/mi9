var showManager = require('./show-manager');

// How it shoule look like:
// router.use('*', function(req, res){
//   res.json(showManager.filter(req.body.payload));
// });

var router = function(req, res){
  res.json(showManager.filter(req.body.payload));
};

module.exports = router;
