const changeName = (user, newName) => {
  const newUser = user;
  newUser.name = newName;
  return newUser;
};

const user = {
  name: 'Alice',
  gender: 'Female',
};

const user2 = changeName(user, 'Amy');

console.log(user.name, user2.name); // Amy Amy
console.log(user === user2); // true
if (user !== user2) {
  console.log('Username changed.');
}
