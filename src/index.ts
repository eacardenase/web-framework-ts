import User from './models/User';

const user = new User({
    name: 'Edwin',
    age: 26,
});

user.on('change', () => {
    console.log('change 1');
});
user.on('change', () => {
    console.log('change 2');
});
user.on('randomKey', () => {
    console.log('random Event');
});

user.trigger('randomKey');
user.trigger('change');
