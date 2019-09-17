const { Router } = require('express');
const validateJwt = require('../middleware/validateJwt');
const { authenticate } = require('../controllers/authController');

const authRoute = Router();
authRoute.all('/api/v1/authenticate*', validateJwt, authenticate);
module.exports = authRoute;
