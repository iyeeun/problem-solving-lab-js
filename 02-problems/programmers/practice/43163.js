function getDiff(a, b) {
  let diff = 0;

  for (let i = 0; i < a.length; i++) {
    diff += Number(a[i] !== b[i]);
  }

  return diff;
}

function solution(begin, target, words) {
  const adj = new Map();
  const dist = new Map();

  for (const key of [begin, ...words]) {
    adj.set(key, []);
    dist.set(key, -1);
  }

  for (let i = 0; i < words.length; i++) {
    for (let j = 0; j < words.length; j++) {
      if (i === j) continue;

      if (getDiff(words[i], words[j]) === 1) {
        adj.get(words[i]).push(words[j]);
      }
    }
  }

  for (const w of words) {
    if (getDiff(begin, w) === 1) adj.get(begin).push(w);
  }

  const q = [];
  q.push(begin);
  dist.set(begin, 0);

  while (q.length) {
    const fr = q.shift();
    if (fr === target) break;

    for (const next of adj.get(fr)) {
      if (dist.get(next) !== -1) continue;

      q.push(next);
      dist.set(next, dist.get(fr) + 1);
    }
  }

  if (!dist.get(target) || dist.get(target) === -1) return 0;

  return dist.get(target);
}
