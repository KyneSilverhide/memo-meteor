import { Meteor } from 'meteor/meteor';
import { Categories } from '../../../imports/collections/categories';

function buildQuery(userId: string, categoryId?: string): Record<string, any> {
  const canAccess = {
    $and: [
      {
        owner: userId
      },
      {
        owner: {
          $exists: true
        }
      }
    ]
  };
  if (categoryId) {
    return {
      $and: [
        {
          _id: categoryId
        },
        canAccess
      ]
    };
  }
  return canAccess;
}

Meteor.publish('categories', () => {
  const selector = buildQuery(this.Meteor.userId());
  return Categories.find(selector);
});

Meteor.publish('category', (categoryId: string) => {
  return Categories.find(buildQuery(this.Meteor.userId(), categoryId));
});
