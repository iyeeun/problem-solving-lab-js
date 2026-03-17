# 콜백 함수

### 학습 목표

- 콜백 함수의 동작을 이해한다.

## 콜백 함수란?

: 다른 함수의 argument로 전달되어, 그 함수에 의해 나중에 호출되는 함수  
단순히 함수를 넘기는 것이 아니라 아래와 같은 **제어권**을 함께 위임함

- 언제 호출할지
- 어떤 인자를 넘길지
- 어떤 this로 호출할지

> #### parameter vs. argument
>
> parameter는 함수 정의 시 사용하는 변수,  
> argument는 함수 호출 시 전달하는 실제 값이다.

### 제어권

#### 호출 시점

콜백 함수의 실행 시점은 콜백을 전달받은 함수가 결정함

```js
let count = 0;

const cbFunc = function () {
  console.log(count);
  if (++count > 4) clearInterval(timer);
};

const timer = setInterval(cbFunc, 1000); // setInterval가 1초에 한 번 cbFunc을 호출함
```

#### argument

콜백 함수에 어떤 값들을 어떤 순서로 전달할지 콜백을 전달받은 함수가 결정함

```js
[1, 2, 3].map((value, index, array) => {}); // 콜백 시그니처는 호출하는 쪽(map)에서 정의됨
```

#### this

콜백을 호출하는 방식에 따라 결정되는데,

- 일반 함수 호출 → default binding
  - non-strict: 전역 객체
  - strict mode: undefined
- 호출한 함수가 별도로 this를 지정하는 경우
  - 해당 값으로 바인딩됨

**메소드**를 콜백으로 전달하더라도 **일반 함수**로 호출됨 ([ex1.js](./ex1.js) 참고)  
따라서 this가 원래 객체를 가리키지 않을 수 있음

## 콜백 함수 내부 this에 다른 값 바인딩하기

#### [전통적인 방식의 바인딩](./ex2.js)

```js
var self = this;
console.log(self.x);
```

변수에 this를 할당하여 사용하는 방식

#### [bind 메소드 사용](./ex3.js)

```js
// cb: .... this.x .....
func(cb.bind(obj), ...);
```

bind 메소드를 활용하여 명시적으로 this를 고정

#### 화살표 함수

```js
const cb = () => console.log(this);
```

lexical this 사용 → 상위 스코프의 this 유지

## 콜백 지옥과 비동기 제어

### 콜백 지옥

: 콜백을 중첩해서 사용하는 경우 들여쓰기가 깊어지고 가독성이 떨어지는 문제

### 해결법

#### 1. 기명함수로 변환하기

함수를 분리하여 가독성 개선  
-> 흐름 파악이 어려워질 수 있음

#### 2. Promise

: 비동기 작업의 상태를 관리하는 객체  
pending → fulfilled / rejected

```js
fetchData()
  .then((result) => {})
  .catch((error) => {});
```

콜백 중첩을 줄이고 흐름을 체이닝으로 표현 가능

#### 3. Generator

`*`이 붙은 함수로 Iterator를 반환하여 `next()`를 호출하면 `yield`에서 실행을 멈춤

```js
function* gen() {
  yield 1;
}
```

async/await 이전에 비동기 흐름 제어에 활용되던 방식

#### 4. async / await

```js
async function f() {
  const result = await fetchData();
}
```

- async : 함수가 Promise 반환
- await : Promise가 resolve될 때까지 대기

→ 비동기 코드를 동기 코드처럼 표현 가능
