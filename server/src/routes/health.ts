import express from 'express';
import controllers from '../controllers/health';

const router = express.Router();

router.get('/ping', controllers.healthCheck);

export = router;
