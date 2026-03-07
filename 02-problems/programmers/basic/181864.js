function solution(myString, pat) {
  return Number(
    [...myString]
      .map((v) => (v === 'A' ? 'B' : 'A'))
      .join('')
      .includes(pat),
  );
}
