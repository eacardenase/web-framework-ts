import EventHandler from './EventHandler';
import Sync from './Sync';
import Attributes from './Attributes';
import { Callback } from './EventHandler';
import { AxiosResponse } from 'axios';

export interface UserProps {
    id?: number;
    name?: string;
    age?: number;
}

const ROOT_URL = 'http://localhost:3000/users';

export default class User {
    private userEvents: EventHandler = new EventHandler();
    private sync: Sync<UserProps> = new Sync<UserProps>(ROOT_URL);
    private attributes: Attributes<UserProps>;

    constructor(attrs: UserProps) {
        this.attributes = new Attributes<UserProps>(attrs);
    }

    public get get() {
        return this.attributes.get.bind(this.attributes); // binding the context of this.attribu
    }

    public set(update: UserProps): void {
        this.attributes.set(update);
        this.trigger('change');
    }

    public get on() {
        return this.userEvents.on.bind(this.userEvents); // returning a reference of the method to be called
    }

    public get trigger() {
        return this.userEvents.trigger.bind(this.userEvents);
    }

    public fetch(): void {
        const id = this.get('id');

        if (typeof id !== 'number') {
            throw new Error('Cannot fetch without an id');
        }

        this.sync.fetch(id).then((response: AxiosResponse): void => {
            this.set(response.data);
        });
    }

    public save(): void {
        this.sync
            .save(this.attributes.getAll())
            .then((response: AxiosResponse): void => {
                this.trigger('save');
            })
            .catch(() => {
                this.trigger('error');
            });
    }
}
