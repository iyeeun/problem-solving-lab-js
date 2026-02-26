# JavaScript 고차함수(Higher-Order Functions) 정리

> 고차함수란?  
> **함수를 인자로 받거나, 함수를 반환하는 함수**

## 기본 구조

```js
arr.method((value, index, array) => {
  // 로직
});
```

공통 콜백 인자:

| 인자  | 의미      |
| ----- | --------- |
| value | 현재 요소 |
| index | 인덱스    |
| array | 원본 배열 |

## 1. `forEach` — 순회 전용

```js
arr.forEach((v, i) => {
  console.log(v, i);
});
```

### 특징

- return 없음
- 체이닝 불가
- side-effect용 (출력, 누적, 로그 등)

## 2. `map` — 변환

```js
const newArr = arr.map((v) => v * 2);
```

### 특징

- 길이 동일
- 새로운 배열 반환
- 조건 필터링 불가

## 3. `filter` — 조건 필터링

```js
const evens = arr.filter((v) => v % 2 === 0);
```

### 특징

- 길이 가변
- boolean 기반
- 값 변환 불가

## 4. `reduce` — 누적기

```js
arr.reduce((acc, cur) => acc + cur, 0);
```

### 구조

```js
reduce((accumulator, current, index, array) => {
  return newAccumulator;
}, initialValue);
```

| 요소         | 의미        |
| ------------ | ----------- |
| acc          | 누적값      |
| cur          | 현재값      |
| initialValue | 초기 누적값 |

### reduce 패턴 예시

#### 합계

```js
arr.reduce((a, c) => a + c, 0);
```

#### 조건 합계

```js
arr.reduce((a, c) => (c % 2 ? a + c : a), 0);
```

#### boolean 배열 처리

```js
included.reduce((sum, v, i) => {
  if (v) sum += a + i * d;
  return sum;
}, 0);
```

#### 객체 카운팅 (빈도수)

```js
const freq = arr.reduce((acc, v) => {
  acc[v] = (acc[v] || 0) + 1;
  return acc;
}, {});
```
