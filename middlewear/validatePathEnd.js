const filetypes = require('../constants').filetypes;
const extFromPath = require('../utilities/extFromPath');

module.exports = (req, res, next) => {
  console.log('validatePathEnd', req.params[0])
  const reqContentType = req.get('Content-Type');
  const contentTypeExt = reqContentType.split('/')[1].toLowerCase();
  const path = req.params[0];
  const ext = extFromPath(path);

  if (filetypes.includes(ext) && contentTypeExt === ext) {
    req.pathEnd = path.slice(1);
    req.ext = ext;
    next();
  } else {
    res.sendStatus(404);
  }
};
