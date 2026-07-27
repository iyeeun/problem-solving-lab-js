function solution(user_id, banned_id) {
  const possible = Array.from(
    { length: banned_id.length },
    (_, i) => new Array(),
  );

  for (let b = 0; b < banned_id.length; b++) {
    for (const u of user_id) {
      if (banned_id[b].length !== u.length) continue;

      let same = true;
      for (let i = 0; i < banned_id[b].length; i++) {
        if (banned_id[b][i] === '*') continue;
        if (banned_id[b][i] !== u[i]) {
          same = false;
          break;
        }
      }

      if (same) {
        possible[b].push(u);
      }
    }
  }

  const visited = new Map();
  const result = new Set();

  for (const u of user_id) {
    visited.set(u, false);
  }

  function dfs(cur_group, path) {
    if (cur_group === banned_id.length) {
      result.add(JSON.stringify(path.sort()));
      return;
    }

    for (const b of possible[cur_group]) {
      if (visited.get(b)) continue;

      visited.set(b, true);
      dfs(cur_group + 1, [...path, b]);
      visited.set(b, false);
    }
  }

  dfs(0, []);

  return result.size;
}
