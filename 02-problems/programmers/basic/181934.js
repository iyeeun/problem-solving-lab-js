function solution(ineq, eq, n, m) {
  switch (ineq + eq) {
    case '>=':
      return Number(n >= m);
    case '<=':
      return Number(n <= m);
    case '>!':
      return Number(n > m);
    case '<!':
      return Number(n < m);
  }
}
