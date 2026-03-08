function solution(strArr) {
  const len = [];

  for (const str of strArr) {
    len[str.length] = (len[str.length] | 0) + 1;
  }

  return Math.max(...len.filter((v) => v !== undefined));
}
