import User from './models/User';

const user = new User({
    name: 'Edwin',
    age: 26,
});

user.set({
    name: 'Edwin Alexander',
});

console.log(user.get('name'));
console.log(user.get('age'));
