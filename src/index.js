var bodyParser = require('./body-parser');
var errorHandler = require('./error-handler');
var App = require('./server');
var showRouter = require('./show/show-router');

var app = new App();
var port = process.env.PORT || 3000;

app.use(bodyParser.json({
  strict: true
}));
app.use('*', showRouter);
app.use(errorHandler);

app.listen(port);
