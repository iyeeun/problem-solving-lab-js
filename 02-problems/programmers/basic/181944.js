const fs = require('fs');

const n = fs.readFileSync(0, 'utf8').trim();

if (Number(n) % 2 === 0) {
  console.log(n + ' is even');
} else {
  console.log(n + ' is odd');
}
