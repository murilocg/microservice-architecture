const helloWorld = (req, res) => {
  try {
    res.status(200).send({ message: 'Hello World' });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

module.exports = { helloWorld };
