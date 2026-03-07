function solution(myStr) {
  const splited = myStr.split(/a|b|c/).filter((str) => str);
  return splited.length ? splited : ['EMPTY'];
}
