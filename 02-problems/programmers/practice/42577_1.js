function solution(phone_book) {
  const set = new Set();

  phone_book.sort();

  for (const num of phone_book) {
    for (let i = 0; i < num.length; i++) {
      if (set.has(num.slice(0, i + 1))) {
        return false;
      }
    }
    set.add(num);
  }

  return true;
}
