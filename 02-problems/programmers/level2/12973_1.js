function solution(s) {
  const regex = /([a-z])\1{1}/g;

  while (regex.test(s)) {
    s = s.replace(regex, '');
  }

  return s.length === 0 ? 1 : 0;
}
