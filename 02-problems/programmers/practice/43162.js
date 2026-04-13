function solution(n, computers) {
  let answer = 0;
  const visited = new Array(n).fill(false);

  function dfs(cur) {
    if (visited[cur]) return;

    visited[cur] = true;

    for (let i = 0; i < computers[cur].length; i++) {
      if (computers[cur][i] === 1 && !visited[i]) {
        dfs(i);
      }
    }
  }

  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      dfs(i);
      answer++;
    }
  }

  return answer;
}
