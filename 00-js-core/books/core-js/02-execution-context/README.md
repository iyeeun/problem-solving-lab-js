# Chapter 02. 실행 컨텍스트

## 요약

- [요약 바로가기](./summary.md)
- [스코프 체인 연습](./scope-chain.md)

## Deep Dive

### 1. 핵심 질문

> 이 장은 결국 무엇을 설명하려는가?

- 자바스크립트의 실행 컨텍스트는 어떻게 구성되어 있는가?
- 자바스크립트 엔진이 코드를 실행할 때 어떤 환경을 만들고, 어떤 순서로 처리하는가?
- 변수가 어디서 어떻게 탐색되는가?

### 2. 한 줄 요약

> 이 장의 핵심을 한 문장으로 말하면?

- 실행 컨텍스트는 자바스크립트 엔진이 코드를 실행하기 위한 환경 정보를 저장하는 내부 구조이다.

### 3. 개념 구조 정리

#### 📚 핵심 개념

- 실행 컨텍스트 : JS 엔진이 코드를 실행하기 위한 환경 정보를 저장하는 내부 구조
- EnvironmentRecord : 식별자와 바인딩 값을 저장하는 공간
- OuterEnvironmentReference : 외부 LexicalEnvironment를 참조하는 링크
- 호이스팅 : Creation Phase에서 선언이 먼저 EnvironmentRecord에 등록되기 때문에, 코드 상단에서도 선언된 식별자에 접근할 수 있는 것처럼 보이는 현상
- Lexical Scope : 함수의 OuterEnvironmentReference는 호출 위치가 아닌 선언 시점의 위치 기준으로 결정됨

#### 🔗 개념 연결 구조

```
코드 실행
→ 실행 컨텍스트 생성 (콜스택에 푸시)
  → Creation Phase
    → EnvironmentRecord 초기화 (호이스팅 발생)
    → OuterEnvironmentReference 설정 (Lexical Scope 결정)
    → this 바인딩
  → Execution Phase
    → 변수 할당, 함수 호출, 표현식 평가
  → 실행 종료
→ 콜스택에서 pop
```

- 스코프 체인은 OuterEnvironmentReference가 체인처럼 연결된 구조
- 식별자 탐색은 현재 EnvironmentRecord → outer → ... → Global 순으로 진행
- 호이스팅이 발생하는 이유 = Creation Phase와 Execution Phase가 분리되어 있기 때문

### 4. 나의 언어로 설명해보기

실행 컨텍스트는 VariableEnvironment, LexicalEnvironment, ThisBinding, (PrivateEnvironment)로 이루어져있다.  
이 중 가장 중요한 개념은 LexicalEnvironment이다. (이하 LE)  
LE는 해당 컨텍스트에서 사용할 식별자와 값을 바인딩하는 EnvironmentRecord와 외부 컨텍스트의 LE를 참조하는 OuterEnvironmentReference로 구성되어있다.  
실행 컨텍스트 생성 과정은 Creation Phase와 Execution Phase로 이루어져있는데,  
Creation Phase에서는 사용하는 변수들을 바인딩한다.  
이때 var은 undefined로, 함수 선언문은 함수 선언문으로, let/const/class는 uninitialized로 바인딩된다.  
Execution Phase에서는 실제로 Evaluation하거나 함수를 호출하는 부분이 실행된다.  
변수의 값을 찾을 때 현재 컨텍스트의 EnvironmentRecord에 없다면 OuterEnvironmentReference를 통해 외부 LE에서 찾고, 그 과정을 전역 실행 컨텍스트까지 반복한다.  
함수의 OuterEnvironmentReference는 함수가 선언된 시점에 결정된다.

### 5. 헷갈렸던 부분 / 오해했던 부분

#### ❓ 처음에 이해 안 됐던 점

- LexicalEnvironment와 VariableEnvironment의 차이가 왜 필요한지 몰랐다.

#### 💡 지금은 이렇게 이해했다

- VariableEnvironment는 with/catch/eval처럼 LexicalEnvironment가 교체되는 상황에서도 초기 var 선언을 보존하기 위해 존재한다. ES6 이후로는 실질적으로 거의 쓰이지 않는다.

### 6. 코드로 확인하기

#### 🔍 실행 결과

```js
function foo() {
  console.log(a); // ① undefined
  var a = 1;
  console.log(a); // ② 1

  function bar() {
    console.log(a); // ③ undefined  ← 헷갈렸던 부분
    var a = 2;
    console.log(a); // ④ 2
  }

  bar();
  console.log(a); // ⑤ 1
}

foo();
```

#### 📎 왜 이런 결과가 나오는가?

- **실행 컨텍스트 관점에서**
  - foo 호출 시 foo의 실행 컨텍스트가 생성되고 Creation Phase에서 `var a`가 EnvironmentRecord에 등록되어 `undefined`로 초기화됨 → ① `undefined`
  - Execution Phase에서 `a = 1` 할당 후 ② `1` 출력
  - bar 호출 시 bar의 실행 컨텍스트가 새로 생성되고, bar의 Creation Phase에서 `var a`가 bar의 EnvironmentRecord에 등록되어 `undefined`로 초기화됨 → ③ `undefined`
  - bar의 Execution Phase에서 `a = 2` 할당 후 ④ `2` 출력
  - bar 종료 후 foo의 실행 컨텍스트로 돌아오므로 foo의 `a`는 여전히 `1` → ⑤ `1`

- **스코프 체인 관점에서**
  - ③번에서 착각하기 쉬운 포인트 : bar 안에 `var a`가 있으므로 스코프 체인 탐색 전에 bar의 EnvironmentRecord에서 먼저 a를 발견함
  - foo의 `a = 1`은 bar 입장에서 외부 스코프이지만, bar 내부에 같은 이름의 선언이 있으므로 **변수 섀도잉**이 발생해 foo의 `a`에 접근하지 않음
  - 탐색 순서 : 현재 EnvironmentRecord → OuterEnvironmentReference(foo) → Global 이지만, 현재에서 이미 찾았으므로 outer로 올라가지 않음

### 7. 실무 연결 포인트 💼

#### 🔎 이 개념이 실제로 왜 중요한가?

- var의 함수 스코프 때문에 for문 + 비동기 조합에서 버그가 자주 발생함
- 이 구조를 모르면 디버깅할 때 원인을 찾기 어려움

#### 🛠 앞으로 코드 작성 시 적용할 점

- var 대신 let/const를 기본으로 사용한다
- 변수 선언 위치를 의도적으로 관리한다 (선언은 사용 직전에)
- 호이스팅에 의존하는 코드를 작성하지 않는다

### 8. 면접 대비용 정리

#### ❓ 예상 질문

1. 호이스팅이란 무엇인가? var / let / const의 차이는?  
    호이스팅이란 변수나 함수 선언이 코드 상단으로 끌어올려진 것처럼
   동작하는 현상입니다. 실행 컨텍스트에서 사용하는 식별자를 바인딩하는 Creation Phase와 실제 코드를 실행하는 Execution Phase로 나누어져있어 발생하는 현상으로, Creation Phase에서 식별자가 먼저 EnvironmentRecord에 등록되어 접근할 수 있기 때문에 변수 선언이 코드의 상단으로 끌어올려진 것처럼 보이는 현상입니다. var는 undefined로 초기화되지만 let과 const는 초기화가 되지 않아서 Temporal Dead Zone, 즉 TDZ 구간이 생깁니다.

2. TDZ란 무엇이며 왜 존재하는가?  
   위에 이어서 TDZ란 Temporal Dead Zone으로 let, const, class와 같은 선언문이 실행 컨텍스트 생성 시에 EnvironmentRecord에 바인딩은 되었지만 값이 초기화되지 않은 상태를 의미합니다. 이때 변수에 접근하면 ReferenceError가 발생하게 되어 선언 이전에 변수를 사용하는 것을 방지합니다.
3. 스코프 체인이란 무엇인가? 탐색 순서는?  
   스코프 체인이란 변수를 찾을 때 현재 실행 컨텍스트의 EnvironmentRecord부터 시작하여 OuterEnvironmentReference를 통해 외부 실행 컨텍스트의 LexicalEnvironment를 참조하는 과정을 반복하는 구조를 의미합니다. 전역 실행 컨텍스트까지 탐색하며 이때 가장 먼저 찾은 변수를 사용하게 되며, 이로 인해 더 넓은 스코프의 변수가 아닌 가장 가까운 변수를 사용하는 것을 변수 쉐도잉이라고 합니다.
4. Lexical Scope란 무엇인가?  
   Lexical Scope란 함수를 실행할 때 호출된 위치의 환경이 아니라, 선언한 시점의 환경을 참조하는 것을 의미합니다.

## 최종 인사이트

호이스팅, TDZ, 스코프 체인, Lexical Scope는 각각 따로 외울 개념이 아니라
실행 컨텍스트의 Creation Phase → Execution Phase 흐름에서 파생된 동작이다.
