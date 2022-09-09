import Model from './Model';
import Attributes from './Attributes';
import APISync from './APISync';
import EventHandler from './EventHandler';
import Collection from './Collection';

export interface UserProps {
    id?: number;
    name?: string;
    age?: number;
}

const ROOT_URL = 'http://localhost:3000/users';

export default class User extends Model<UserProps> {
    public static buildUser(attrs: UserProps): User {
        return new User(
            new Attributes<UserProps>(attrs),
            new EventHandler(),
            new APISync<UserProps>(ROOT_URL)
        );
    }

    public static buildUserCollection(): Collection<User, UserProps> {
        return new Collection<User, UserProps>(ROOT_URL, (json: UserProps) =>
            User.buildUser(json)
        );
    }

    public setRandomAge(): void {
        const age = Math.floor(Math.random() * 100);

        this.set({ age });
    }
}
