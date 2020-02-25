const { app, healthCheck, notFoundHandler, errorHandler } = require('./context');
const scrape = require('./scrape');

app.use(healthCheck());

app.use(scrape);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;