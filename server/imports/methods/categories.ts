import { Meteor } from 'meteor/meteor';
import { Categories } from '../../../imports/collections/categories';
import { Tasks } from '../../../imports/collections/tasks';

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
    Tasks.remove({
      categoryId: _id
    });
    Categories.remove({
      _id
    });
  }
});
