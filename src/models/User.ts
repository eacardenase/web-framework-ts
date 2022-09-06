import axios, { AxiosResponse } from 'axios';

interface UserProps {
    id?: number;
    name?: string;
    age?: number;
}

type Callback = () => void;

const BASE_URL = 'http://localhost:3000';
export default class User {
    private events: {
        [key: string]: Callback[];
    } = {};

    constructor(private data: UserProps) {}

    public get(propName: string): string | number {
        return this.data[propName];
    }

    public set(update: UserProps): void {
        Object.assign(this.data, update);
    }

    public on(eventName: string, callback: Callback): void {
        const handlers = this.events[eventName] || [];

        handlers.push(callback);

        this.events[eventName] = handlers;
    }

    public trigger(eventName: string): void {
        const handlers = this.events[eventName];

        if (!handlers || handlers.length === 0) {
            return;
        }

        handlers.forEach((cb) => {
            cb();
        });
    }

    public fetch(): void {
        axios
            .get(`${BASE_URL}/users/${this.get('id')}`)
            .then((res: AxiosResponse): void => {
                this.set(res.data);
            });
    }

    public save(): void {
        const id = this.get('id');

        if (id) {
            axios.put(`${BASE_URL}/users/${id}`, this.data);
        } else {
            axios.post(`${BASE_URL}/users`, this.data);
        }
    }
}
