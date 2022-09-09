import User from '../User';
export default class UserForm {
    constructor(private parent: HTMLElement, private model: User) {
        this.bindModel();
    }

    private bindModel(): void {
        this.model.on('change', () => {
            this.render();
        });
    }

    private eventsMap(): {
        [key: string]: () => void;
    } {
        return {
            'click:.set-age': this.onSetAgeClick,
            'click:.set-name': this.onSetNameClick,
        };
    }

    private onSetAgeClick(): void {
        this.model.setRandomAge();
    }

    private onSetNameClick(): void {
        const input = this.parent.querySelector('input')!;

        const name = input.value;

        this.model.set({ name });
    }

    public template(): string {
        return `
            <div>
                <h1>User Form</h1>
                <div>User name: ${this.model.get('name')}</div>
                <div>User age: ${this.model.get('age')}</div>
                <input placeholder="${this.model.get('name')}"/>
                <button class="set-name">Change Name</button>
                <button class="set-age">Set Random Age</button>
            </div>
        `;
    }

    private bindEvents(fragment: DocumentFragment): void {
        const eventsMap = this.eventsMap();

        for (let eventKey in eventsMap) {
            const [eventName, selector] = eventKey.split(':');

            fragment.querySelectorAll(selector).forEach((element) => {
                element.addEventListener(
                    eventName,
                    eventsMap[eventKey].bind(this) // binding the context of this
                );
            });
        }
    }

    public render(): void {
        this.parent.innerHTML = '';

        const templateElement = document.createElement('template');
        templateElement.innerHTML = this.template();

        this.bindEvents(templateElement.content);

        this.parent.append(templateElement.content);
    }
}
