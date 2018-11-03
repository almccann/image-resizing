const express = require('express');
const bodyParser = require('body-parser');
const filetypes = require('../constants').filetypes;

module.exports = image = express.Router()
  .use('*', require('../middlewear/validateMethod'))
  .use('*', require('../middlewear/validateHeader'))
  .use('*', require('../middlewear/validatePathEnd'))
  .use('*', bodyParser.raw({
    type: filetypes.map(f => 'image/'.concat(f)),
    limit: '2mb',
  }))
  .use('/:route', require('./routes'));
