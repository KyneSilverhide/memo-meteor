import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { faEdit, faInfo, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subscription } from 'rxjs';
import { MeteorObservable } from 'meteor-rxjs';
import { Meteor } from 'meteor/meteor';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from '../../../../../imports/models/category';
import { Categories } from '../../../../../imports/collections/categories';
import { CategoryDeleteComponent } from '../category-form/category-delete/category-delete.component';
import { ToastService } from '../../shared/services/toast.service';

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

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private toastService: ToastService,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.categoriesSubscription = MeteorObservable.subscribe('categories').subscribe(() => {
      this.categories = Categories.find();
    });
  }

  ngOnDestroy(): void {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
  }

  removeCategory(category: Category): void {
    const deleteModalRef = this.modalService.open(CategoryDeleteComponent, {
      centered: true
    });
    deleteModalRef.result.then(
      value => {
        if (value === true) {
          this.removeCategoryNow(category);
        }
      },
      () => {
        // Dismissed
      }
    );
    deleteModalRef.componentInstance.categoryName = category.name;
    deleteModalRef.componentInstance.categoryId = category._id;
  }

  private removeCategoryNow(category: Category): void {
    Meteor.call('removeCategory', category._id, error => {
      this.zone.run(() => {
        if (!error) {
          this.toastService.success('Category deleted !');
        } else {
          this.toastService.error(error);
        }
      });
    });
  }

  editCategory(id: string): void {
    this.router
      .navigate(['/categories/edit'], {
        queryParams: { categoryId: id }
      })
      .then(() => {
        /**/
      });
  }
}
