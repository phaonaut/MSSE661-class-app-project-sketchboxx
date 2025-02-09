const express = require('express');
const usercontroller = require('../controller/usercontroller.js');
const verifyToken = require('../middleware/verifytoken.js');

const userRoutes = express.Router();

/**
 * Express routes for the app
 */

/**
 * Routes for users
 */
userRoutes.get('/', usercontroller.getMe);
userRoutes.put('/', verifyToken, usercontroller.updateUser);

module.exports = userRoutes;
