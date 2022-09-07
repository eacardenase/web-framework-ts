import axios, { AxiosResponse } from 'axios';
import EventHandler from './EventHandler';

interface UserProps {
    id?: number;
    name?: string;
    age?: number;
}

const BASE_URL = 'http://localhost:3000';
export default class User {
    public events: EventHandler = new EventHandler();

    constructor(private data: UserProps) {}

    public get(propName: string): string | number {
        return this.data[propName];
    }

    public set(update: UserProps): void {
        Object.assign(this.data, update);
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
