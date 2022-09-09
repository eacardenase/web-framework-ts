import Model, { HasId } from '../Model';

export default abstract class View<T extends Model<K>, K extends HasId> {
    constructor(public parent: HTMLElement, public model: T) {
        this.bindModel();
    }

    public abstract template(): string;
    public abstract eventsMap(): { [key: string]: () => void };

    public bindModel(): void {
        this.model.on('change', () => {
            this.render();
        });
    }

    public bindEvents(fragment: DocumentFragment): void {
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

    public view() {}
}
