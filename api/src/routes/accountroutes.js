import express from 'express';
import usercontroller from '../controller/usercontroller.js';
import tokenVerificationCheck from '../middleware/verifytoken.middleware.js';

const accountRoutes = express.Router();

accountRoutes.get('/', tokenVerificationCheck, usercontroller.getAccount);
accountRoutes.put('/', tokenVerificationCheck, usercontroller.updateAccount);

export default accountRoutes;