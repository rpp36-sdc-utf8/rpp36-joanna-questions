
const app = require("./server");
const supertest = require("supertest");
const request = supertest(app);
const {MongoClient} = require('mongodb');

describe("GET / ", () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect('mongodb://localhost:27017/sdc', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db(globalThis.sdc);


  })
  afterAll(async () => {
    await connection.close();
  });

  it("It should respond", async (done) => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    done()
  });
  it("get responses correctly in get questions", async (done)=>{

    const res = await request(app)
    .get('/qa/questions/1/answers');
    expect(res.statusCode).toBe(200);
    done()
    })

});


// describe('Get /qa/questions',()=>{
//   test("get responses correctly in get questions", async ()=>{

//   const res = await request(app).get('/qa/questions');
//   expect(res.statusCode).tobe(200);


//   // expect(res.body[0]).toHaveProperty('title');
//   // expect(res.body[0].title).toBe('Alternate Endings for Game of Thrones, Season 8');

//   // expect(res.body[0]).toHaveProperty('author');
//   // expect(res.body[0].author).toBe('Literally Anyone');

//   // expect(res.body[0]).toHaveProperty('publisher');
//   // expect(res.body[0].publisher).toBe('Not George R. R. Martin');
//   })
// })
