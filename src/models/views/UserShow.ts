import View from './View';
import User, { UserProps } from '../User';

export default class UserShow extends View<User, UserProps> {
    public template(): string {
        return `
        <div>
            <h1>User Details</h1>
            <div>User Name: ${this.model.get('name')}</div>
            <div>User Age: ${this.model.get('age')}</div>
        </div>
        `;
    }
}
