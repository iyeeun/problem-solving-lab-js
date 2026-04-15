# 클래스

### 학습 목표

- 자바스크립트에서 클래스가 어떻게 동작되는지 이해한다

## 클래스와 인스턴스

- 클래스: 공통 요소를 지니는 집단을 분류하기 위한 개념  
  클래스는 하위로 갈수록 상위 클래스의 속성을 상속하면서 더 구체적인 요건이 추가됨
- 인스턴스: 클래스의 조건을 만족하는 구체적인 예시

### 자바스크립트의 클래스

생성자 함수를 `new` 연산자로 호출하면 인스턴스가 생성되는데,  
해당 인스턴스는 생성자 함수의 `prototype` 객체를 `[[Prototype]]`으로 참조하기 때문에  
생성자 함수의 `prototype` 객체가 인스턴스에 상속된 것처럼 동작한다고 볼 수 있음

인스턴스 참조 여부에 따라 static member와 instance(prototype) member로 나뉨  
static member는 생성자 함수(클래스)에 직접 정의되며,  
인스턴스에서는 접근할 수 없고 클래스 이름으로만 접근 가능함 ([ex1.js 참고](./ex1.js))

## 클래스 상속

### ES5에서의 클래스 상속

#### prototype을 직접 조작하는 방법

```js
var Grade = function () {
  var args = Array.prototype.slice.call(arguments);
  for (var i = 0; i < args.length; i++) {
    this[i] = args[i];
  }
  this.length = args.length;
};
Grade.prototype = [];
var g = new Grade(100, 80);
```

Grade는 arguments를 이용해 array-like object를 만들고,  
prototype에 배열 인스턴스를 연결해서 배열 메서드를 사용할 수 있게 함  
그러나 이 방식은 아래와 같은 문제가 있음

- length 프로퍼티가 삭제 가능하고 (configurable)
- prototype에 빈 배열을 참조시켜 해당 배열의 상태가 인스턴스 동작에 영향을 줌
- Array의 내부 동작(`[[DefineOwnProperty]]` 등)이 적용되지 않아 인덱스와 length가 자동으로 동기화되지 않음

#### 생성자 함수에서 다른 생성자 함수를 이용하는 방법

```js
var Rectangle = function (width, height) {
  this.width = width;
  this.height = height;
};
Rectangle.prototype.getArea = function () {
  return this.width * this.height;
};
var rect = new Rectangle(3, 4);
console.log(rect.getArea()); // 12

var Square = function (width) {
  Rectangle.call(this, width, width);
};
Square.prototype = new Rectangle();

var sq = new Square(5);
console.log(sq.getArea()); // 25
```

이러한 방식도 불필요하게 부모 인스턴스를 생성하며,  
prototype에 부모의 인스턴스 프로퍼티까지 포함되는 문제가 있음  
또한 부모 생성자가 실행되면서 불필요한 초기화가 발생함

#### 상속 및 추상화 구현

- prototype의 데이터를 지우고
- SubClass의 인스턴스에 constructor 복구

1. SubClass의 prototype의 프로퍼티를 지우고 메소드 추가하기

```js
var extendClass1 = function (SuperClass, SubClass, subMethods) {
  SubClass.prototype = new SuperClass();
  for (var prop in SubClass.prototype) {
    if (SubClass.prototype.hasOwnProperty(prop)) {
      delete SubClass.prototype[prop];
    }
  }
  SubClass.prototype.constructor = SubClass;
  if (subMethods) {
    for (var method in subMethods) {
      SubClass.prototype[method] = subMethods[method];
    }
  }
  Object.freeze(SubClass.prototype);
  return SubClass;
};
```

비효율적인 방식으로 실제로는 잘 사용되지 않음

2. Bridge 이용하기

```js
var extendClass2 = (function () {
  var Bridge = function () {};
  return function (SuperClass, SubClass, subMethods) {
    Bridge.prototype = SuperClass.prototype;
    SubClass.prototype = new Bridge();
    SubClass.prototype.constructor = SubClass;
    if (subMethods) {
      for (var method in subMethods) {
        SubClass.prototype[method] = subMethods[method];
      }
    }
    Object.freeze(SubClass.prototype);
    return SubClass;
  };
})();
```

3. `Object.create()` 활용하기

```js
var extendClass3 = function (SuperClass, SubClass, subMethods) {
  SubClass.prototype = Object.create(SuperClass.prototype);
  SubClass.prototype.constructor = SubClass;
  if (subMethods) {
    for (var method in subMethods) {
      SubClass.prototype[method] = subMethods[method];
    }
  }
  Object.freeze(SubClass.prototype);
  return SubClass;
};
```

#### `super` 메소드 추가

자세한 사용법은 [ex2](./ex2.js) 참고

```js
SubClass.prototype.super = function (propName) {
  var self = this;
  if (!propName)
    return function () {
      SuperClass.apply(self, arguments);
    };
  var prop = SuperClass.prototype[propName];
  if (typeof prop !== 'function') return prop;
  return function () {
    return prop.apply(self, arguments);
  };
};
```

해당 super 구현은 클로저를 통해 SuperClass를 참조해야 안정적으로 동작함

### ES6에서의 클래스 상속

```js
// ES5의 클래스
var ES5 = function (name) {
  this.name = name;
};
ES5.staticMethod = function () {
  return this.name + ' staticMethod';
};
ES5.prototype.method = function () {
  return this.name + ' method';
};
var es5Instance = new ES5('es5');
console.log(ES5.staticMethod()); // es5 staticMethod
console.log(es5Instance.method()); // es5 method

// ES6의 클래스
var ES6 = class {
  constructor(name) {
    this.name = name;
  }
  static staticMethod() {
    return this.name + ' staticMethod';
  }
  method() {
    return this.name + ' method';
  }
};
var es6Instance = new ES6('es6');
console.log(ES6.staticMethod());
console.log(es6Instance.method());

// ES6의 상속
var Rectangle = class {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  getArea() {
    return this.width * this.height;
  }
};

var Square = class extends Rectangle {
  constructor(width) {
    super(width, width);
  }
  getArea() {
    console.log('size is :', super.getArea());
  }
};
```

- class에서는 function 키워드 없이 메소드 정의
- `constructor`: 생성자 함수
- `static` 키워드로 static 메소드라는 것을 알림
- 메소드는 프로토타입 체이닝을 통해 인스턴스가 자신의 메소드인 것처럼 호출할 수 있음
- `extends` 키워드로 상속 관계를 설정함
- `super` 키워드를 constructor 내부에서 함수처럼 사용하여 SuperClass의 constructor를 실행할 수 있음
- constructor가 아닌 메소드에서는 `super`로 SuperClass.prototype을 참조함 (this는 인스턴스)
- ES6의 extends는 내부적으로 `[[Prototype]]`과 `[[Constructor]]` 연결을 모두 처리함
