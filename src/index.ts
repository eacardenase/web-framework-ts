import User from './models/User';

const user = new User({
    name: 'Ana Maria Torres',
    age: 24,
});

user.save();

console.log(user);
