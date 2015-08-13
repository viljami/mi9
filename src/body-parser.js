module.exports = {
  json: function(options){
    return function(req, res, next){
      if (req.headers['content-type'] === 'application/json'){
        req.body = JSON.parse(cleanup(req.body));
      }
      next();
    };
  }
};

// original: http://stackoverflow.com/questions/11874096/parse-large-json-file-in-nodejs
function cleanup(buf) {
    var pos;

    while ((pos = buf.indexOf('\n')) >= 0) { // keep going while there's a newline somewhere in the buffer
        if (pos === 0) { // if there's more than one newline in a row, the buffer will now start with a newline
            buf = buf.slice(1); // discard it
            continue; // so that the next iteration will start with data
        }
        return buf;
    }
}
