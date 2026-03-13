const fs = require('fs');

const n = fs.readFileSync(0, 'utf8').trim();

for (let i = 1; i <= n; i++) {
  console.log('*'.repeat(i));
}
