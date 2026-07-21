# `fs` vs `readline`

## 1. `fs`

```js
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim();

const lines = input.split('\n');
```

### 특징

- 표준 입력 전체를 문자열로 한 번에 읽음
- `split('\n')`으로 줄 단위 배열로 가공
- 동기적으로 동작 → 코드 흐름이 단순
- 입력량이 많아도 빠름

### 자주 쓰는 패턴

#### 한 줄 입력

```js
const n = Number(input);
```

#### 여러 줄 입력

```js
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const n = Number(input[0]);
const arr = input[1].split(' ').map(Number);
```

#### 공백으로 나누기

```js
const [a, b] = input.split(' ').map(Number);
```

### 주의할 점

```js
fs.readFileSync('/dev/stdin'); // 그냥 쓰면 Buffer 반환
const input = fs.readFileSync('/dev/stdin').toString().trim();
```

- 반드시 `.toString()`으로 문자열 변환 후 사용
- `.trim()`으로 끝의 개행/공백 제거해야 마지막 줄 오류 방지

## 2. `readline`

```js
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });

const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  // 입력이 끝나면 실행
  console.log(input);
  process.exit();
});
```

### 특징

- 입력을 **한 줄씩** 이벤트로 받음
- `line` 이벤트: 줄이 들어올 때마다 실행
- `close` 이벤트: 입력이 모두 끝났을 때 실행
- 비동기 → 모든 로직은 `close` 안에서 처리해야 함
- `fs`와 달리 이미 문자열 형태로 입력받음

### 자주 쓰는 패턴

#### 입력 다 모은 뒤 처리

```js
rl.on('line', (line) => {
  input.push(line.trim());
}).on('close', () => {
  const n = Number(input[0]);
  const arr = input[1].split(' ').map(Number);
  // 로직
  process.exit();
});
```

### 주의할 점

- 밖에서 쓰면 아직 입력 안 끝난 상태이기 때문에 모든 로직을 `close` 안에서 처리해야 함

## 3. 비교

| 구분        | `fs`                      | `readline`            |
| ----------- | ------------------------- | --------------------- |
| 읽는 방식   | 전체를 한 번에 읽음       | 한 줄씩 이벤트로 읽음 |
| 속도        | 빠름                      | 상대적으로 느림       |
| 코드량      | 짧음                      | 다소 김               |
| 처리 방식   | 동기적                    | 비동기(이벤트 기반)   |
| 적합한 상황 | 입력이 많은 알고리즘 문제 | 대화형 / 실시간 입력  |

### 언제 무엇을 쓸까

#### `fs` 사용

- 입력량이 많을 때 (속도 유리)
- 입력을 한 번에 받아 처리해도 될 때

#### `readline` 사용

- 입력이 실시간으로 들어오는 대화형 프로그램
- 한 줄 받을 때마다 즉시 처리해야 할 때
