import { Meteor } from 'meteor/meteor';

import { Tasks } from '../../../imports/collections/tasks';

Meteor.methods({
  addTask(title: string, categoryId: string, content?: string) {
    if (!this.userId) {
      return;
    }
    Tasks.insert({
      title,
      content,
      categoryId,
      owner: this.userId,
      done: false
    });
  },
  updateTask(_id: string, title: string, categoryId: string, content?: string) {
    if (!this.userId) {
      return;
    }
    Tasks.update(
      { _id },
      {
        $set: {
          title,
          content,
          categoryId
        }
      }
    );
  },
  removeTask(_id: string) {
    Tasks.remove({
      _id
    });
  },
  completeTask(_id: string) {
    Tasks.update(
      { _id },
      {
        $set: {
          done: true
        }
      }
    );
  },
  cancelTask(_id: string) {
    Tasks.update(
      { _id },
      {
        $set: {
          done: false
        }
      }
    );
  }
});
