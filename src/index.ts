import UserList from './models/views/UserList';
import Collection from './models/Collection';
import User, { UserProps } from './models/User';

const usersCollection = new Collection(
    'http://localhost:3000/users',
    (json: UserProps) => {
        return User.buildUser(json);
    }
);

usersCollection.on('change', () => {
    const root = document.getElementById('root')!;

    new UserList(root, usersCollection).render();
});

usersCollection.fetch();
