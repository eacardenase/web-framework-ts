import EventHandler from './EventHandler';
import axios, { AxiosResponse } from 'axios';

export default class Collection<T, K> {
    public models: T[] = [];
    public events: EventHandler = new EventHandler();

    constructor(private rootUrl: string, private deserialize: (json: K) => T) {}

    public get on() {
        return this.events.on;
    }

    public get trigger() {
        return this.events.trigger;
    }

    public fetch(): void {
        axios.get(this.rootUrl).then((response: AxiosResponse) => {
            response.data.forEach((value: K) => {
                this.models.push(this.deserialize(value));
            });
        });

        this.trigger('change');
    }
}
