
var errors = {
  json: {
    "error": "Could not decode request: JSON parsing failed"
  }
};

module.exports = function(err, req, res, next){
  if (err.status === 400 && err instanceof SyntaxError){
    res.status(400).json(errors.json);
    return;
  }
  next(err);
};

