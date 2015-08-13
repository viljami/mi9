var assert = require("assert");
var fs = require('fs');

var showManager = require('./show-manager');


describe('Array', function() {
  var requestJSON;
  var responseJSON;

  beforeEach(function(){
    requestJSON = JSON.parse(fs.readFileSync(__dirname + '/../../data/sample_request.json'));
    responseJSON = JSON.parse(fs.readFileSync(__dirname + '/../../data/sample_response.json'));
  });

  describe('Show Manager', function(){
    it('should return json for valid json', function(){
    	assert.equal(typeof showManager.filter({}), 'object');
    	assert.equal(typeof showManager.filter(''), 'object');
    	assert.equal(typeof showManager.filter(undefined), 'object');
    });

    it('should pic the right stuff.', function(){
      var result = showManager.filter(requestJSON.payload);
      assert.equal(result.response.length, responseJSON.response.length);
    });

    it('should not pic shows without drm', function(){
      var filtered = requestJSON.payload.filter(function(o){
        return ! o.drm;
      });
      var result = showManager.filter(requestJSON.payload);
      var overlapAmount = result.response.filter(function(a){
        return !! filtered.filter(function(b){ return a.title === b.title; }).length;
      }).length;
      assert.equal(overlapAmount, 0);
    });

    it('should not pic shows with show(s)', function(){
      var filtered = requestJSON.payload.filter(function(o){
        return o.episodeCount <= 0;
      });
      var result = showManager.filter(requestJSON.payload);
      var overlapAmount = result.response.filter(function(a){
        return !! filtered.filter(function(b){ return a.title === b.title; }).length;
      }).length;
      assert.equal(overlapAmount, 0);
    });
  });
});

// function cleanup(buf) {
//     var pos;

//     while ((pos = buf.indexOf('\n')) >= 0) { // keep going while there's a newline somewhere in the buffer
//         if (pos === 0) { // if there's more than one newline in a row, the buffer will now start with a newline
//             buf = buf.slice(1); // discard it
//             continue; // so that the next iteration will start with data
//         }
//         return buf;
//     }
// }
