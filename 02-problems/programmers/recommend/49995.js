function solution(cookie) {
  let answer = 0;

  for (let border = 1; border < cookie.length; border++) {
    let left = border - 1;
    let leftSum = cookie[left];
    let right = border;
    let rightSum = cookie[right];

    while (left >= 0 && right < cookie.length) {
      if (leftSum <= rightSum) {
        if (leftSum === rightSum) {
          answer = Math.max(answer, leftSum);
        }
        leftSum += cookie[--left];
      } else {
        rightSum += cookie[++right];
      }
    }
  }

  return answer;
}
