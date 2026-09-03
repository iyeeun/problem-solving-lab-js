function toMinutes(time) {
  const [h, m] = time.split(':');
  return +h * 60 + +m;
}

function toTime(minutes) {
  const h = Math.trunc(minutes / 60);
  const m = minutes % 60;

  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

function solution(n, t, m, timetable) {
  const buses = [];
  const rides = [];

  let first = toMinutes('09:00');

  for (let i = 0; i < n * t; i += t) {
    buses.push(first + i);
    rides.push([]);
  }

  timetable.sort();

  let targetBus = 0;
  let targetCrew = 0;

  while (targetBus < buses.length && targetCrew < timetable.length) {
    if (toMinutes(timetable[targetCrew]) <= buses[targetBus]) {
      rides[targetBus].push(timetable[targetCrew]);
      targetCrew++;
    } else {
      targetBus++;
    }

    if (rides[targetBus]?.length >= m) {
      targetBus++;
    }
  }

  if (rides[buses.length - 1].length >= m) {
    return toTime(toMinutes(rides[buses.length - 1].at(-1)) - 1);
  } else {
    return toTime(buses[buses.length - 1]);
  }
}
