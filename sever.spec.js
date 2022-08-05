const request = require('supertest');
const app = require("./index");

describe("GET / ", () => {
  test("It should respond", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });
});
