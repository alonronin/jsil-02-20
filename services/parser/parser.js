const Mercury = require('@postlight/mercury-parser');

module.exports = async (url, html) => {
  return Mercury.parse(url, {
    html
  });
};
