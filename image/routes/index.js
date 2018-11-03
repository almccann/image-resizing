const express = require('express');
const sharp = require('sharp');
const filetypes = require('../../constants').filetypes;
const baseFromUrl = require('../../utilities/baseFromUrl');

// accepts key_value,key_value
// returns an object literal
const naiveObjFromStr = str => {
  console.log('passed to naive', str);
  return str.split(',').reduce((a,c) => { 
    const arr = c.split('_');
    let v = arr[1];
    // cast to boolean
    if (v === 'true') { v = true }
    if (v === 'false') { v = false }
    // cast to number
    if (!Number.isNaN(Number(v)) && !(typeof(v) === 'boolean')) { 
      v = Number(v);
    }
    return {
      ...a,
      [arr[0]]: v
    };
  }, {});
};

module.exports = routes = express.Router()
  // This endpoint will not accept nested key_values
  // https://sharp.dimens.io/en/stable/api-constructor/#parameters
  .post('/:options', (req, res, next) => {
    const base = baseFromUrl(req.pathEnd);
    if (base.startsWith('[') && base.endsWith(']')) {
      console.log('route: /:[options]');
      const options = naiveObjFromStr(base.slice(1,-1));
        res.set('Content-Type', `image/${req.ext}`);
        sharp(req.body)
          .options(options)
          .toBuffer()
          .then(data => res.send(data))
          .catch(err => res.sendStatus(500));
    } else {
      next();
    }
  })
  .post('/:m_max', (req, res, next) => {
    const base = baseFromUrl(req.pathEnd);
    if (base.startsWith('m')) {
      console.log('route: /:m_max');
      const max = Number(base.slice(2));
      if (Number.isNaN(max)) {
        res.sendStatus(400);
      } else {
        res.set('Content-Type', `image/${req.ext}`);
        const image = sharp(req.body);
        image
          .metadata()
          .then(metadata => {
            const h = metadata.height;
            const w = metadata.width;
            const options = h >= w ? { height: max } : { width: max };
            return image
              .resize(options)
              .toBuffer(); 
          })
          .then(data => res.send(data))
          .catch(err => res.sendStatus(500));
      }
    } else {
      next();
    }
  })
  .post('/:w_widthh_height', (req, res, next) => {
    const base = baseFromUrl(req.pathEnd);
    const cPos = base.indexOf(',');
    if (cPos > 0 && base.startsWith('w') && (base.slice(cPos + 1,cPos + 2) === 'h')) {
      console.log('route: /:w_width,h_height');
      const width = Number(base.slice(base.indexOf('w') + 2,cPos));
      const height = Number(base.slice(base.indexOf('h') + 2));
      if (Number.isNaN(width) || Number.isNaN(height)) {
        res.sendStatus(400);
      } else {
        res.set('Content-Type', `image/${req.ext}`);
        sharp(req.body)
          .resize({
            width: width,
            height: height
          })
          .toBuffer()
          .then(data => res.send(data))
          .catch(err => res.sendStatus(500));
      }
    } else {
      next();
    }
  })
  .post('/:f_format', (req, res, next) => {
    const base = baseFromUrl(req.pathEnd);
    if (base.startsWith('f')) {
      console.log('route: /:f_format');
      const format = base.slice(2);
      if (!filetypes.includes(format)) {
        res.sendStatus(400);
      } else {
        res.set('Content-Type', `image/${format}`);
        sharp(req.body)
          .toFormat(`${format}`)
          .toBuffer()
          .then(data => res.send(data))
          .catch(err => res.sendStatus(500));
      }
    } else {
      next();
    }
  })
  .post('/', (req, res) => {
    console.log('route: /');
    res.set('Content-Type', `image/${req.ext}`);
    res.send(req.body);
  })
  .post('/*', (req, res) => res.sendStatus(404));

