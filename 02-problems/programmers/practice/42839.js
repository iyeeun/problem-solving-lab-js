function solution(numbers) {
  // 소수 구하기
  const max = 10000001;
  const prime = new Array(max).fill(true);
  prime[0] = false;
  prime[1] = false;

  for (let i = 2; i * i < max; i++) {
    if (!prime[i]) continue;
    for (let j = i * i; j < max; j += i) {
      prime[j] = false;
    }
  }

  // 숫자 만들기
  const arr = numbers.split('');

  const visited = new Array(arr.length).fill(false);
  const res = [];

  function dfs(cur) {
    if (cur.length > 0) {
      res.push(cur);
    }

    for (let i = 0; i < arr.length; i++) {
      if (visited[i]) continue;
      visited[i] = true;
      dfs(cur + arr[i]);
      visited[i] = false;
    }
  }

  dfs('');

  const set = new Set(res);
  let answer = 0;

  for (const r of set) {
    if (prime[r]) answer++;
  }

  return answer;
}
