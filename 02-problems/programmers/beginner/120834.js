function solution(age) {
  const alphabet = 'abcdefghij';
  return [...age.toString()].map((num) => alphabet[num]).join('');
}
