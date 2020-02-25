const { app, healthCheck, notFoundHandler, errorHandler } = require('./context');
const api = require('./api');

app.use(healthCheck());

app.use(api);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;