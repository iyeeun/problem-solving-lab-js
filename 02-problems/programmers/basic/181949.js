const fs = require('fs');

const str = fs.readFileSync(0, 'utf8').trim();

let answer = '';

for (const c of str) {
  if (c === c.toUpperCase()) {
    answer += c.toLowerCase();
  } else {
    answer += c.toUpperCase();
  }
}

console.log(answer);
