const fs = require('fs');

const [a, b] = fs.readFileSync(0, 'utf8').trim().split(' ');

console.log(a, '+', b, '=', Number(a) + Number(b));
