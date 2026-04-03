# 클로저

### 학습 목표

- 클로저의 의미를 이해한다.
- 클로저를 활용하는 방법을 알아본다.

## 클로저의 의미

: 함수와 그 함수가 선언될 당시의 Lexical Environment의 상호관계에 따른 현상 (by MDN)  
함수가 선언될 당시의 Lexical Environment를 기억하여 이후에도 그 환경에 접근할 수 있는 현상

- 모든 내부함수가 외부의 LexicalEnvironment를 항상 사용하는 것은 아님
- 내부함수에서 외부 스코프의 변수를 참조하는 경우에만 발생함

### 외부 함수의 변수를 참조하는 내부 함수 예시

```js
const outer = function () {
  let a = 1;
  const inner = function () {
    console.log(++a); // 2
  };
  inner();
};

outer();
```

- inner 함수는 자신의 스코프에 a가 없기 때문에  
  outer의 Lexical Environment에 있는 a를 참조함 → 2 출력
- 이때는 스코프 체인의 동작임

### 클로저가 발생하는 상황

```js
const outer = function () {
  let a = 1;
  const inner = function () {
    return ++a;
  };
  return inner;
};

const outer2 = outer();
console.log(outer2()); // 2
console.log(outer2()); // 3
```

- inner 함수는 outer의 Lexical Environment를 참조하고 있음
- 따라서 outer의 실행이 끝났는데도 해당 환경은 GC 대상이 되지 않음
- outer2로 outer -> inner 함수를 호출할 때마다 해당 환경을 호출하여 a의 값이 계속 커지고 출력됨

### 다시 정리하는 클로저의 의미

: 어떤 함수(A)에서 선언한 변수(a)를 참조하는 내부함수(B)를 외부로 전달할 경우,  
A의 실행 컨텍스트가 **종료된 이후에도 변수 a에 접근할 수 있는 현상**

#### `외부로 전달`한다는 것의 의미

- 외부로 전달이 꼭 return을 의미하는 것은 아님
  - 콜백함수에서 지역 변수를 참조하는 것 등이 포함됨

## 클로저와 메모리 관리

클로저가 발생하면 GC의 수거 대상이 되지 않으므로 메모리 관리가 필요함  
→ 더이상 필요하지 않게 되면 해당 클로저에 대한 참조를 끊어주면 됨  
ex. 변수를 null이나 undefined로 재할당하여 기존 참조를 제거

## 클로저의 활용

### 1. 콜백 함수 내부에서 외부 데이터를 사용

```js
var fruits = ['apple', 'banana', 'peach'];
var $ul = document.createElement('ul');

var alertFruitBuilder = function (fruit) {
  return function () {
    alert('your choice is ' + fruit);
  };
};
fruits.forEach(function (fruit) {
  var $li = document.createElement('li');
  $li.innerText = fruit;
  $li.addEventListener('click', alertFruitBuilder(fruit));
  $ul.appendChild($li);
});
document.body.appendChild($ul);
```

- alertFruitBuilder는 내부 함수를 생성하고, 그 함수가 fruit를 기억함
- 이 함수는 이벤트가 발생한 이후에도 실행되므로, 실행 시점에는 forEach가 이미 종료된 상태지만,  
  클로저가 fruit를 계속 참조하고 있기 때문에 fruit 값을 사용할 수 있음

### 2. 정보 은닉

ES2019 이전에는 private 변수가 존재하지 않았음  
그때 클로저를 이용하면 외부에서 접근 불가능한 변수를 만들 수 있었음

```js
function Person(name) {
  let _name = name; // Person 함수 외부에서 접근 불가

  return {
    getName: function () {
      return _name;
    },
    setName: function (newName) {
      _name = newName;
    },
  };
}

const p = Person('yeeun');
console.log(p.getName()); // 'yeeun'
console.log(p._name); // undefined
```

- 함수에서 지역 변수와 내부 함수를 생성하고,  
  그 중 외부에 권한을 주는 대상들로 참조형 데이터(객체/배열/함수)를 만들어서 return함
  - return 된 변수만 공개가 됨
- \_name은 Person 함수 내부의 지역 변수이므로 외부에서 직접 접근할 수 없음
- 하지만 getName, setName 함수는 \_name을 참조하고 있음
- 이 함수들이 외부로 반환되면서 클로저가 형성됨
- 따라서 외부에서는 직접 접근은 불가능하지만,
  클로저를 통해 간접적으로만 접근할 수 있음

### 3. 부분 적용 함수 (Partially Applied Function)

: n개의 인자를 받는 함수에 미리 m개의 인자를 넘겨 기억시켰다가  
나중에 (n - m) 개의 인자를 받으면 원래 함수의 결과를 얻게 하는 함수

```js
var partial = function (func) {
  var partialArgs = Array.prototype.slice.call(arguments, 1);

  return function () {
    var restArgs = Array.prototype.slice.call(arguments);
    return func.apply(this, partialArgs.concat(restArgs));
  };
};
```

- partial 함수는 처음 호출될 때 전달받은 인자들을 클로저로 저장함
- 이후 반환된 함수가 실행될 때,
  기존에 저장된 인자와 새로 전달된 인자를 합쳐서 원래 함수를 실행함
- 즉, 클로저를 통해 “이전 인자 상태를 기억”하고 있는 구조임

디바운스 예시

```js
var debounce = function (eventName, func, wait) {
  var timeoutId = null;
  return function (event) {
    var self = this;
    console.log(eventName, 'event 발생');
    clearTimeout(timeoutId);
    timeoutId = setTimeout(func.bind(self, event), wait);
  };
};

var moveHandler = function (e) {
  console.log('move event 처리');
};
var wheelHandler = function (e) {
  console.log('wheel event 처리');
};
document.body.addEventListener('mousemove', debounce('move', moveHandler, 500));
document.body.addEventListener(
  'mousewheel',
  debounce('wheel', wheelHandler, 700),
);
```

- debounce 함수는 timeoutId를 내부 변수로 가지고 있음
- 반환된 함수는 timeoutId를 계속 참조하는 클로저가 됨
- 따라서 이벤트가 여러 번 발생하더라도 이전 timeoutId를 기억하고 clearTimeout을 수행할 수 있음

### 4. 커링 함수 (Currying Function)

: 여러 개의 인자를 받는 함수를 하나의 인자만 받는 함수로 나눠서 순차적으로 호출될 수 있도록 체인 형태로 구성한 것

```js
var curry = (func) => (a) => (b) => (c) => (d) => (e) => func(a, b, c, d, e);
const getMax = curry(Math.max);
const getMax3 = getMax(1)(2)(3); // 미리 지정
console.log(getMax(1)(2)(3)(4)(5)); // 5
console.log(getMax3(10)(9)); // 10
```

- 각 단계에서 반환되는 함수는 이전에 전달된 인자를 클로저로 기억함
- 따라서 마지막에 모든 인자가 모이면,
  이전 값들을 모두 참조하여 최종 결과를 계산함
