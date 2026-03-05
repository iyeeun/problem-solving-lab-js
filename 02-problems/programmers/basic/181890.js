function solution(str_list) {
  const firstIdx = str_list.findIndex((v) => v === 'l' || v === 'r');

  if (firstIdx === -1) {
    return [];
  }

  if (str_list[firstIdx] === 'l') {
    return str_list.slice(0, firstIdx);
  } else if (str_list[firstIdx] === 'r') {
    return str_list.slice(firstIdx + 1);
  }
}
