import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 20 }, // 20 usuarios simultáneos durante 30 segundos
    { duration: '1m', target: 50 },  // Escalar a 50 usuarios durante 1 minuto
    { duration: '30s', target: 0 },  // Escalar a 0 usuarios durante 30 segundos
  ],
};

export default function () {
  let res = http.post('http://localhost:8000/login/', JSON.stringify({ email: 'test@example.com', password: 'password' }), {
    headers: { 'Content-Type': 'application/json' },
  });

  check(res, {
    'is status 200': (r) => r.status === 200,
  });

  sleep(1);
}
