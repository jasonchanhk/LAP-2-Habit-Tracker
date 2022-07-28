describe('habits endpoints', () => {
  const app = require('../../app');
  const request = require('supertest');
  const jwt = require('jsonwebtoken');
  const { promisify } = require('util');
  let api;
  //   let token = '';

  // beforeEach(async () => {
  //   await resetTestDB();
  // });

  beforeAll(async () => {
    api = app.listen(8000, () =>
      console.log('Test server running on port 8000')
    );
  });

  afterAll(async () => {
    console.log('Gracefully stopping test server');
    await api.close();
  });

  //   it('should return a list of all habits in database', async () => {
  //     const res = await request(api).get('/all');
  //   });
  it('responds to get / with status 200', (done) => {
    request(api).get('/habits').expect(200, done);
  });
});
