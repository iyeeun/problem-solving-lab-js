# 실행 컨텍스트

### 학습 목표

- 실행 컨텍스트의 개념을 이해한다.
- 실행 컨텍스트의 내부 구조를 이해한다.
- 스코프 체인과 식별자 탐색 과정에 대해 설명할 수 있다.
- 호이스팅에 대해 설명할 수 있다.

## 실행 컨텍스트

: JavaScript 엔진이 코드를 실행하기 위해 필요한 환경 정보를 저장하는 내부 구조  
엔진은 실행 컨텍스트를 생성하여 콜스택에 쌓고 코드를 실행함

### 생성 시점

1. Global Execution Context  
   : 프로그램이 시작될 때 한 번
2. Function Execution Context  
   : 함수가 호출될 때
3. eval Execution Context  
   : `eval()` 함수가 실행될 때 (거의 사용되지 않음)

## 내부 구조

```
Execution Context
 ├ LexicalEnvironment
 ├ VariableEnvironment
 ├ ThisBinding
 └ PrivateEnvironment (ES2022+)
```

```
LexicalEnvironment / VariableEnvironment
 ├ EnvironmentRecord
 └ OuterEnvironmentReference
```

### LexicalEnvironment

> Lexical : 어휘적, 사전적인

: 현재 실행 컨텍스트의 식별자와 스코프 정보를 관리하는 환경

- Execution Context 생성 시점에 VariableEnvironment와 동일한 Environment를 참조함
- 이후 코드 실행 중 발생하는 식별자 변경 사항을 반영함

### VariableEnvironment

: Execution Context 생성 시점의 LexicalEnvironment를 보존하는 환경

- 이후 LexicalEnvironment가 변경되더라도 VariableEnvironment에는 반영되지 않음

#### ES5까지

실행 도중에 LexicalEnvironment가 교체되는 상황(with, catch, eval)이 있는데  
var 선언은 이러한 환경 변화에 영향을 받으면 안되어서  
함수 실행 시작 시점의 var 선언을 보존하기 위해 VariableEnvironment와  
현재 스코프의 환경인 LexicalEnvironment를 활용함

그렇지만 ES5까지는 `var` 기반 함수 스코프만 존재했기 때문에  
VariableEnvironment와 LexicalEnvironment의 차이가 크게 드러나지 않았음

#### ES6 이후

`let`, `const`, `class`, `block scope`가 추가되면서  
대부분의 스코프 관리는 LexicalEnvironment에서 이루어지게 됨  
VariableEnvironment는 초기 상태를 보존하기 위해 남아 있음 (실제로는 거의 사용되지 않음)

### EnvironmentRecord

: 현재 환경에서 선언된 식별자와 해당 식별자의 바인딩 값을 저장하는 구조  
ex. 함수 매개변수 식별자, 함수 선언문, var, let, const, class

### OuterEnvironmentReference

: 현재 LexicalEnvironment의 외부 LexicalEnvironment를 참조하는 링크  
이를 통해 스코프 체인이 형성됨

함수인 경우 **선언 시점**의 LexicalEnvironment가 OuterEnvironmentReference로 연결됨  
→ **Lexical Scope (정적 스코프)**

#### 스코프 체인 (Scope Chain)

식별자를 찾을 때 외부 환경을 따라가며 탐색하는 구조

```
현재 EnvironmentRecord
→ OuterEnvironmentReference
→ 외부 EnvironmentRecord
→ ...
→ Global Environment
```

가장 먼저 발견한 식별자를 사용하므로,  
동일한 이름의 식별자가 여러 스코프에 있으면 가장 가까운 스코프의 식별자를 사용함  
→ 변수 쉐도잉 (Variable Shadowing)

- 내부 스코프의 식별자가 외부 스코프의 식별자를 가리기 때문

### ThisBinding

: `this` 식별자가 참조해야 할 객체

### PrivateEnvironment

Class의 private field (`#field`)를 관리하기 위해 추가된 환경으로,  
private identifier 정보를 관리함

## 실행 단계

### Creation Phase

: 코드를 실행하기 전에 스코프와 변수 구조를 먼저 준비하는 단계

1. Execution Context 생성
2. LexicalEnvironment 생성
3. VariableEnvironment 설정 (초기에는 LexicalEnvironment와 동일)
4. this binding 결정
5. EnvironmentRecord 초기화

- parameter binding
- function declaration 등록
- `var` 선언 등록 (undefined로 초기화)
- `let / const / class` 선언 등록 (초기화되지 않음 - TDZ)

### Execution Phase

: Creation Phase에서 준비된 환경을 기반으로 코드를 실제로 실행하는 단계

- 변수 값 할당
- 표현식 평가
- 함수 호출
- 연산 수행

## 호이스팅 (Hoisting)

: JavaScript에서 선언이 스코프의 최상단으로 끌어올려지는 것처럼 보이는 현상  
실제로는 Creation Phase에서 선언이 먼저 등록되기 때문에 발생함  
선언 종류에 따라 초기화 방식이 다름

| 선언                 | Creation Phase 동작              | 실행 결과           |
| -------------------- | -------------------------------- | ------------------- |
| function declaration | 함수 객체 생성 후 바인딩         | 선언 이전 호출 가능 |
| var                  | `undefined`로 초기화             | 선언 이전 접근 가능 |
| let / const / class  | binding만 생성 (초기화되지 않음) | TDZ 발생            |

### 호이스팅 우선순위

Creation Phase에서 EnvironmentRecord에 등록되는 순서

1. 매개변수 (parameter binding)
2. 함수 선언문 (function declaration)
3. var 선언

동일한 이름의 식별자가 여러 방식으로 선언된 경우,  
우선순위가 높은 것이 먼저 등록되고,  
낮은 것은 이미 바인딩이 존재하면 덮어쓰지 않음

#### 매개변수와 var 선언이 같은 이름인 경우

[hoisting1.js 참고](./hoisting1.js)

매개변수는 var보다 우선순위가 높으므로,  
같은 이름의 var 선언은 이미 바인딩이 존재해 무시됨  
할당은 Execution Phase에서 이루어지므로 값은 유지됨

#### 함수 선언문과 var가 같은 이름인 경우

[hoisting2.js 참고](./hoisting2.js)

함수 선언문이 var보다 우선순위가 높으므로,  
Creation Phase에서 함수 객체가 바인딩됨  
이후 Execution Phase에서 var에 대한 할당문이 실행되면 그 시점에 값이 바뀜

## TDZ (Temporal Dead Zone)

`let`, `const`, `class`로 선언된 변수는 Creation Phase에서 바인딩은 생성되지만 초기화되지 않는데,  
선언문이 실행되기 전까지의 구간을 의미함  
이때 변수에 접근하면 ReferenceError가 발생함  
→ 선언 이전에 변수를 사용하는 것을 방지

## 블록 스코프 (Block Scope)

`let`, `const`, `class`는 블록 단위 스코프를 가짐  
블록 내부에 `let`, `const`, `class` 선언이 존재하면 새로운 **LexicalEnvironment**가 생성되어 해당 블록 내부의 식별자를 관리함  
블록이 끝나면 해당 LexicalEnvironment에 접근할 수 없음

반면 `var`는 함수 또는 전역 스코프에 속함 (블록 스코프의 영향을 받지 않음)

## 전역 변수와 지역 변수

### 전역 변수 (Global Variable)

: 전역 스코프에서 선언된 변수  
Global EnvironmentRecord에 저장  
프로그램 전체에서 접근 가능

### 지역 변수 (Local Variable)

: 함수 또는 블록 내부에서 선언된 변수

해당 LexicalEnvironment의 EnvironmentRecord에 저장되며  
외부 스코프에서는 접근할 수 없음

## 함수 선언문과 함수 표현식

### 함수 선언문 (Function Declaration)

: `function` 정의가 존재하고 별도의 할당 명령이 없는 함수

```js
foo(); // OK

function foo() {}
```

Creation Phase에서 함수 객체가 생성되어 EnvironmentRecord에 바로 등록됨

### 함수 표현식 (Function Expression)

: function을 별도의 변수에 할당하는 것, 기명/익명 가능

```js
foo(); // TypeError : foo is not a function

var foo = function () {};
```

변수 선언만 먼저 등록되고 함수 할당은 Execution Phase에서 이루어짐 (Creation Phase에서는 undefined)
