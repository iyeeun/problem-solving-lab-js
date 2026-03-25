function solution(spell, dic) {
  const word = spell.sort().join('');
  return dic.some((v) => v.split('').sort().join('') === word) ? 1 : 2;
}
