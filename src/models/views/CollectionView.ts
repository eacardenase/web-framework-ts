import Collection from '../Collection';

export default abstract class CollectionView<T, K> {
    constructor(
        public parent: HTMLElement,
        public collection: Collection<T, K>
    ) {}

    public abstract renderItem(model: T, itemParent: HTMLElement): void;

    public render(): void {
        this.parent.innerHTML = '';

        const templateElement = document.createElement('template');

        for (let model of this.collection.models) {
            const itemParent = document.createElement('div');

            this.renderItem(model, itemParent);

            templateElement.content.append(itemParent);
        }

        this.parent.append(templateElement.content);
    }
}
