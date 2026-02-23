const fs = require('fs');

const [str, n] = fs.readFileSync(0, 'utf8').trim().split(' ');

console.log(str.repeat(n));
