
module.exports = (req, res, next) => {
  if (Number(req.get('Content-Length')) === 0) {
    res.sendStatus(400);
  } else {
    next();
  }
};
