import { Meteor } from 'meteor/meteor';
import { Categories } from '../../../imports/collections/categories';
import { buildItemQuery, buildUserQuery } from './query-utils';

Meteor.publish('categories', function() {
  const selector = buildUserQuery(this.userId);
  return Categories.find(selector);
});

Meteor.publish('category', function(categoryId: string) {
  return Categories.find(buildItemQuery(this.userId, categoryId));
});
