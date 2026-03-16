# Chapter 03. this

## 요약

- [요약 바로가기](./summary.md)

## Deep Dive

### 1. 핵심 질문

> 이 장은 결국 무엇을 설명하려는가?

- this 바인딩의 규칙
- 함수 호출 방식에 따라 this가 어떻게 결정되는지
- 명시적 this 바인딩 방법

### 2. 한 줄 요약

> 이 장의 핵심을 한 문장으로 말하면?

- this는 함수가 어떻게 호출되었는지에 따라 달라진다.

### 3. 개념 구조 정리

#### 📚 핵심 개념

- this
- this binding rule
- implicit binding
- default binding
- explicit binding
- new binding
- lexical this

#### 🔗 개념 연결 구조

this  
=> this binding rule : 함수가 호출되는 위치에 따라 달라진다  
=>

1. new binding : 생성자에서 this는 새로 생성한 인스턴스
2. explicit binding : call / apply / bind -> argument로 받은 것
3. implicit binding : 매소드로 호출할 때 해당 객체를 this로
4. default binding : 일반 함수 호출할 때 this는 전역 객체, strict mode는 undefined

=> 하지만 예외로 화살표 함수는 this binding을 하지 않고 상위 스코프의 this를 사용한다

### 4. 나의 언어로 설명해보기

this는 현재 실행 중인 컨텍스트의 대상 객체를 가리키는 값이다.  
this는 함수 호출 시점에 결정된다.  
this 바인딩 규칙은 new -> explicit -> implicit -> default의 우선순위를 가진다.  
new는 constructor에서 사용되는 this로 이것은 새로 만들어진 인스턴스를 가리킨다.  
explicit는 call, apply, bind 등의 함수를 통해 직접적으로 argument를 통해 this를 명시해주는 경우를 말한다.  
implicit binding은 객체의 프로퍼티로 함수를 실행할 때이며, 이때는 호출의 주체가 되는 객체가 this가 된다.  
default binding은 일반 함수를 호출하는 경우이며 이때는 전역 객체 (strict mode이면 undefined)가 된다.  
화살표 함수의 경우에는 this binding을 하지 않으며 상위 스코프의 this를 사용한다.  
이를 lexical this라고 한다.

### 5. 헷갈렸던 부분 / 오해했던 부분

#### ❓ 처음에 이해 안 됐던 점

- this가 뭔지 이해하지 못했다.
- 객체 안에 있는 함수면 this -> 객체라고 생각했다.

#### 💡 지금은 이렇게 이해했다

- this는 현재 실행 중인 컨텍스트의 대상 객체를 가리킨다.
- 객체 안에 있어도 어떻게 호출되는지에 따라 this가 달라진다.

### 6. 코드로 확인하기

#### 1. 메소드 → 함수 참조

```js
const obj = {
  x: 10,
  f() {
    return this.x;
  },
};

const g = obj.f;
console.log(g());
```

- 결과 : undefined
- 이유 : `g()`로 호출하였기 때문에 default binding이 발생

#### 2. 화살표 함수 lexical this

```js
const obj = {
  x: 10,
  f() {
    const g = () => console.log(this.x);
    g();
  },
};

obj.f();
```

- 결과 : 10
- 이유 : implicit binding 이고, g는 화살표 함수로 f의 this를 사용하기 때문에 this가 obj가 되어 10이 됨

#### 3. 객체 내부 화살표 함수

```js
const obj = {
  x: 10,
  f: () => {
    console.log(this.x);
  },
};

obj.f();
```

- 결과 : undefined
- 이유 : f는 화살표 함수, arrow function은 this binding을 하지 않기 때문에 상위 스코프의 this (정의된 위치, global)를 사용함

#### 4. arrow function 반환

```js
const obj = {
  x: 10,
  f() {
    return () => console.log(this.x);
  },
};

const g = obj.f();
g();
```

- 결과 : 10
- 이유 : implicit binding으로 this는 obj, 화살표 함수로 this 유지되어 obj.x가 됨

#### 5. call로 this 변경

```js
const obj = {
  x: 10,
  f() {
    const g = this.f;
    g.call(obj);
  },
};

obj.f();
```

- 결과 : stack overflow
- 이유 : implicit binding -> g는 obj.f -> obj.f가 call을 통해서 계속 반복됨

### 7. 실무 연결 포인트 💼

#### 🔎 이 개념이 실제로 왜 중요한가?

실무에서는 다음 상황에서 `this` 문제가 자주 발생한다.

- 이벤트 핸들러
- 콜백 함수
- React class component
- setTimeout / Promise callback

#### 🛠 앞으로 코드 작성 시 적용할 점

- 콜백으로 메소드를 넘길 때는 this가 깨질 수 있다.
- 필요하면 명시적으로 바인딩한다.
- 화살표 함수를 이용하면 lexical this를 유지할 수 있다.

### 8. 면접 대비용 정리

#### ❓ 예상 질문

1. JavaScript에서 this는 언제 결정되나요?

- JS에서 this는 함수 선언 시점이 아니라 함수 호출 시점에 결정됩니다.

2. this binding rule을 설명해주세요.

- this binding rule은 this binding이 발생하는 우선순위를 정의합니다.  
  먼저, new binding이 가장 우선순위가 높습니다. new binding은 constructor를 생성하는 경우를 의미하고, 이 때 this는 새로 생성한 인스턴스가 됩니다. 그 다음으로는 explicit binding인데, call/apply/bind와 같은 함수를 통해 명시적으로 this를 파라미터로 주는 경우를 말합니다. 이때는 넘겨준 인자가 this가 됩니다. 그 다음으로는 implicit binding인데, 메소드를 호출할 때 발생합니다. 메소드의 호출 주체인 객체가 this가 되고, 마지막으로 default binding은 일반 함수를 호출할 때 발생합니다. 이 때 this는 strict mode인 경우에는 undefined지만, 일반적으로는 window나 global 같은 전역 객체를 가리키게 됩니다.

3. 화살표 함수의 this는 어떻게 동작하나요?

- 화살표 함수는 this binding을 하지 않기 때문에 상위 스코프의 this를 유지합니다. 즉, 함수 선언 시점의 this를 사용합니다.

## 최종 인사이트

JavaScript의 `this`는 단순히 객체를 가리키는 키워드가 아니라,  
실행 컨텍스트에서 호출 방식에 따라 결정되는 값이다.
