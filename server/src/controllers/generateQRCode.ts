import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';
import QRCode from 'qrcode';
import { generateRandomUuid } from './utils';

const NAMESPACE = 'QR Code Generator';

const generateQRCode = async (req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `QR Code Generator route called`);

  const uuid = generateRandomUuid();

  /** Generate QR Code */
  try {
    return res.status(200).json({
      message: `QR Code generated`,
      uuid,
      label: req.body.data,
      image: await QRCode.toDataURL(uuid)
    });
  } catch (err) {
    logging.error(NAMESPACE, `\`Something went wrong... ${err}`);
    console.log(req.body);
    return res.status(500).json({
      message: `Something went wrong... ${err}`
    });
  }
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
