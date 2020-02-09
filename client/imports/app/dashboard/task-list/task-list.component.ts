import { Component, OnDestroy, OnInit } from '@angular/core';
import { MeteorObservable } from 'meteor-rxjs';
import { Observable, Subscription } from 'rxjs';
import { Categories } from '../../../../../imports/collections/categories';
import { Category } from '../../../../../imports/models/category';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, OnDestroy {
  private categoriesSubscription: Subscription;

  private categories: Observable<Category[]>;

  constructor() {
    /**/
  }

  ngOnInit() {
    this.categoriesSubscription = MeteorObservable.subscribe('categories').subscribe(() => {
      this.categories = Categories.find();
    });
  }

  ngOnDestroy(): void {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
  }
}
