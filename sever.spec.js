
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
    expect(res.body.results.length === 5).toBe(true);

  })
})

describe('Get /qa/questions',()=>{

  it("get responses correctly in get questions", async()=>{

    const res = await request.get('/api/qa/questions/?product_id=1&page=1&count=2&search=');
    expect(res.status).toBe(200);

  })
})

describe('Post /qa/questions',()=>{

  it("post responses correctly in post questions", async()=>{
    var data ={

      name:"hellotestname",
      body:"hellotestbody",
      email:"email@gmail.com",
      product_id:1

    }

    const res = await request.post('/api/qa/questions').send(data);
    expect(res.status).toBe(201);

  })
})

describe('POST /qa/questions/:question_id/answers without photos',()=>{

  it("get responses correctly in post answers", async()=>{
    var testId=1
    var data ={

        "name":"helltest12ame",
        "body":"hellotestbody22",
        "email":"email@gmail.com",
        "photos":[]
    }

    const res = await request.post(`/api/qa/questions/${testId}/answers`).send(data);
    expect(res.status).toBe(201);

  })
})


describe(`POST /qa/questions/:question_id/answers with photos`,()=>{

  it("get responses correctly in post answers and photos", async()=>{
    var testId=1
    var data ={

        "name":"helltestame",
        "body":"hellotestbody",
        "email":"testemail@gmail.com",
        "photos":["http:2313","http:5532"]
    }

    const res = await request.post(`/api/qa/questions/${testId}/answers`).send(data);
    expect(res.status).toBe(201);

  })
})

describe(`PUT /qa/questions/:question_id/report`,()=>{

  it("get responses correctly in put question report", async()=>{
    var testId=1
    const res = await request.put(`/api/qa/questions/${testId}/report`);
    expect(res.status).toBe(204);

  })
})

describe(`PUT /qa/questions/:question_id/helpful`,()=>{

  it("get responses correctly in put question helpful", async()=>{
    var testId=1
    const res = await request.put(`/api/qa/questions/${testId}/helpful`);
    expect(res.status).toBe(204);

  })
})
describe('PUT /qa/answers/:answer_id/report',()=>{

  it("get responses correctly in put answer report", async()=>{
    var testId=1
    const res = await request.put(`/api/qa/answers/${testId}/helpful`);
    expect(res.status).toBe(204);

  })
})

describe(`PUT /qa/answers/:answer_id/helpful`,()=>{

  it("get responses correctly in put answer helpful", async()=>{
    var testId=1
    const res = await request.put(`/api/qa/answers/${testId}/helpful`);
    expect(res.status).toBe(204);

  })
})