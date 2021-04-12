import express from 'express';
import controllers from '../controllers/generateQRCode';

const router = express.Router();

router.get('/generate', controllers.generateQRCode);

export = router;
