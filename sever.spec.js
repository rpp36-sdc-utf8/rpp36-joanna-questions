
const app = require('./server') // Link to your server file
const supertest = require('supertest')
const request = supertest(app)
const mongoose = require("mongoose");
const databaseName = "sdc";

describe("GET / ", () => {

  it("It should respond", async () => {
    const response = await request.get("/");
    expect(response.statusCode).toBe(200);
  });

});


describe('Get /qa/questions/:qId/answers',()=>{

  it("get responses correctly in get answers", async()=>{

    const res = await request.get('/api/qa/questions/1/answers');
    expect(res.status).toBe(200);

  })
})

describe('Get /qa/questions',()=>{

  it("get responses correctly in get questions", async()=>{

    const res = await request.get('/api/qa/questions/?product_id=1&page=1&count=2&search=');
    expect(res.status).toBe(200);

  })
})