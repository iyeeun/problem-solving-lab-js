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

### 배열 메소드

#### 추가 / 삭제

```js
arr.push(1, 2); // 뒤에 추가
arr.pop(); // 뒤에서 제거
arr.unshift(1); // 앞에 추가
arr.shift(); // 앞에서 제거
```

#### 중간 조작

```js
arr.splice(1, 2); // splice(start, deleteCount, ...items)
arr.splice(1, 0, 99); // 1번 위치에 99 삽입
```

#### 정렬 / 반전

```js
arr.sort((a, b) => a - b);
arr.reverse();
```

#### 채우기 / 복사

```js
arr.fill(0); // fill(value, start?, end?)
arr.copyWithin(0, 2, 4); // copyWithin(target, start, end?)
```

#### 추출 / 복사

```js
arr.slice(1, 3); // slice(start, end), 원본 배열 유지
arr.concat([1, 2]); // concat(...arrays), 원본 배열 유지 (arr 변경 X)
```

#### 변환

```js
arr.map((x) => x * 2);
arr.filter((x) => x > 3);
arr.flat(2); // 평탄화, depth 지정 가능
arr.flatMap((x) => [x, x * 2]); // map + flat
```

#### 축약 / 계산

```js
arr.reduce((a, b) => a + b, 0);
arr.reduceRight(...) // 오른쪽부터 reduce
```

#### 탐색

```js
arr.find((v) => v > 10); // 조건을 만족하는 첫 번째 요소 값 반환, 없으면 undefined
arr.findIndex((v) => v > 10); // 조건을 만족하는 첫 번째 인덱스 반환, 없으면 -1
arr.indexOf(5); // 값으로 찾기 (===)
arr.lastIndexOf(5); // 뒤에서부터 찾기
arr.includes(5); // true / false 반환
arr.some((v) => v > 10); // 하나라도 조건 만족하면 true
arr.every((v) => v > 10); // 전부 조건 만족하면 true
```

#### 순회

```js
arr.forEach((v) => console.log(v));
```
