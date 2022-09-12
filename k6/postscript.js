import { sleep, check} from 'k6'
import http from 'k6/http'

// See https://k6.io/docs/using-k6/options
export const options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 1000, // 1 iterations per 'timeUnit'.
      timeUnit: '1s',
      duration: '60s',
      preAllocatedVUs: 100,
      maxVUs: 1000,
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 2%
    http_req_duration: ['p(95)<2000'], // 95% requests should be below 2s
  },
}

export default function main() {

  var body= (Math.random() + 1).toString(36).substring(7);
  var name = body+'testname';
  var email = name+'test@gmail.com';
  // var product_id = Math.floor(Math.random() * 1000)+1;
  var data ={
    body:body,
    name:name,
    email:email,
    product_id:1,
  }


  let res = http.post('http://localhost:2010/api/qa/questions', JSON.stringify(data),{
    headers: { 'Content-Type': 'application/json' },
  })

  check(res, {
    'is status 201': (r) => {
      if(r.status !==201){
        console.log("res"+r)

      }
      return r.status === 201;
    },
  });
}