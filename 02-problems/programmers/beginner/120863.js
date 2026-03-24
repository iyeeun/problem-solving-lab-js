function solution(polynomial) {
  let [x, c] = [0, 0];

  for (const e of polynomial.split(' + ')) {
    if (e.includes('x')) {
      x += e === 'x' ? 1 : Number(e.replace('x', ''));
    } else {
      c += Number(e);
    }
  }

  if (x === 0) {
    return c.toString();
  }
  if (c === 0) {
    return `${x === 1 ? '' : x}x`;
  }

  return `${x === 1 ? '' : x}x + ${c}`;
}
