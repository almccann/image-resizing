const express = require('express');
const app = express();

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development'
}

app.use('/image', require('./image'));

if (process.env.NODE_ENV !== 'test') {
  app.listen(3000, () => console.log(`Image Resizing is running on port 3000`));
}

module.exports = app;
