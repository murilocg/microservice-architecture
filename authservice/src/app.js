const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoute = require('./rotas/authRoute');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const router = express.Router();

router.all('/api/v1', (req, res) => {
  res.send({
    message: 'Api Authenticator Microservice'
  });
});

app.use('/', router, authRoute);
app.use(function(err, req, res, next) {
  if (err.name === 'UnauthorizedError') res.status(err.status).send({ message: err.message });
  else next();
});

module.exports = app;
