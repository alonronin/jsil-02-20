const { express, logger } = require('./context');
const { Router } = express;
const axios = require('axios');
const token = require('cloudrun/token');
const config = require('config');

const scraper = require('./scraper');

const create = async (req, res, next) => {
  let { url } = req.body;

  logger.log(url);

  try {
    const { html } = await scraper(url);
    const { data } = await axios.post(
      config.parser,
      { url, html },
      {
        headers: {
          Authorization: `Bearer ${await token(config.parser)}`
        }
      }
    );

    await res.json(data);

  } catch (e) {
    next(e);
  }
};

const router = new Router();

router.route('/').post(create);

module.exports = router;
