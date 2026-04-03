function solution(s) {
  const stack = [];

  for (const v of s) {
    if (v === '(') {
      stack.push('(');
    } else if (v === ')') {
      if (stack.length > 0) stack.pop();
      else return false;
    }
  }

  return stack.length === 0;
}
