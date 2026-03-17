let obj = {
  vals: [1, 2, 3],
  logThis1: function () {
    console.log(this);
  },
  logThis2: () => {
    console.log(this);
  },
};

obj.logThis1(); // obj
obj.logThis2(); // lexical this : window, global, module.exports
[0].forEach(obj.logThis1); // global obj
[0].forEach(obj.logThis2); // lexical this : window, global, module.exports
