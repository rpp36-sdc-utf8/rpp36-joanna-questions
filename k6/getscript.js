import { sleep, check} from 'k6'
import http from 'k6/http'

// See https://k6.io/docs/using-k6/options
export const options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 1000, // 1 iterations per 'timeUnit'.
      timeUnit: '1s',
      duration: '70s',
      preAllocatedVUs: 100,
      maxVUs: 1000,
      gracefulStop: '1m',
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 2%
    http_req_duration: ['p(95)<2000'], // 95% requests should be below 2s
  },
}

export default function main() {
  var productId = Math.floor(Math.random() * 9)+1

  let res = http.get(http.url`http://localhost:2010/api/qa/questions?product_id=${productId}`)

  check(res, {
    'is status 200': (r) => {
      if(r.status !==200){
        console.log("res"+productId)

      }
      return r.status === 200;
    },
  });
}