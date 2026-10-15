function solution(cards1, cards2, goal) {
  let answer = 'Yes';

  let [idx1, idx2] = [0, 0];

  for (const word of goal) {
    if (word === cards1[idx1]) {
      idx1++;
    } else if (word === cards2[idx2]) {
      idx2++;
    } else {
      answer = 'No';
      break;
    }
  }

  return answer;
}
