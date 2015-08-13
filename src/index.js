var bodyParser = require('./body-parser');
var errorHandler = require('./error-handler');
var App = require('./server');
var showRouter = require('./show/show-router');

var app = new App();

app.use(bodyParser.json({
  strict: true
}));
app.use('*', showRouter);
app.use(errorHandler);

app.listen(3000);
