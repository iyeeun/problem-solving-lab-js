var obj1 = {
  name: 'obj1',
  func: function () {
    var self = this;
    return function () {
      console.log(self.name);
    };
  },
};

var obj2 = {
  name: 'obj2',
  func: obj1.func,
};

var obj3 = { name: 'obj3' };

setTimeout(obj1.func(), 1000);
setTimeout(obj2.func(), 2000);
setTimeout(obj1.func.call(obj3), 3000);
