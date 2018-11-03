const request = require('supertest');
const app = require('./index');

test('GET /', done => {
  request(app)
    .get('/')
    .expect(404)
    .end((err, res) => {
      done(err);
    });
});

test('GET /unknown', done => {
  request(app)
    .get('/unknown')
    .expect(404)
    .end((err, res) => {
      done(err);
    });
});

test('GET /1', done => {
  request(app)
    .get('/1')
    .expect(404)
    .end((err, res) => {
      done(err);
    });
});

test('POST /', done => {
  request(app)
    .post('/')
    .expect(404)
    .end((err, res) => {
      done(err);
    });
});

test('POST /unknown', done => {
  request(app)
    .post('/unknown')
    .expect(404)
    .end((err, res) => {
      done(err);
    });
});

test('POST /1', done => {
  request(app)
    .post('/1')
    .expect(404)
    .end((err, res) => {
      done(err);
    });
});
