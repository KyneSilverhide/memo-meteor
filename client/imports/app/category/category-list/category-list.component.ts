import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {faEdit, faInfo, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import {Observable, Subscription} from "rxjs";
import {MeteorObservable} from "meteor-rxjs";
import {Meteor} from "meteor/meteor";
import {Category} from "../../../../../imports/models/category";
import {Categories} from "../../../../../imports/collections/categories";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CategoryDeleteComponent} from "../category-form/category-delete/category-delete.component";
import {ToastService} from "../../shared/services/toast.service";

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit, OnDestroy {

    deleteIcon = faTrash;
    addIcon = faPlus;
    editIcon = faEdit;
    infoIcon = faInfo;

    categories: Observable<Category[]>;
    categoriesSubscription: Subscription;

    constructor(private router: Router, private modalService: NgbModal, private toastService: ToastService, private zone: NgZone) {
    }

    ngOnInit() {
        this.categoriesSubscription = MeteorObservable.subscribe('categories').subscribe(() => {
            this.categories = Categories.find();
        });
    }

    ngOnDestroy() {
        if (this.categoriesSubscription) {
            this.categoriesSubscription.unsubscribe();
        }
    }

    removeCategory(category: Category) {
        const deleteModalRef = this.modalService.open(CategoryDeleteComponent, {centered: true});
        deleteModalRef.result.then((value) => {
            if (value === true) {
                Meteor.call('removeCategory', category._id, (error) => {
                    if (!error) {
                        this.zone.run(() => this.toastService.success("Category deleted !"));
                    } else {
                        this.zone.run(() => this.toastService.error(error));
                    }
                });
            }
        }, () => {
            // Dismissed
        });
        deleteModalRef.componentInstance.categoryName = category.name;
    }

    editCategory(id: string) {
        this.router.navigate(['/categories/edit'], {queryParams: {categoryId: id}});
    }
}
