import User from './models/User';

const user = new User({
    name: 'Ana Maria Torres',
    age: 24,
});

user.events.on('save', () => {
    console.log('User saved');
});

user.events.trigger('save');

// console.log(user);
