const authenticate = (req, res) => {
  try {
    if (req.method === 'OPTIONS') {
      res.status(200).send();
    } else if (req.user) {
      res.header('usuario', req.user['nickname']);
      res.status(200).send();
    } else {
      res.status(401).send({ message: 'invalid user' });
    }
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

module.exports = { authenticate };
