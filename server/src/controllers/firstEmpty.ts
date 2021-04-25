import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';
import {Connect, Query} from "../config/mysql";

const NAMESPACE = 'QR Code First Empty Controller';

const firstEmpty = (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `FirstEmpty route called`);

  let query = `SELECT * FROM boxes WHERE label IS NULL LIMIT 0,1`;

  Connect()
    .then((connection) => {
      Query(connection, query)
        .then((data) => {
          return res.status(200).json({
            data
          });
        })
        .catch((error) => {
          logging.error(NAMESPACE, error.message, error);

          return res.status(500).json({
            message: error.message,
            error
          });
        })
        .finally(() => {
          connection.end();
        });
    })
    .catch((error) => {
      logging.error(NAMESPACE, error.message, error);

      return res.status(500).json({
        message: error.message,
        error
      });
    });
};

export default { firstEmpty };
