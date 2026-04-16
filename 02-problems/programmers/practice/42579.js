function solution(genres, plays) {
  const answer = [];

  const map = new Map();

  for (let i = 0; i < genres.length; i++) {
    if (!map.has(genres[i])) {
      map.set(genres[i], { total: 0, songs: [] });
    }
    map.get(genres[i]).total += plays[i];
    map.get(genres[i]).songs.push(i);
  }

  const sorted = [...map.entries()].sort((a, b) => b[1].total - a[1].total);

  for (const [genre, count] of sorted) {
    const selected = count.songs
      .sort((a, b) => {
        if (plays[a] === plays[b]) return a - b;
        return plays[b] - plays[a];
      })
      .slice(0, 2);
    answer.push(...selected);
  }

  return answer;
}
