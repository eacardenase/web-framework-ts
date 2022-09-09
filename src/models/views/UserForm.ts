import User, { UserProps } from '../User';
import View from './View';

export default class UserForm extends View<User, UserProps> {
    public eventsMap(): {
        [key: string]: () => void;
    } {
        return {
            'click:.set-age': this.onSetAgeClick,
            'click:.set-name': this.onSetNameClick,
        };
    }

    public onSetAgeClick(): void {
        this.model.setRandomAge();
    }

    public onSetNameClick(): void {
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
}
