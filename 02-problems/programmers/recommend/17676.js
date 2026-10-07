function solution(lines) {
  let answer = -1;
  const times = [];

  for (const l of lines) {
    const [_, responseTime, durationSeconds] = l.split(' ');
    const [h, m, seconds] = responseTime.split(':');
    const [s, ms] = seconds.split('.');
    const durationMs = durationSeconds.replace('s', '') * 1000;

    const endTime = 1000 * (60 * 60 * +h + 60 * +m + +s) + +ms;
    const startTime = endTime - durationMs + 1;

    times.push([startTime, endTime]);
  }

  for (let i = 0; i < times.length; i++) {
    let processing = 1;
    for (let j = i + 1; j < times.length; j++) {
      if (times[j][0] <= times[i][1] + 999) {
        processing++;
      }
    }
    answer = Math.max(processing, answer);
  }

  return answer;
}
