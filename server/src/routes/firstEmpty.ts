import express from 'express';
import controllers from '../controllers/firstEmpty';

const router = express.Router();

router.get('/firstEmpty', controllers.firstEmpty);

export = router;