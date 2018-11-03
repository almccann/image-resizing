const request = require('supertest');
const path = require('path');
const app = require('../../index');

test('POST /image/request.jpeg Content-Type mismatch', done => {
  request(app)
    .post('image/request.jpeg')
    .set('Content-Type', 'image/png')
    .send(path.resolve('mocks/request.jpeg'))
    .expect(404)
    .end((err, res) => {
      done(err);
    });
});

test('POST /image/file.ext', done => {
  request(app)
    .post('/image/request.jpeg')
    .set('Content-Type', 'image/jpeg')
    .send(path.resolve('mocks/request.jpeg'))
    .expect('Content-Type', 'image/jpeg')
    .expect(200)
    .end((err, res) => {
      done(err);
    });
  request(app)
    .post('/image/request.png')
    .set('Content-Type', 'image/png')
    .send(path.resolve('mocks/request.png'))
    .expect('Content-Type', 'image/png')
    .expect(200)
    .end((err, res) => {
      done(err);
    });
  request(app)
    .post('/image/request.webp')
    .set('Content-Type', 'image/webp')
    .send(path.resolve('mocks/request.webp'))
    .expect('Content-Type', 'image/webp')
    .expect(200)
    .end((err, res) => {
      done(err);
    });
});
