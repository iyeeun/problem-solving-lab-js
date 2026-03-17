function solution(cipher, code) {
  return [...cipher].filter((_, idx) => (idx + 1) % code === 0).join('');
}
