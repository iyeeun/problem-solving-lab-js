# 🎩 작은 팁 모음

> - [문자열 관련](#문자열-관련)
> - [배열 관련](#배열-관련)

## 문자열 관련

#### 문자열 n회 반복

```js
str.repeat(count);
```

- count는 [0, +∞) 정수
- [관련 링크](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/repeat)

#### 대소문자 변환

```js
str.toUpperCase();
str.toLowerCase();
```

- [관련 링크](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase)
- 원본 문자열 영향 없음 (문자열은 immutable)

#### 문자열 → 숫자 변환

| 방식              | 타입        | 동작 방식                 | 예시                                           | 특징                          |
| ----------------- | ----------- | ------------------------- | ---------------------------------------------- | ----------------------------- |
| `Number(str)`     | 타입 변환   | 전체 문자열을 숫자로 변환 | `Number("123") → 123`<br>`Number("12a") → NaN` | 전체가 숫자여야 변환됨        |
| `+str`            | 타입 변환   | 단항 플러스 연산자        | `+"123" → 123`<br>`+"12a" → NaN`               | `Number()`와 동일 동작, 짧음  |
| `parseInt(str)`   | 문자열 파싱 | 앞에서부터 정수 추출      | `parseInt("12a") → 12`                         | 조용히 잘못된 값 나올 수 있음 |
| `parseFloat(str)` | 문자열 파싱 | 앞에서부터 실수 추출      | `parseFloat("12.3a") → 12.3`                   | 실수 파싱용                   |

#### 문자열 조작 함수 비교

| 함수                    | 타입         | 변경 여부 | 인덱스 처리    | 음수 인덱스 | 특징                |
| ----------------------- | ------------ | --------- | -------------- | ----------- | ------------------- |
| `slice(start, end)`     | String       | ❌ (불변) | [start, end)   | ✅ 지원     | 직관적, 범위 자르기 |
| `substring(start, end)` | String       | ❌ (불변) | [start, end)   | ❌ 미지원   | 음수 처리 이상함    |
| `substr(start, length)` | String       | ❌ (불변) | start + length | ❌          | deprecated          |
| `split()`               | String→Array | ❌        | -              | -           | 문자열 분해         |
| `splice()`              | Array        | ✅ (변경) | index 기반     | ❌          | 배열 직접 수정      |
| `join()`                | Array→String | ❌        | -              | -           | 배열 → 문자열       |

## 배열 관련

### 배열 초기화

#### 특정 길이만큼 0으로 초기화

```js
const arr = new Array(n).fill(0);
```

#### 특정 값으로 초기화

```js
const arr = Array(n).fill(5);
```

#### 동적 값 초기화

```js
const arr = Array.from({ length: n }, (_, i) => i);
```

#### 범위 배열 생성

```js
const range = (start, end) =>
  Array.from({ length: end - start + 1 }, (_, i) => i + start);
```

#### 2차원 배열 초기화

```js
const arr = Array.from({ length: 3 }, () => Array(3).fill(0));
```

#### n차원 배열 일반 패턴

```js
function createNDArray(dimensions, value = 0) {
  if (dimensions.length === 0) return value;
  const [size, ...rest] = dimensions;
  return Array.from({ length: size }, () => createNDArray(rest, value));
}
```

#### 객체 배열 초기화

```js
const arr = Array.from({ length: n }, () => ({ count: 0 }));
```

#### 동적 조건 초기화

```js
const arr = Array.from({ length: n }, (_, i) => {
  if (i % 2 === 0) return 0;
  return 1;
});
```

#### 인덱스 기반 초기화

```js
const arr = [...Array(n).keys()];
```
