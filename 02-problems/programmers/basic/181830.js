function solution(arr) {
  const arrLen = arr.length;
  const innerLen = arr[0].length;

  if (arrLen < innerLen) {
    const extra = Array.from({ length: innerLen - arrLen }, () =>
      Array(innerLen).fill(0),
    );
    return [...arr, ...extra];
  } else if (arrLen > innerLen) {
    return arr.map((inner) => [...inner, ...Array(arrLen - innerLen).fill(0)]);
  }

  return arr;
}
