export default class UserForm {
    constructor(private parent: HTMLElement) {}

    public template(): string {
        return `
            <div>
                <h1>User Form</h1>
                <input />
            </div>
        `;
    }

    public render(): void {
        const templateElement = document.createElement('template');
        templateElement.innerHTML = this.template();

        this.parent.append(templateElement.content);
    }
}
