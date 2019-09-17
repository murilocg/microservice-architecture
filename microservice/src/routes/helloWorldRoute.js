const { Router } = require('express');
const { helloWorld } = require('../controllers/helloWorldController');

const route = Router();
route.get('/api/v1/helloworld', helloWorld);
module.exports = route;
