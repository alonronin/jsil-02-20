const { express, logger } = require('./context');
const { Router } = express;

const parser = require('./parser');

const create = async (req, res, next) => {
    let { url, html } = req.body;

    logger.log(html);

    try {
        const result = await parser(url, html);

        await res.json(result);
    } catch (e) {
        next(e);
    }
};

const router = new Router();

router.route('/').post(create);

module.exports = router;