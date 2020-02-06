import {Component, OnDestroy, OnInit} from '@angular/core';
import {faEdit, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import {Observable, Subscription} from "rxjs";
import {MeteorObservable} from "meteor-rxjs";
import {Meteor} from "meteor/meteor";
import {Category} from "../../../../../imports/models/category";
import {Categories} from "../../../../../imports/collections/categories";

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit, OnDestroy {

    deleteIcon = faTrash;
    addIcon = faPlus;
    editIcon = faEdit;

    categories: Observable<Category[]>;
    categoriesSubscription: Subscription;

    constructor() {
    }

    ngOnInit() {
        console.log("INIT");
        this.categoriesSubscription = MeteorObservable.subscribe('categories').subscribe(() => {
            console.log("SUB categories");
            this.categories = Categories.find();
            console.log("RESPONSE categories", this.categories);
        });
    }

    ngOnDestroy() {
        if (this.categoriesSubscription) {
            this.categoriesSubscription.unsubscribe();
        }
    }

    removeCategory(_id: string) {
        Meteor.call('removeCategory', _id);
    }

    editCategory(_id: string) {

    }
}
