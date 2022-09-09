import UserForm from './models/views/UserForm';
import User from './models/User';

const user = User.buildUser({
    name: 'Edwin Alexander',
    age: 26,
});

const userForm = new UserForm(document.getElementById('root')!, user);

userForm.render();
