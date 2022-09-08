import axios from 'axios';

import User, { UserProps } from './User';
import EventHandler from './EventHandler';
import { AxiosResponse } from 'axios';

export default class Collection {
    public models: User[] = [];
    public events: EventHandler = new EventHandler();

    constructor(private rootUrl: string) {}

    public get on() {
        return this.events.on;
    }

    public get trigger() {
        return this.events.trigger;
    }

    public fetch(): void {
        axios.get(this.rootUrl).then((response: AxiosResponse) => {
            response.data.forEach((value: UserProps) => {
                const user = User.buildUser(value);
                this.models.push(user);
            });
        });

        this.trigger('change');
    }
}
