function solution(myString) {
  return [...myString]
    .map((v) => {
      if (v === 'a') {
        v = 'A';
      } else if (v !== 'A' && v.toUpperCase() === v) {
        v = v.toLowerCase();
      }
      return v;
    })
    .join('');
}
