import { Meteor } from 'meteor/meteor';

import { Tasks } from '../../../imports/collections/tasks';
import { buildItemQuery, buildUserQuery } from './query-utils';

Meteor.publish('tasks', function() {
  const selector = buildUserQuery(this.userId);
  return Tasks.find(selector);
});

Meteor.publish('task', function(taskId: string) {
  return Tasks.find(buildItemQuery(this.userId, taskId));
});
