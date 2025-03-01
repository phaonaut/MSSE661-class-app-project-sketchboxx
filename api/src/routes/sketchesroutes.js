import express from 'express';
import sketchesController from '../controller/sketchescontroller.js';
import tokenVerificationCheck from '../middleware/verifytoken.middleware.js';

const sketchesRoutes = express.Router();

sketchesRoutes.get('/', tokenVerificationCheck, sketchesController.getSketches);
sketchesRoutes.post('/', tokenVerificationCheck, sketchesController.postSketch);

export default sketchesRoutes;