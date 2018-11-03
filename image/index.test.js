const request = require('supertest');
const app = require('../index');

test('GET /image - GET request', done => {
  request(app)
    .get('/image')
    .expect(404)
    .end((err, res) => {
      done(err);
    });
});

