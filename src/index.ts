import User from './models/User';
import UserEdit from './models/views/UserEdit';

const user = User.buildUser({
    name: 'Edwin Alexander',
    age: 26,
});

const userEdit = new UserEdit(document.getElementById('root')!, user);

userEdit.render();

console.log(userEdit);
