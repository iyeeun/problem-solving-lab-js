# Chapter 07. 클래스

## 요약

- [요약 바로가기](./summary.md)

## Deep Dive

### 1. 핵심 질문

> 이 장은 결국 무엇을 설명하려는가?

- 자바스크립트에서 클래스는 어떻게 동작하는지
- 프로토타입 기반 상속이 어떻게 객체 지향처럼 보이게 하는지

### 2. 한 줄 요약

> 이 장의 핵심을 한 문장으로 말하면?

- 자바스크립트의 클래스는 문법적 설탕일 뿐이며, 실제 동작은 프로토타입 체이닝 기반 상속 구조이다

### 3. 개념 구조 정리

#### 📚 핵심 개념

- 클래스와 인스턴스
- static vs instance(prototype) member
- ES5 상속 패턴
- ES6 class / extends / super

#### 🔗 개념 연결 구조

- 클래스: 공통 요소를 갖는 집단을 분류하기 위한 개념
- 인스턴스: 클래스의 조건을 만족하는 구체적인 예시
- 생성자 함수 (or class)를 통해 인스턴스가 생성됨
  - 이 때 `[[Prototype]]`은 생성자 함수의 `prototype` 참조
- instance(prototype) member: prototype에 정의되어 인스턴스가 프로토타입 체이닝으로 접근
- static member: 생성자 함수 (클래스)에 직접 정의됨
- ES5 상속 패턴: 부모 생성자를 호출하여 인스턴스를 초기화하고,  
  `Object.create()`를 통해 prototype 체인을 연결한 뒤 constructor를 복구
- ES6에서는 class로 생성자 + prototype 정의를 통합하고,  
  extends를 통해 prototype 체인을 자동으로 연결하며,  
  super를 통해 부모 constructor 및 메소드에 접근할 수 있음

### 4. 나의 언어로 설명해보기

클래스는 여러 인스턴스를 생성하기 위한 구조이며,  
인스턴스의 상태는 개별적으로 저장하고,  
공통 동작은 prototype에 정의하여 모든 인스턴스가 프로토타입 체이닝을 통해 공유하도록 한다.  
인스턴스는 생성자 함수의 `prototype`을 `[[Prototype]]`으로 참조하며,
이 연결을 통해 마치 상속처럼 동작한다.  
ES5에서는 이 구조를 직접 구현해야 했지만, ES6에서는 class, extends, super 문법을 통해 이를 더 직관적으로 표현할 수 있다.  
하지만 내부적으로는 여전히 프로토타입 체이닝을 기반으로 동작한다.

### 5. 헷갈렸던 부분 / 오해했던 부분

#### ❓ 처음에 이해 안 됐던 점

- prototype이 상속된다는 게 실제로 어떻게 동작하는지 이해가 어려웠음

#### 💡 지금은 이렇게 이해했다

- 상속은 실제로 복사가 아니라 `[[Prototype]]` 링크를 통한 참조 구조임

### 6. 코드로 확인하기

```js
function Parent() {}
Parent.prototype.say = function () {
  return 'hello';
};

function Child() {}
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

var c = new Child();

console.log(c.say()); // hello
console.log(Object.getPrototypeOf(c) === Child.prototype); // true
```

- 메소드는 prototype 체인을 통해 접근

### 7. 실무 연결 포인트 💼

#### 🔎 이 개념이 실제로 왜 중요한가?

클래스/상속을 잘못 이해하면

- 불필요한 객체 생성
- 메모리 낭비
- 의도치 않은 상태 공유

같은 버그로 이어질 수 있음

#### 🛠 앞으로 코드 작성 시 적용할 점

- ES5에서는 `Object.create()` 기반 상속 사용하기
- prototype에 인스턴스를 직접 할당하지 않기
- 공유되어야 하는 것은 prototype에, 상태는 instance에 분리하기
- ES6 class를 사용하더라도 내부 동작은 항상 prototype 기준으로 생각하기

### 8. 면접 대비용 정리

#### ❓ 예상 질문

1. 자바스크립트에서 클래스는 어떻게 구현되는가?

- 클래스는 별도의 구조가 아니라, 함수와 프로토타입을 기반으로 구현됩니다. 생성자 함수를 `new`로 호출하면 인스턴스가 생성되고, 이 인스턴스는 생성자 함수의 `prototype`을 자신의 `[[Prototype]]`으로 참조합니다. 이러한 프로토타입 체이닝 동작을 기반으로 다른 인스턴스와 프로퍼티나 메소드를 공유할 수 있습니다.

2. ES5에서 상속을 구현하는 방법은?

- ES5에서는 상속을 직접 구현해야 하는데, 일반적으로 부모 생성자를 호출하여 인스턴스를 초기화 하는 과정과 프로토타입 체인을 연결하는 과정을 거칩니다. 이때 부모 생성자를 `call()`과 같은 함수를 활용해서 this는 인스턴스를 가리키도록 합니다. 프로토타입 체인을 연결할 때에는 `Object.create()`를 사용해서 부모 생성자 실행을 방지하며 불필요한 프로퍼티를 포함하지 않도록 하고, constructor는 자신으로 복구하는 과정이 필요합니다.

3. ES6의 extends는 내부적으로 어떻게 동작하는가?

- SubClass의 `prototype`이 SuperClass의 `prototype`을 참조하도록 연결하고, SubClass 자체도 SuperClass를 상속하도록 내부적으로 `[[Prototype]]`이 설정됩니다. 이를 통해 프로토타입 체인에 SuperClass가 포함되고, SubClass.prototype.constructor는 SubClass를 가리키도록 유지됩니다.

## 최종 인사이트

자바스크립트에서 클래스는 다른 언어처럼 독립적인 구조가 아니라,
함수와 객체를 기반으로 만들어졌으며,  
프로토타입 기반 구조를 추상화한 문법이다.
