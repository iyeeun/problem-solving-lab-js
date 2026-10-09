function solution(s) {
  const stack = [];

  for (let i = 0; i < s.length; i++) {
    if (stack.length === 0 || stack.at(-1) !== s[i]) {
      stack.push(s[i]);
    } else if (stack.at(-1) === s[i]) {
      stack.pop();
    }
  }

  return stack.length === 0 ? 1 : 0;
}
