var fs = require('fs');

var showManager = require('./show-manager');

var requestData = JSON.parse(fs.readFileSync(__dirname + '/../../data/sample_request.json'));
var responseData = JSON.parse(fs.readFileSync(__dirname + '/../../data/sample_response.json'));

var assert = require("assert");
describe('Array', function() {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    });
  });

  describe('Show Manager', function(){
    it('should return json for valid json', function(){
    	assert.equal(typeof showManager.filter({}), 'object');
    	assert.equal(typeof showManager.filter(''), 'object');
    	assert.equal(typeof showManager.filter(undefined), 'object');
    });

    it('should pic the right stuff.', function(){
      var result = showManager.filter(requestData);
      assert.equal(result.response.length, responseData.response.length);
    });
  });
});
