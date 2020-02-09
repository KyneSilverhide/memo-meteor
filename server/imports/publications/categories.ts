import { Meteor } from 'meteor/meteor';
import { Categories } from '../../../imports/collections/categories';
import { buildItemQuery, buildUserQuery } from './query-utils';

Meteor.publish('categories', () => {
  const selector = buildUserQuery(this.Meteor.userId());
  return Categories.find(selector);
});

Meteor.publish('category', (categoryId: string) => {
  return Categories.find(buildItemQuery(this.Meteor.userId(), categoryId));
});
