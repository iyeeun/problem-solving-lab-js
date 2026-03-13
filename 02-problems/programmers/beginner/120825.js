function solution(my_string, n) {
  return [...my_string].map((c) => c.repeat(n)).join('');
}
