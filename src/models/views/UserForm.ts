import User, { UserProps } from '../User';
import View from './View';

export default class UserForm extends View<User, UserProps> {
    public eventsMap(): {
        [key: string]: () => void;
    } {
        return {
            'click:.set-age': this.onSetAgeClick,
            'click:.set-name': this.onSetNameClick,
            'click:.save-model': this.onSaveClick,
        };
    }

    public onSaveClick(): void {
        this.model.save();
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
                <input placeholder="${this.model.get('name')}"/>
                <button class="set-name">Change Name</button>
                <button class="set-age">Set Random Age</button>
                <button class="save-model">Save User</button>
            </div>
        `;
    }
}
