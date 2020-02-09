import { Meteor } from 'meteor/meteor';
import { Categories } from '../../../imports/collections/categories';

Meteor.methods({
  addCategory(name: string, icon: string, color: string) {
    if (!this.userId) {
      return;
    }
    Categories.insert({
      name,
      icon,
      color,
      owner: this.userId
    });
  },
  updateCategory(id: string, name: string, icon: string, color: string) {
    if (!this.userId || !id) {
      return;
    }
    Categories.update(
      { _id: id },
      {
        $set: {
          name,
          icon,
          color
        }
      }
    );
  },
  removeCategory(_id: string) {
    if (!this.userId) {
      return;
    }
    Categories.remove({
      _id
    });
  }
});
