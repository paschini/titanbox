import express from 'express';
import controllers from '../controllers/boxByUuid';

const router = express.Router();

router.post('/boxByUuid', controllers.boxByUuid);

export = router;
