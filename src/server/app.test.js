const request = require("supertest");
const app = require("./app");


// please remove the comments in the lines(7-9) code in(app.js) when test it 
describe("Test the root path", () => {
  test("It should response the GET method", done => {
    request(app)
      .get("/")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});