const fs = require('fs');

const words = fs.readFileSync(0, 'utf8').trim().split(' ');

console.log(words.join(''));
