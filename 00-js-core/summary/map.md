# JavaScript Map 정리

## 1. Map이란?

: **키-값(key-value)** 쌍을 저장하는 자료구조

> 객체(Object)와 비슷하지만, **키 타입에 제한이 없음**

## 2. Object와의 차이

| 구분         | Object                  | Map                |
| ------------ | ----------------------- | ------------------ |
| 키 타입      | 문자열 / Symbol         | 모든 타입 가능     |
| 키 순서 보장 | ❌ (정확히는 복잡함)    | ✅ 삽입 순서 유지  |
| size 확인    | Object.keys(obj).length | map.size           |
| 반복         | 별도 처리 필요          | 바로 iterable      |
| 성능         | 작은 규모 OK            | 대량 데이터에 유리 |

### Object 사용

- 단순 JSON 구조
- API 응답 데이터
- 키가 문자열일 때

### Map 사용

- 키 타입이 다양할 때
- 대량 데이터 처리
- 삽입 순서가 중요할 때
- 빈도수 계산
- 키 존재 여부 검사 많을 때

## 3. 기본 사용법

### 생성

```js
const map = new Map();
```

### 초기값과 함께 생성

```js
const map = new Map([
  ['a', 1],
  ['b', 2],
  [3, 'number key'],
]);
```

## 4. 주요 메서드

### 값 저장

```js
map.set('a', 10); // Map 객체를 반환 -> 체이닝 가능
map.set(1, 'hello');
```

### 값 조회

```js
map.get('a'); // 10
map.get('x'); // 존재하지 않으면 undefined
```

### 키 존재 여부

```js
map.has('a'); // true or false
```

### 특정 키 삭제

```js
map.delete('a');
```

### 모두 삭제

```js
map.clear();
```

### 저장된 개수

```js
map.size;
```

## 5. 반복 방법

### for...of

```js
for (const [key, value] of map) {
  console.log(key, value);
}
```

### keys()

```js
for (const key of map.keys()) {
  console.log(key);
}
```

### values()

```js
for (const value of map.values()) {
  console.log(value);
}
```

### entries()

```js
for (const entry of map.entries()) {
  console.log(entry); // for ... of와 동일하게 동작
}
```

### forEach()

```js
map.forEach((value, key) => {
  console.log(key, value);
});
```

## 6. 특징

### 키 타입 제한 없음

```js
const obj = {};
const map = new Map();

obj[1] = 'number';
obj[true] = 'boolean';
obj[{ a: 1 }] = 'object';

console.log(Object.keys(obj)); // ["1", "true", "[object Object]"] -> 전부 문자열 변환됨

map.set(1, 'number');
map.set(true, 'boolean');
map.set({ a: 1 }, 'object');

console.log([...map.keys()]); // [1, true, {a:1}] -> 타입 유지
```

### 객체를 키로 사용 가능

> 같은 구조라도 다른 객체면 다른 키이므로 주의 필요

```js
const keyObj = { id: 1 };
map.set(keyObj, 'value');

map.get(keyObj); // "value"
```

```js
map.get({ id: 1 }); // undefined
```

### 삽입 순서 유지

```js
map.set('b', 1);
map.set('a', 2);

console.log([...map.keys()]); // ["b", "a"]
```

## 7. 자주 쓰는 패턴

### 빈도수 카운팅

```js
const freq = new Map();

for (const n of [1, 2, 2, 3, 3, 3]) {
  freq.set(n, (freq.get(n) || 0) + 1);
}
```

### Object → Map 변환

```js
const obj = { a: 1, b: 2 };
const map = new Map(Object.entries(obj));
```

### Map → Object 변환

```js
const obj = Object.fromEntries(map);
```

## 8. 주의할 점

```js
map[key] = value; // ❌ 이렇게 쓰면 안 됨
```

→ Map도 객체이기 때문에 객체 프로퍼티로 추가가 되지만,

- Map 메소드에 사용할 수 없고
- 순회할 때에도 조회되지 않으며
- size에도 포함되지 않기 때문에

`map.set(key, value)`을 사용해야 함
