function solution(participant, completion) {
  const participantCount = {};

  for (const p of participant) {
    participantCount[p] = (participantCount[p] || 0) + 1;
  }

  for (const c of completion) {
    participantCount[c]--;
  }

  for (const [person, count] of Object.entries(participantCount)) {
    if (count > 0) return person;
  }
}
