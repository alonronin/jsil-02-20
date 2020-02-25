const { express, logger } = require('./context');
const { Router } = express;
const axios = require('axios');
const config = require('config');
const token = require('cloudrun/token');

const create = async (req, res, next) => {
  try {
    const { url } = req.body;

    const { data } = await axios.post(
        config.scraper,
        { url },
        {
          headers: {
            Authorization: `Bearer ${await token(config.scraper)}`
          }
        }
    );

    logger.log('%j', data);

    await res.json(data);
  } catch (e) {
    next(e);
  }
};

const router = new Router();

router.route('/').post(create);

module.exports = router;
