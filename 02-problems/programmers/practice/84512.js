function solution(word) {
  const arr = ['A', 'E', 'I', 'O', 'U'];
  const res = [];
  const path = [];

  function dfs() {
    if (path.length > 5) return;

    if (path.length > 0) {
      res.push(path.join(''));
    }

    for (let i = 0; i < arr.length; i++) {
      path.push(arr[i]);
      dfs();
      path.pop();
    }
  }

  dfs();

  return res.indexOf(word) + 1;
}
