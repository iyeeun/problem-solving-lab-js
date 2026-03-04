function solution(my_string) {
  const lenArr = new Array(52).fill(0);

  for (const ch of my_string) {
    if (ch.toUpperCase() === ch) {
      lenArr[ch.charCodeAt(0) - 'A'.charCodeAt(0)]++;
    } else {
      lenArr[ch.charCodeAt(0) - 'a'.charCodeAt(0) + 26]++;
    }
  }

  return lenArr;
}
