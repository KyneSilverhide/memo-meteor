import {Meteor} from 'meteor/meteor';
import {Categories} from "../../../imports/collections/categories";

Meteor.publish('categories', function () {
    const selector = buildQuery(this.userId);
    return Categories.find(selector);
});

Meteor.publish('category', function (categoryId: string) {
  return Categories.find(buildQuery(this.userId, categoryId));
});

function buildQuery(userId: string, categoryId?: string): Object {
    const canAccess = {
        $and: [{
            owner: userId
        }, {
            owner: {
                $exists: true
            }
        }]
    };
    if (categoryId) {
        return {
            $and: [{
                _id: categoryId
            },
                canAccess
            ]
        };
    }
    return canAccess;
}