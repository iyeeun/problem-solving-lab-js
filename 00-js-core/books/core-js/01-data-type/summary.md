# 데이터 타입

### 학습 목표

- primitive type과 reference type이 다르게 동작하는 이유를 이해하고 활용한다.

## 데이터 타입의 종류

- Primitive type : primitive value가 저장됨
  - Number
  - BigInt
  - String
  - Boolean
  - Symbol (ES6~) : 고유하고 변경 불가능한 값으로 주로 객체의 property key로 사용
  - null
  - undefined
- Object (Reference type) : 객체를 가리키는 reference value가 저장됨
  - Array
  - Function
  - Date
  - RegExp
  - Map, WeakMap (ES6~)
  - Set, WeakSet (ES6~)

## 불변성 (Immutable)

: 한 번 만들어진 값은 절대 변경되지 않는다

**Primitive type은 immutable함**  
→ 값 자체는 변경되지 않으며 새로운 값이 할당되면 새로운 데이터가 생성됨  
→ 기존 값은 그대로 유지되기 때문에 여러 변수에서 안전하게 공유할 수 있음

## 변수 선언과 데이터 할당

### Primitive type

```js
var a = 'abc';
a = 'abcdef';
```

> 변수 영역 / 데이터 영역은 정식 명칭이 아니며, 메모리의 힙/스택과도 대응되지 않음

**변수 영역**

| 주소   | 1002 | 1003                          | 1004 |
| ------ | ---- | ----------------------------- | ---- |
| 데이터 |      | 이름: a<br>값: @5002 -> @5003 |      |

**데이터 영역**

| 주소   | 5002  | 5003     | 5004 |
| ------ | ----- | -------- | ---- |
| 데이터 | 'abc' | 'abcdef' |      |

1. 변수 영역에서 빈 공간 확보하여 식별자를 `a`로 지정 (@1003)
2. 데이터 영역의 빈 공간에 `'abc'` 저장 (@5002)
3. 1의 변수 영역(@1003)에 데이터 영역의 주소 (@5002) 저장
4. 데이터 영역의 빈 공간에 `'abcdef'` 저장 (@5003)
5. 1의 변수 영역(@1003)에 데이터 영역의 주소 (@5003) 업데이트

→ 각각 나누어 저장하므로 데이터의 크기에 맞게 공간을 변경할 필요가 없음  
→ 엔진에 따라 동일한 데이터를 재사용하기도 함

### Reference type

```js
var obj = { a: 1, arr: [2, 3] };
obj.a = 4;
```

> 객체는 여러 개의 프로퍼티를 가지므로,  
> 객체 자체는 데이터 영역에 저장되고 객체의 프로퍼티들은 별도의 영역에서 관리됨

**변수 영역**

| 주소   | 1001                   |
| ------ | ---------------------- |
| 데이터 | 이름: obj<br>값: @5001 |

**데이터 영역**

| 주소   | 5001  | 5002 | 5003  | 5004 | 5005 | 5006 |
| ------ | ----- | ---- | ----- | ---- | ---- | ---- |
| 데이터 | @7101 | 1    | @7201 | 2    | 3    | 4    |

**@5001 객체 프로퍼티 영역**

| 주소   | 7101                          | 7102                   |
| ------ | ----------------------------- | ---------------------- |
| 데이터 | 이름: a<br>값: @5002 -> @5006 | 이름: arr<br>값: @5003 |

**@5003 배열 프로퍼티 영역**

| 주소   | 7201  | 7202  |
| ------ | ----- | ----- |
| 데이터 | @5004 | @5005 |

1. 변수 영역에서 빈 공간 확보하여 식별자 `obj` 생성 (@1001)
2. 데이터 영역에 객체 생성 (@5001)
3. 객체 내부 프로퍼티를 저장할 별도의 영역 생성 (@7101)
4. `a` 프로퍼티 생성 후 값 `1`을 데이터 영역에 저장 (@5002)
5. `arr` 프로퍼티 생성 후 배열 객체 생성 (@5003)
6. 배열 내부 요소 `2`, `3`을 데이터 영역에 저장 (@5004, @5005)
7. 데이터 영역에 `4` 저장 (@5006)
8. 객체 프로퍼티 `a` (@7101)가 참조하는 주소를 업데이트

> #### Hidden Class (Shape)
>
> 실제 JavaScript 엔진은 위의 설명보다 복잡하게 동작한다.
>
> 객체의 프로퍼티 구조(이름과 순서)를 정의하는 **Hidden Class(Shape)** 를 따로 관리하며  
> 실제 값은 별도의 저장 공간에 저장된다.
>
> 같은 구조로 생성된 객체들은 Hidden Class를 공유할 수 있으며  
> 이를 통해 JavaScript 엔진은 프로퍼티 접근을 빠르게 최적화할 수 있다.
>
> 객체의 프로퍼티가 추가되거나 삭제되면 Hidden Class가 변경될 수 있다.

### Garbage Collection (GC)

: 사용하지 않는 메모리를 자동으로 정리

#### Mark-and-Sweep 방식

1. 현재 실행 컨텍스트에서 접근 가능한 객체를 표시 (mark)
2. 접근할 수 없는 객체는 메모리에서 제거 (sweep)

→ 객체가 더 이상 어떤 reachable object에서도 참조되지 않으면 다음 GC 과정에서 메모리에서 해제

### 변수 복사 비교

```js
var a = 10;
var b = a;

var obj1 = { c: 10, d: 'd' };
var obj2 = obj1;

b = 15;
obj2.c = 20;
```

**변수 영역**

| 주소   | 1001                 | 1002                          | 1003                    | 1004                    |
| ------ | -------------------- | ----------------------------- | ----------------------- | ----------------------- |
| 데이터 | 이름: a<br>값: @5001 | 이름: b<br>값: @5001 -> @5004 | 이름: obj1<br>값: @5002 | 이름: obj2<br>값: @5002 |

**데이터 영역**

| 주소   | 5001 | 5002  | 5003 | 5004 | 5005 |
| ------ | ---- | ----- | ---- | ---- | ---- |
| 데이터 | 10   | @7101 | 'd'  | 15   | 20   |

**객체 프로퍼티 영역**

| 주소   | 7101                          | 7102                 |
| ------ | ----------------------------- | -------------------- |
| 데이터 | 이름: c<br>값: @5001 -> @5005 | 이름: d<br>값: @5003 |

→ a와 b는 서로 독립적인 값을 가지지만, obj1과 obj2는 여전히 같은 주소를 보고 있음  
→ obj2의 변경이 obj1에도 반영됨

하지만 객체의 경우에도 프로퍼티 변경이 아닌 **새로운 객체를 할당**하게 되면 (`obj2 = {...}`)  
데이터 영역에 새로운 객체가 생기고 해당 주소로 업데이트 하기 때문에 서로 다른 주소를 바라보게 됨

## 불변 객체

### 불변 객체의 필요성

[ex1.js](./ex1.js)

```js
const changeName = (user, newName) => {
  const newUser = user;
  newUser.name = newName;
  return newUser;
};

const user = {
  name: 'Alice',
  gender: 'Female',
};

const user2 = changeName(user, 'Amy');

console.log(user.name, user2.name); // Amy Amy
console.log(user === user2); // true
if (user !== user2) {
  console.log('Username changed.');
}
```

`user2`는 새로운 객체가 아니라 기존 객체의 참조를 그대로 사용한 것이기 때문에  
`user`와 `user2`는 동일한 객체를 가리키게 되고 비교가 의도대로 동작하지 않음

이러한 문제를 해결하기 위해 기존 객체를 직접 변경하지 않고 **새로운 객체를 만들어 반환하는 방식**을 사용함

[정상동작하도록 수정한 ex2.js](./ex2.js)

```js
const changeName = (user, newName) => {
  return { ...user, name: newName };
};

const user = {
  name: 'Alice',
  gender: 'Female',
};

const user2 = changeName(user, 'Amy');

console.log(user.name, user2.name); // Alice Amy
console.log(user === user2); // false
if (user !== user2) {
  console.log('Username changed.'); // Username changed.
}
```

위 코드의 경우에는 얕은 복사를 통해 해결하고 있음

### 얕은 복사와 깊은 복사

객체 복사는 범위에 따라 얕은 복사와 깊은 복사로 나뉨

#### 얕은 복사 (Shallow Copy)

객체의 1 depth 값만 복사

- primitive 값은 그대로 복사
- 객체 값은 참조만 복사

따라서 복사한 내부 객체를 수정하면 원본도 변경됨

#### 깊은 복사 (Deep Copy)

객체 내부에 있는 모든 객체를 재귀적으로 복사하여 새로운 참조 구조를 생성함

**깊은 복사 수행 방법**

```js
structuredClone(obj);
JSON.parse(JSON.stringify(obj)); // 함수, undefined 등은 복사 안됨
```

불변성을 얻기 위해 무조건 깊은 복사를 수행할 필요는 없음

#### Structural Sharing

변경된 경로의 객체만 새로 생성하고 나머지는 기존 객체의 참조를 재사용하는 방식

```js
const newState = {
  ...state,
  user: {
    ...state.user,
    name: 'Amy',
  },
};
```

불변성을 유지하면서도 불필요한 깊은 복사를 피할 수 있으며  
참조 비교를 통해 변경 여부를 효율적으로 판단할 수 있음

## undefined

undefined는 값이 할당되지 않았음을 나타내는 **값**  
따라서 의도적으로 비어있음을 나타내기 위해서는 `null`을 사용하는 것이 바람직함

#### JS 엔진이 자동으로 undefined를 할당하는 경우

- 값을 할당하지 않고 선언된 변수
- 객체에 존재하지 않는 프로퍼티에 접근할 때
- return 값이 없는 함수의 실행 결과
- 배열의 존재하지 않는 index에 접근할 때

```js
let a;
console.log(a); // undefined

const obj = {};
console.log(obj.x); // undefined

function test() {}
console.log(test()); // undefined

const arr = [1, 2];
console.log(arr[10]); // undefined
```

> 배열의 경우 처음 만들면 아예 요소들이 비어있음 (empty : undefined조차 존재하지 않음, index 프로퍼티가 존재하지 않음)

## Call by Sharing

JavaScript의 함수 인자 전달 방식은 **Call by Sharing**임

### Primitive 전달

Primitive 값은 값 자체가 복사되어 전달됨

```js
function change(x) {
  x = 10;
}

let a = 5;
change(a);

console.log(a); // 5
```

### Object 전달

객체의 참조가 복사되어 전달됨

```js
function change(obj) {
  obj.name = 'Amy';
}

const user = { name: 'Alice' };
change(user);

console.log(user.name); // Amy
```

함수 내부에서 객체의 프로퍼티는 변경 가능하지만 새로운 객체를 할당해도 외부에는 영향을 주지 않음

```js
function change(obj) {
  obj = { name: 'Amy' };
}

const user = { name: 'Alice' };
change(user);

console.log(user.name); // Alice
```
