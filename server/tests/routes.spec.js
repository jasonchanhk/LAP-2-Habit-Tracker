/**
 * @jest-environment jsdom
 */

const request = require('supertest');
const server = require('../app');

// let testData = {
//   message: 'Is twitter better than facebok?',
//   comments: [{ comment: 'yes it is' }],
//   react: [{ like: 1 }, { dislike: 0 }, { heart: 0 }],
// };

describe('API server', () => {
  let api;

  beforeAll(() => {
    api = server.listen(5000, () =>
      console.log('Server online at http://localhost:5000')
    );
  });

  afterAll((done) => {
    console.log('Gracefully stopping test server');
    api.close(done);
  });

  it('responds to get / with status 200', (done) => {
    request(api).get('/').expect(200, done);
  });
});
