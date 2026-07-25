function solution(tickets) {
  tickets.sort();

  const used = new Array(tickets.length).fill(false);

  function dfs(idx, routes) {
    if (routes.length === tickets.length) {
      return routes;
    }

    for (let next = 0; next < tickets.length; next++) {
      if (used[next]) continue;
      if (tickets[idx][1] === tickets[next][0]) {
        used[next] = true;
        const res = dfs(next, [...routes, tickets[next]]);
        if (res) return res;
        used[next] = false;
      }
    }
  }

  const starts = tickets.filter((v) => v[0] === 'ICN');

  for (const s of starts) {
    const idx = tickets.indexOf(s);

    used[idx] = true;
    const res = dfs(idx, [tickets[idx]]);
    if (res) return ['ICN', ...res.map((v) => v[1])];
    used[idx] = false;
  }

  return [];
}
