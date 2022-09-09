import Model, { HasId } from '../Model';

export default abstract class View<T extends Model<K>, K extends HasId> {
    public regions: { [key: string]: HTMLElement } = {};

    constructor(public parent: HTMLElement, public model: T) {
        this.bindModel();
    }

    public abstract template(): string;

    public eventsMap(): { [key: string]: () => void } {
        return {};
    }

    public regionsMap(): { [key: string]: string } {
        return {};
    }

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

    public mapRegions(fragment: DocumentFragment): void {
        const regionsMap = this.regionsMap();

        for (let key in regionsMap) {
            const selector = regionsMap[key];

            this.regions[key] = fragment.querySelector(selector)!;
        }
    }

    public onRender(): void {}

    public render(): void {
        this.parent.innerHTML = '';

        const templateElement = document.createElement('template');
        templateElement.innerHTML = this.template();

        this.bindEvents(templateElement.content);
        this.mapRegions(templateElement.content);

        this.onRender();

        this.parent.append(templateElement.content);
    }
}
