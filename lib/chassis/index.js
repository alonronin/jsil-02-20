const express = require('express');
const { json, urlencoded } = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const debug = require('debug');
const compression = require('compression');
const http = require('http');
const camelCase = require('lodash.camelcase');
const config = require('config');

const Create = context => {
    const log = debug(camelCase(context));
    const error = log.extend('errors');
    const chassis = log.extend('chassis');

    chassis('started in %s mode', config.env || 'undefined');

    const logger = { log, error };

    const app = express();
    app.enable('trust proxy');

    app.use(helmet());
    app.use(helmet.noCache());
    app.use(morgan('short'));
    app.use(cors());
    app.use(compression());
    app.use(json({ limit: '50mb' }));
    app.use(urlencoded({ extended: false }));

    const healthCheck = (routes = ['/', '/healthz']) => {
        const ok = (req, res) => res.send('ok');

        const router = new express.Router();

        routes.forEach(route => router.get(route, ok));

        return router;
    };

    const notFoundHandler = (req, res, next) => {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    };

    const errorHandler = (err, req, res, next) => {
        const error = err;

        err.status !== 404 && logger.error(err);

        res.status(err.status || 500).json({
            message: err.message,
            error
        });
    };

    const normalizePort = val => {
        const port = parseInt(val, 10);

        if (isNaN(port)) {
            return val;
        }

        if (port >= 0) {
            return port;
        }

        return false;
    };

    const serverStart = app =>
        new Promise((resolve, reject) => {
            const server = http.createServer(app);
            const port = normalizePort(app.get('port') || config.port || 8080);

            server.listen(port);

            server.on('error', error => {
                if (error.syscall !== 'listen') {
                    throw error;
                }

                const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

                let reason = error;

                if (error.code === 'EACCES') reason = `${bind} requires elevated privileges`;
                if (error.code === 'EADDRINUSE') reason = `${bind} is already in use`;

                reject(reason);
            });

            server.on('listening', async () => {
                const addr = server.address();
                const bind =
                    typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port + ' on ' + addr.address;

                resolve(`Listening on ${bind}`);
            });
        });

    process.on('uncaughtException', (err, origin) => {
        logger.error('Unhandled Exception at:', origin, 'err:', err);

        process.exit(1);
    });

    process.on('unhandledRejection', (reason, promise) => {
        logger.error('Unhandled Rejection at:', promise, 'reason:', reason);

        process.exit(1);
    });

    return {
        app,
        express,
        healthCheck,
        notFoundHandler,
        errorHandler,
        serverStart,
        logger,
        context
    };
};

module.exports = { Create };