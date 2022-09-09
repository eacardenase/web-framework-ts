import CollectionView from './CollectionView';
import User, { UserProps } from '../User';
import UserShow from './UserShow';

export default class UserList extends CollectionView<User, UserProps> {
    public renderItem(model: User, itemParent: HTMLElement): void {
        new UserShow(itemParent, model).render();
    }
}
