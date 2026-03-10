# 2차원 배열 조작 패턴

## 나선형 순회

> #### 결과 예시
>
> [ [ 1, 2, 3, 4 ],  
>  [ 12, 13, 14, 5 ],  
>  [ 11, 16, 15, 6 ],  
>  [ 10, 9, 8, 7 ] ]

```js
function solution(n) {
  const answer = Array.from({ length: n }, () => Array(n).fill(0));

  const dx = [0, 1, 0, -1];
  const dy = [1, 0, -1, 0];

  let [x, y, mode] = [0, 0, 0];

  for (let num = 1; num <= n * n; num++) {
    answer[x][y] = num;

    let nx = x + dx[mode];
    let ny = y + dy[mode];

    if (nx < 0 || nx >= n || ny < 0 || ny >= n || answer[nx][ny] !== 0) {
      mode = (mode + 1) % 4;
      nx = x + dx[mode];
      ny = y + dy[mode];
    }

    x = nx;
    y = ny;
  }

  return answer;
}
```

1. 반복되는 위치 이동(방향 벡터)을 나타낸다. (`dx`, `dy`)
2. 작성하는 범위 안에서, 아래 행동을 반복한다.

- 현재 위치에 수를 입력
- 새로운 위치 계산 (`nx`, `ny`)
- 막히면 방향 전환 (`(mode + 1) % 4`)
- 새로운 위치로 현재 위치 변수 업데이트
