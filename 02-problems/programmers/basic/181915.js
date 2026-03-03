function solution(my_string, index_list) {
  const charList = [];

  for (const i of index_list) {
    charList.push(my_string[i]);
  }

  return charList.join('');
}
