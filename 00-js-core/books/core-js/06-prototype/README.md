# Chapter 06. 프로토타입

## 요약

- [요약 바로가기](./summary.md)

## Deep Dive

### 1. 핵심 질문

> 이 장은 결국 무엇을 설명하려는가?

- 자바스크립트에서 상속이 어떻게 구현되는지
- 객체가 프로퍼티를 어떤 방식으로 탐색하는지 (프로토타입 체인)
- `this`, `constructor`, `new`가 프로토타입과 어떻게 연결되는지

### 2. 한 줄 요약

> 이 장의 핵심을 한 문장으로 말하면?

- `new`로 생성된 인스턴스는 `[[Prototype]]`을 통해 생성자 함수의 `prototype` 객체에 연결된다.
- 프로토타입은 연쇄적으로 연결되어있고 해당 체인을 따라 프로퍼티를 탐색한다.

### 3. 개념 구조 정리

#### 📚 핵심 개념

- `[[Prototype]]`
- `prototype`
- `__proto__`
- 프로토타입 체인
- `constructor`

#### 🔗 개념 연결 구조

- new -> 인스턴스 생성  
  => `instance.[[Prototype]]` = `Constructor.prototype`
- 프로토타입 체인: `[[Prototype]]`을 따라 프로퍼티를 탐색하는 구조
- 프로퍼티 탐색:  
  instance -> `[[Prototype]]` -> ... -> Object.prototype -> null

### 4. 나의 언어로 설명해보기

자바스크립트에서 객체는 `[[Prototype]]`이라는 내부 슬롯으로 다른 객체와 연결되어 있다.  
객체의 프로퍼티/메소드를 찾을 때 해당 객체에 없으면 이 연결을 올라가며 찾는데, 이를 프로토타입 체이닝이라고 한다.

### 5. 헷갈렸던 부분 / 오해했던 부분

#### ❓ 처음에 이해 안 됐던 점

- `__proto__`와 `prototype`이 같은 개념인 줄 알았다
- 메소드를 prototype에서 가져오면 `this`도 prototype일 줄 알았다
- 프로토타입 체인이 단순히 `__proto__`를 따라가는 구조라고 생각했다
- 프로토타입 체인이 길게 이어지는 복잡한 구조라고 생각했다

#### 💡 지금은 이렇게 이해했다

- `prototype`은 인스턴스들이 공유하는 객체 / `[[Prototype]]`은 그 객체를 참조하기 위한 연결
- `this`는 메소드를 어디서 찾았는지가 아니라, 실제로 누가 호출했는지에 따라 결정됨
- 객체에서 프로퍼티를 찾지 못하면 `[[Prototype]]`을 따라 올라가며 탐색 (프로토타입 체인)
- 프로토타입 체인은 기본적으로 instance -> Constructor.prototype -> Object.prototype 정도의 짧은 구조를 가지며, 상속을 구성할 때만 길어짐

### 6. 코드로 확인하기

```js
function Person(name) {
  this.name = name;
}

Person.prototype.getName = function () {
  return this.name;
};

const yeeun = new Person('yeeun');

// 프로토타입 체인 탐색
console.log(yeeun.getName()); // yeeun

// this 차이
console.log(yeeun.__proto__.getName()); // undefined

// constructor
console.log(yeeun.constructor === Person); // true
console.log(Person.constructor === Function); // true
```

### 7. 실무 연결 포인트 💼

#### 🔎 이 개념이 실제로 왜 중요한가?

- 클래스 문법(`class`, `extends`)은 프로토타입 체인의 문법적 설탕(syntactic sugar)이다. 내부 동작은 동일하므로 프로토타입을 이해해야 클래스 상속의 동작과 버그를 제대로 파악할 수 있다.
- 인스턴스마다 메소드를 복사하지 않고 `prototype`에 한 번만 정의하면 메모리를 아낄 수 있다. 대규모 인스턴스 생성 시 성능 차이가 날 수 있다.
- `instanceof`, `Object.create()`, 믹스인 패턴 등 실무에서 자주 쓰이는 패턴들이 모두 프로토타입 체인에 기반한다.

#### 🛠 앞으로 코드 작성 시 적용할 점

- 공유 메소드는 인스턴스에 직접 붙이지 않고 `prototype`에 정의한다.
- `__proto__` 대신 `Object.getPrototypeOf()`를 사용한다.
- `constructor` 프로퍼티를 의도치 않게 덮어쓰지 않도록 주의한다. (특히 `prototype`을 통째로 교체할 때)
- 잘못된 this 바인딩으로 인한 버그를 방지하기 위해 호출 방식에 주의해야 한다.

### 8. 면접 대비용 정리

#### ❓ 예상 질문

1. 프로토타입 체인이란 무엇인가요?

- 객체의 `[[Prototype]]`이 다른 객체를 연쇄적으로 참조하는 구조를 말합니다. 프로퍼티를 탐색할 때 프로토타입 체인을 따라 올라가며 찾습니다. 모든 객체의 프로토타입 체인의 최상단은 `Object.prototype`이고, 그 위는 `null`이 됩니다.

2. `prototype`과 `[[Prototype]]`의 차이는 무엇인가요?

- `prototype`은 생성자 함수가 가지는 객체로, 인스턴스들이 공유할 메소드를 담는 공유 객체입니다. `[[Prototype]]`은 인스턴스가 가지는 내부 슬롯으로, 생성 시 `Constructor.prototype`을 가리키도록 설정됩니다. `[[Prototype]]`에는 직접 접근할 수 없기 때문에 `__proto__`를 이용하거나 `Object.getPrototypeOf()` 등을 통해 접근해야 합니다.

3. 메소드 오버라이드와 프로토타입 메소드의 관계를 설명하세요.

- 메소드 오버라이드란 일반적으로 자식 클래스에서 부모 클래스의 메소드를 재정의하는 것을 말합니다. 자바스크립트에서는 프로토타입 체이닝을 통해 인스턴스의 프로퍼티를 탐색하고 없으면 프로토타입의 프로퍼티를 탐색하기 때문에, 동일한 이름의 메소드가 인스턴스와 프로토타입에 존재할 경우 인스턴스의 메소드가 호출됩니다. 여전히 프로토타입의 메소드는 유지되며, `__proto__`를 이용해서 접근할 수 있습니다.

4. `Object.create(null)`을 언제 쓰면 좋을까요?

- `Object.prototype`의 메소드(ex. `hasOwnProperty`, `toString`)가 없는 순수한 데이터 저장용 객체가 필요할 때, 빌트인 프로퍼티 오염 없이 가벼운 해시맵처럼 쓸 수 있습니다.

## 최종 인사이트

자바스크립트의 프로토타입은 언어 자체가 객체를 연결하는 방식이다.  
객체를 만들고, 프로토타입으로 연결하고, 프로토타입 체인을 따라 탐색하는 동작을 수행한다.
