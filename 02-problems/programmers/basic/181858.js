function solution(arr, k) {
  const newArr = [...new Set(arr)].slice(0, k);

  return newArr.length === k
    ? newArr
    : newArr.concat(Array(k - newArr.length).fill(-1));
}
