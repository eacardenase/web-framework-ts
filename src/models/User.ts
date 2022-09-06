interface UserProps {
    name?: string;
    age?: number;
}

type Callback = () => void;

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
}
