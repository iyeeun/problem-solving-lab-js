const fs = require('fs');

const str = fs.readFileSync(0, 'utf8').trim();

[...str].forEach((c) => console.log(c));
