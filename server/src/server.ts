import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import logging from './config/logging';
import config from './config/config';
import healthCheck from './routes/health';
import generateQRCode from './routes/generateQRCode';
import firstEmpty from './routes/firstEmpty';
import boxByUuid from "./routes/boxByUuid";

const NAMESPACE = 'Server';
const router = express();

/** Logging the request */
router.use((req, res, next) => {
  logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress || 'notAvailable'}]`);

  res.on('finish', () => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress || 'notAvailable'}], STATUS - [${res.statusCode}]`);
  });

  next();
});

/** Parse the request */
router.use(bodyParser.urlencoded({ extended: false })); // allow nested json
router.use(bodyParser.json()); // parses json

/** Rules of API */
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    return res.status(200).json({});
  }

  next();
});

/** Routes */
router.use('/health', healthCheck);
router.use('/qrcode', generateQRCode);
router.use('/qrcode', firstEmpty);
router.use('/qrcode', boxByUuid);

/** Error Handling */
router.use((req, res, next) => {
  const error = new Error('not found');

  return res.status(404).json({
    message: error.message
  });
});

/** Create the server */
const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server running on ${config.server.hostname}:${config.server.port}`));

// enable https to be able to use it on phone
// https://hackernoon.com/set-up-ssl-in-nodejs-and-express-using-openssl-f2529eab5bb
