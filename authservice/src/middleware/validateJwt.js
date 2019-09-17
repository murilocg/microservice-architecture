const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const validateJwt = (req, res, next) => {
  jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    algorithms: ['RS256']
  })(req, res, next);
};

module.exports = validateJwt;
