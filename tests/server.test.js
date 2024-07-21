const request = require('supertest');
const http = require('http');
const app = require('../server');

let server;

beforeAll((done) => {
  console.log('Starting server...');
  server = http.createServer(app);
  server.listen(0, () => {
    global.port = process.env.PORT || 3000;
    console.log(`Server started on port ${global.port}`);
    done();
  });
}, 10000); // Increase the timeout to 10000ms (10 seconds)

afterAll((done) => {
  console.log('Stopping server...');
  server.close(() => {
    console.log('Server stopped');
    done();
  });
}); // Increase the timeout to 10000ms (10 seconds)

describe('Server', () => {
  it('should be running and respond to the GET request', async () => {
    const response = await request(`http://localhost:${global.port}`).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).not.toBe(undefined);
  });
}, 10000); // Increase the timeout to 10000ms (10 seconds)