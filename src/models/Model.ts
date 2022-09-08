import { AxiosPromise, AxiosResponse } from 'axios';

interface ModelAttributes<T> {
    get<K extends keyof T>(key: K): T[K];
    getAll(): T;
    set(value: T): void;
}
interface Sync<T> {
    fetch(id: number): AxiosPromise;
    save(data: T): AxiosPromise;
}
interface Events {
    on(eventName: string, callback: () => void): void;
    trigger(eventName: string): void;
}

interface HasId {
    id?: number;
}

export default class Model<T extends HasId> {
    constructor(
        private attributes: ModelAttributes<T>,
        private events: Events,
        private sync: Sync<T>
    ) {}

    public get get() {
        return this.attributes.get.bind(this.attributes); // binding the context of this.attribu
    }

    public set(update: T): void {
        this.attributes.set(update);
        this.trigger('change');
    }

    public get on() {
        return this.events.on.bind(this.events); // returning a reference of the method to be called
    }

    public get trigger() {
        return this.events.trigger.bind(this.events);
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
