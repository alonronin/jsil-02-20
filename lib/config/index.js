module.exports = {
  port: process.env.PORT || 8080,
  api: process.env.API || 'http://localhost:9000',
  parser: process.env.PARSER || 'http://localhost:10000',
  scraper: process.env.SCRAPER || 'http://localhost:20000',
  env: process.env.NODE_ENV,
  executablePath: process.env.EXECUTABLE_PATH,
  headless: Boolean(process.env.HEADLESS),
};
