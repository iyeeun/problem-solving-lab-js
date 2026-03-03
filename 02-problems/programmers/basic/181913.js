function solution(my_string, queries) {
  for (const [s, e] of queries) {
    const reversed = my_string
      .slice(s, e + 1)
      .split('')
      .reverse()
      .join('');
    my_string = my_string.slice(0, s) + reversed + my_string.slice(e + 1);
  }
  return my_string;
}
