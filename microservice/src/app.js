const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helloWorldRoute = require('./routes/helloWorldRoute');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const router = express.Router();
router.all('/api/v1', (req, res) => {
  res.send({
    message: 'Api Microservice'
  });
});

app.use('/', router, helloWorldRoute);

module.exports = app;
