# JavaScript `Set` 정리

## 1. 생성

```js
const s = new Set();
```

```js
const s = new Set([1, 2, 2, 3, 3, 3]);
// Set { 1, 2, 3 } <- 자동 중복 제거됨
```

## 2. 기본 메서드

### 추가

```js
s.add(4); // Set 객체 반환
s.add(4).add(5); // 중복 추가 안됨, 이어서 붙일 수 있음
```

### 삭제

```js
s.delete(2); // true / false 반환
```

### 존재 여부

```js
s.has(3); // true / false 반환
```

### 크기

```js
s.size;
```

### 전체 삭제

```js
s.clear();
```

## 3. 순회 (Iteration)

### for...of

```js
for (const v of s) {
  console.log(v);
}
```

### forEach

```js
s.forEach((v) => {
  console.log(v);
});
```

> ⚠️ 인덱스 없음 (Set은 순서 개념은 있지만 index 개념 없음)

## 4. 배열 변환

```js
const arr = [...s];
```

```js
const arr = Array.from(s);
```

## 5. 중복 제거 패턴

```js
const arr = [1, 2, 2, 3, 3, 4];
const unique = [...new Set(arr)];
// [1, 2, 3, 4]
```

## 6. 실전 패턴 모음

### 유니크 개수 세기

```js
const kinds = new Set([a, b, c]).size;
```

### 문자열 유니크 문자

```js
const uniqueChars = new Set('banana');
```

### 교집합

```js
const A = new Set([1, 2, 3]);
const B = new Set([2, 3, 4]);

const intersection = new Set([...A].filter((x) => B.has(x)));
```

### 차집합

```js
const diff = new Set([...A].filter((x) => !B.has(x)));
```

### 합집합

```js
const union = new Set([...A, ...B]);
```
