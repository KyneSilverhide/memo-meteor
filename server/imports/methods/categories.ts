import {Meteor} from 'meteor/meteor';
import {Categories} from "../../../imports/collections/categories";

Meteor.methods({
    addCategory(name: string, icon: string, color: string) {
        if (!this.userId) {
            return;
        }
        Categories.insert({
            name: name,
            icon: icon,
            color: color,
            owner: this.userId
        });
    },
    removeCategory(_id: string) {
        if (!this.userId) {
            return;
        }
        Categories.remove({
            _id
        })
    }
});
