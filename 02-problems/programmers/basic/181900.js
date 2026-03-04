function solution(my_string, indices) {
  return my_string
    .split('')
    .filter((ch, idx) => !indices.includes(idx))
    .join('');
}
