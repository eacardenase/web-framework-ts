import User from './models/User';

const user = new User({
    id: 1,
    name: 'Ana Maria',
    age: 24,
});

user.on('save', () => {
    console.log(user);
});

user.save();
