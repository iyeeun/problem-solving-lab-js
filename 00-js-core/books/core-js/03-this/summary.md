# this

### 학습 목표

- this가 어떤 기준으로 바인딩되는지 이해

## 전역 공간에서의 this

: 전역 객체를 가리킴

- 브라우저 : `window`
- Node.js : `global`
- 표준 : `globalThis` (환경에 관계없이 전역 객체에 접근할 수 있는 표준 API)

> Node.js REPL (CLI)에서는 `this === global`이 맞지만 파일을 실행하면 다른 결과가 나온다.  
> 이는 Node.js에서 파일이 전역에서 바로 실행되는 것이 아니라  
> CommonJS 모듈 래퍼 함수로 감싸지기 때문이다.
>
> Node.js는 내부적으로 파일을 다음과 같은 형태로 실행한다.
>
> ```js
> (function (exports, require, module, __filename, __dirname) {
>   // file code
> });
> ```
>
> 이 때문에 파일의 top-level `this`는 `global`이 아니라 `module.exports`를 가리킨다.
>
> 또한 ESM(ES Module) 환경에서는 top-level `this`가 `undefined`이다.  
> ESM은 기본적으로 strict mode에서 실행되며, 모듈이 전역 객체에 의존하지 않도록 하기 위해 top-level `this`가 `undefined`로 정의되어 있다.

### var로 선언한 전역 변수

(브라우저 환경) 전역 객체의 프로퍼티로 생성되며 `configurable: false` 옵션으로 정의됨

- `configurable`이 `false`라는 것은 `delete`로 삭제할 수 없음을 의미함
- 직접 전역 객체에 할당한 프로퍼티는 삭제 가능함 (`configurable: true`)

```js
var a = 1;
window.b = 2;

console.log(a, window.a, this.a); // 1 1 1
console.log(b, window.b, this.b); // 2 2 2

delete a; // false -> 여전히 1
delete b; // true -> b 사용하면 ReferenceError
```

### let/const로 선언한 전역 변수

var와 다르게 전역 객체의 프로퍼티로 생성되지 않음  
대신 Global Execution Context의 DeclarativeEnvironmentRecord에 직접 바인딩됨

```js
var a = 1;
let b = 2;

console.log(window.a); // 1
console.log(window.b); // undefined
```

#### Global Environment Record

전역 실행 컨텍스트에는 Global Environment Record가 존재

```
GlobalEnvironmentRecord
 ├─ ObjectEnvironmentRecord : 전역 객체와 연결 / var, function 선언
 └─ DeclarativeEnvironmentRecord : lexical binding / let, const, class
```

> Lexical Binding : 변수가 객체 프로퍼티가 아니라 스코프 환경(Environment Record)에 직접 바인딩되는 것

## this 바인딩 규칙 (this binding rule)

this는 함수가 어디서 선언되었는지가 아니라 함수가 어떻게 호출되었는지에 의해 결정됨

우선순위

1. new binding
2. explicit binding (call / apply / bind)
3. implicit binding (obj.method())
4. default binding

화살표 함수는 위 규칙을 따르지 않고 lexical this 사용

### 함수/메소드의 this

#### 함수 vs 메소드

- 함수 : 독립적으로 실행되는 함수
- 메소드 : 객체의 프로퍼티로 호출되는 함수 (implicit binding 발생)

JavaScript에서는 호출 방식에 따라 this 바인딩이 달라짐

#### 메소드 내부에서의 this (Implicit Binding)

this는 호출한 객체임

```js
const obj = {
  x: 10,
  getX() {
    return this.x;
  },
};

obj.getX(); // 10, this === obj
```

#### 함수 내부에서의 this (Default Binding)

일반 함수로 호출되면 this는 전역 객체 or undefined

| 모드       | this      |
| ---------- | --------- |
| non-strict | 전역 객체 |
| strict     | undefined |

```js
function f() {
  console.log(this);
}

f(); // global object or undefined
```

### 생성자 함수에서의 this (New Binding)

`new`로 호출되면 this는 새로 생성되는 인스턴스

```js
function Person(name) {
  this.name = name;
}

const p = new Person('A');
```

동작 과정

```
1. 빈 객체 생성
2. this → 해당 객체 바인딩
3. constructor 실행
4. 객체 반환 (명시적으로 객체를 반환하면 그 객체 반환)
```

## 명시적인 this 바인딩

### 메소드

#### call 메소드

```js
Function.prototype.call(thisArg, ...args);
fn.call(obj, 1, 2);
```

함수를 즉시 실행하면서 this를 지정  
이때 첫 번째 인자를 this로 바인딩하고 나머지는 함수의 파라미터로 사용함

#### apply 메소드

```js
Function.prototype.apply(thisArg, argsArray);
fn.apply(obj, [1, 2]);
```

함수를 즉시 실행하면서 this를 지정  
이때 첫 번째 인자를 this로 바인딩하고 두 번째 인자는 배열로 받아 파라미터로 사용함

#### bind 메소드

```js
Function.prototype.bind(thisArg, ...args);
const boundFn = fn.bind(obj);
```

첫 번째 인자를 this로 바인딩하고 나머지는 함수의 파라미터로 사용하여 **새로운 함수를 반환**함  
name 프로퍼티에 `bound`가 붙는다는 특징이 있음

## 화살표 함수

화살표 함수는 자체적인 this 바인딩을 가지지 않고 상위 스코프의 this를 그대로 사용함  
→ Lexical This

```js
const obj = {
  x: 10,
  f() {
    const g = () => console.log(this.x);
    g();
  },
};

obj.f(); // 10
```

## 콜백 함수에서의 this

콜백을 호출하는 주체에 의해 결정됨
일부 메소드는 `thisArg`를 지정할 수 있는 경우가 있음

```js
setTimeout(fn); // this → host environment가 결정 (browser: window, Node: Timeout object)
array.map(fn, thisArg); // this → thisArg
button.onclick = fn; // this → element
```
