export default class Attributes<T extends {}> {
    constructor(private data: T) {}

    // using generics constrains with methods definitions
    public get<K extends keyof T>(key: K): T[K] {
        return this.data[key];
    }

    public set(update: T): void {
        Object.assign(this.data, update);
    }
}
