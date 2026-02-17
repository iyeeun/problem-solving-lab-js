# 기본 입출력 템플릿

## rl 기반

```js
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];

rl.on("line", (line) => {
  input.push(line.trim());
}).on("close", () => {
  // ===== 입력 파싱 =====
  // 예시:
  // const [N, M] = input[0].split(' ').map(Number);
  // const arr = input.slice(1).map(v => v.split(' ').map(Number));

  // ===== 로직 처리 =====
  solve(input);
});

function solve(input) {
  // 알고리즘 구현
  console.log(input);
}
```

## fs 기반

```js
const fs = require("fs");

const input = fs.readFileSync(0, "utf8").trim().split("\n");

// ===== 입력 파싱 =====
// 예시:
// const [N, M] = input[0].split(' ').map(Number);
// const arr = input.slice(1).map(v => v.split(' ').map(Number));

solve(input);

function solve(input) {
  // 알고리즘 구현
  console.log(input);
}
```
