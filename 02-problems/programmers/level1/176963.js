function solution(name, yearning, photo) {
  const answer = [];

  const map = new Map();

  for (let i = 0; i < name.length; i++) {
    map.set(name[i], yearning[i]);
  }

  for (const p of photo) {
    answer.push(p.reduce((acc, v) => acc + (map.get(v) || 0), 0));
  }

  return answer;
}
