interface IUser {
    name?: string;
    age?: number;
}

export default class User {
    constructor(private data: IUser) {}

    public get(propName: string): string | number {
        return this.data[propName];
    }

    public set(update: IUser): void {
        Object.assign(this.data, update);
    }
}
