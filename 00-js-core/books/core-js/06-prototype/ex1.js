const Person = function (name) {
  this._name = name;
};

Person.prototype.getName = function () {
  return this._name;
};

const yeeun = new Person('yeeun');
console.log(yeeun.__proto__.getName()); // undefined

/*
yeeun.__proto__.getName()
=> Person.prototype.getName()
=> 호출의 주체 Person.prototype이 this가 됨
=> Person.prototype에는 _name이 없음
=> undefined
*/
