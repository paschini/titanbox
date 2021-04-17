import { Request, Response } from 'express';
import logging from '../config/logging';
import QRCode from 'qrcode';
import { generateRandomUuid } from './utils';
import { Connect, Query } from '../config/mysql';

const NAMESPACE = 'QR Code Generator';

const generateQRCode = async (req: Request, res: Response) => {
  logging.info(NAMESPACE, `QR Code Generator route called`);

  const uuid = generateRandomUuid();
  const qrImage = await QRCode.toDataURL(uuid);
  let query = `INSERT INTO boxes (uuid, QRImage) VALUES ("${uuid}", "${qrImage}")`;

  Connect()
    .then((connection) => {
      Query(connection, query)
        .then((result) => {
          return res.status(200).json({
            result
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

export default { generateQRCode };

/* on the client, we will use this to see the image generated
function getBase64Image(src, callback, outputFormat) {
  const img = new Image();
  img.crossOrigin = 'Anonymous';
  img.onload = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    let dataURL;
    canvas.height = img.naturalHeight;
    canvas.width = img.naturalWidth;
    ctx.drawImage(img, 0, 0);
    dataURL = canvas.toDataURL(outputFormat);
    callback(dataURL);
  };

  img.src = src;
  if (img.complete || img.complete === undefined) {
    img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
    img.src = src;
  }
}*/
