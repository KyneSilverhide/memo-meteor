import { Meteor } from 'meteor/meteor';

import { Tasks } from '../../../imports/collections/tasks';
import { buildItemQuery, buildUserQuery } from './query-utils';

Meteor.publish('tasks', () => {
  const selector = buildUserQuery(this.Meteor.userId());
  return Tasks.find(selector);
});

Meteor.publish('task', (taskId: string) => {
  return Tasks.find(buildItemQuery(this.Meteor.userId(), taskId));
});
