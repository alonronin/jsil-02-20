#!/usr/bin/env node

const { serverStart, logger } = require('./context');

const app = require('./app');

(async () => {
    try {
        const server = await serverStart(app);
        logger.log.extend('server')(server);
    } catch (e) {
        logger.error(e);
        process.exit(1);
    }
})();