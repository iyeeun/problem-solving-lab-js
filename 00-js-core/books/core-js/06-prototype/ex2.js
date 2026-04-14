const Person = function (name) {
  this._name = name;
};

Person.prototype.getName = function () {
  return this._name;
};

const yeeun = new Person('yeeun');
console.log(yeeun.getName()); // yeeun

/*
yeeun.getName()
=> getName을 yeeun에서 찾고 없으면 prototype에서 찾음
=> this는 yeeun이 되어 제대로 출력됨
*/
