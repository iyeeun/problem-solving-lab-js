const changeName = (user, newName) => {
  return { ...user, name: newName };
};

const user = {
  name: 'Alice',
  gender: 'Female',
};

const user2 = changeName(user, 'Amy');

console.log(user.name, user2.name); // Alice Amy
console.log(user === user2); // false
if (user !== user2) {
  console.log('Username changed.'); // Username changed.
}
