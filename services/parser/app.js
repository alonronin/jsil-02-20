const { app, healthCheck, notFoundHandler, errorHandler } = require('./context');
const parse = require('./parse');

app.use(healthCheck());

app.use(parse);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;