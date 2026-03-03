function solution(a, b, c, d) {
  const scoreMap = new Array(7).fill(0);
  [a, b, c, d].forEach((v) => scoreMap[v]++);

  switch (Math.max(...scoreMap)) {
    case 4: {
      const p = scoreMap.indexOf(4);
      return 1111 * p;
    }
    case 3: {
      const p = scoreMap.indexOf(3);
      const q = scoreMap.indexOf(1);
      return Math.pow(10 * p + q, 2);
    }
    case 2: {
      const dices = scoreMap.filter((v) => v !== 0);
      if (dices.length === 3) {
        const q = scoreMap.indexOf(1);
        const r = scoreMap.lastIndexOf(1);
        return q * r;
      } else if (dices.length === 2) {
        const p = scoreMap.indexOf(2);
        const q = scoreMap.lastIndexOf(2);
        return (p + q) * Math.abs(p - q);
      }
    }
    case 1:
      return scoreMap.indexOf(1);
  }
}
