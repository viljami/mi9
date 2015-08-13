var bodyParser = require('body-parser');
var express = require('express');

var errorHandler = require('./error-handler');
var showRouter = require('./show/show-router');

var app = express();

app.use(bodyParser.json({
  strict: true
}));
app.use('/', showRouter);
app.use(errorHandler);

app.listen(3000);
