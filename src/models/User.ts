import EventHandler from './EventHandler';
import Sync from './Sync';
import Attributes from './Attributes';

export interface UserProps {
    id?: number;
    name?: string;
    age?: number;
}

const ROOT_URL = 'http://localhost:3000/users';

export default class User {
    public events: EventHandler = new EventHandler();
    public sync: Sync<UserProps> = new Sync<UserProps>(ROOT_URL);
    public attributes: Attributes<UserProps>;

    constructor(attrs: UserProps) {
        this.attributes = new Attributes<UserProps>(attrs);
    }
}
