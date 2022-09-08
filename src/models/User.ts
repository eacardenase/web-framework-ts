import EventHandler from './EventHandler';
import Sync from './Sync';

export interface UserProps {
    id?: number;
    name?: string;
    age?: number;
}

const ROOT_URL = 'http://localhost:3000/users';

export default class User {
    public events: EventHandler = new EventHandler();
    public sync: Sync<UserProps> = new Sync<UserProps>(ROOT_URL);

    constructor(private data: UserProps) {}

    public get(propName: string): string | number {
        return this.data[propName];
    }

    public set(update: UserProps): void {
        Object.assign(this.data, update);
    }
}
