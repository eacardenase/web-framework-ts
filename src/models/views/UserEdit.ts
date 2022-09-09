import View from './View';
import User, { UserProps } from '../User';
import UserForm from './UserForm';
import UserShow from './UserShow';

export default class UserEdit extends View<User, UserProps> {
    public regionsMap(): { [key: string]: string } {
        return {
            userShow: '.user-show',
            userForm: '.user-form',
        };
    }

    public template(): string {
        return `
            <div>
                <div class="user-show"></div>
                <div class="user-form"></div>
            </div>
        `;
    }

    public onRender(): void {
        new UserShow(this.regions.userShow, this.model).render();
        new UserForm(this.regions.userForm, this.model).render();
    }
}