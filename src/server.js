var http = require('http');

var Request = require('./request');
var Response = require('./response');

function getListeners (alllisteners){
  return alllisteners.filter(function(listener){ return listener.length < 4; });
}

function getErrorHandlers (listeners){
  return listeners.filter(function(f){ return f.length === 4; });
}

function nextHandler (fn, handlers){
  var i = 0;
  var doNext = true;
  function next(){ doNext = true; }
  while(i < handlers.length && doNext){
    doNext = false;
    fn(next, handlers[i]);
    i++;
  }
}

function App(){
  var me = this;
  this.listeners = {
    '*': []
  };

  this.use = function(path, fn){
    if (typeof path === 'function'){
      fn = path;
      path = '*';
    }

    if (! this.listeners[path]) this.listeners[path] = [fn];
    else this.listeners[path].push(fn);
    return this;
  };

  this.server = new http.Server();
  this.server.on('request', function (req, res){
    var data = '';

    function onAborted() {
      res.statusCode = 400;
      res.write('request aborted');
    }

    function onData (chuck){
      data += chuck.toString();
    }

    function onEnd(){
      var path = '*',
        request,
        response = new Response(res);

      try {
        request = new Request(req, data);
        nextHandler(function(next, handler){
          handler(request, response, next);
        }, getListeners(me.listeners[path]));
      } catch (err){
        nextHandler(function(next, handler){
          handler(err, request, response, next);
        }, getErrorHandlers(me.listeners[path]));
      }

      res.end();
      cleanup();
    }

    req.on('aborted', onAborted);
    req.on('data', onData);
    req.once('end', onEnd);
    req.once('error', onEnd);
    req.once('close', cleanup);

    function cleanup() {
      received = buffer = null;

      req.removeListener('aborted', onAborted);
      req.removeListener('data', onData);
      req.removeListener('end', onEnd);
      req.removeListener('error', onEnd);
      req.removeListener('close', cleanup);
    }
  });

  this.listen = this.server.listen.bind(this.server);
  return this;
}

module.exports = App;

