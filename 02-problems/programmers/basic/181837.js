function convertMenu(str) {
  if (str.includes('americano')) {
    return 'americano';
  } else if (str.includes('cafelatte')) {
    return 'cafelatte';
  }

  return 'americano';
}

function solution(order) {
  let answer = 0;
  const price = {
    americano: 4500,
    cafelatte: 5000,
  };

  for (const o of order) {
    answer += price[convertMenu(o)];
  }

  return answer;
}
