
module.exports = (req, res, next) => {
  if (req.method === 'POST') {
    next();
  } else {
    res.sendStatus(404);
  }
};
