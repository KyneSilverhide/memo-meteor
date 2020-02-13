import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MeteorObservable } from 'meteor-rxjs';
import { Subscription } from 'rxjs';
import { Tasks } from '../../../../../../imports/collections/tasks';

@Component({
  selector: 'app-category-delete',
  templateUrl: './category-delete.component.html',
  styleUrls: ['./category-delete.component.scss']
})
export class CategoryDeleteComponent implements OnInit, OnDestroy {
  @Input() categoryName: string;
  @Input() categoryId: number;

  public taskCount: number;
  private tasksSubscription: Subscription;
  constructor(public activeModal: NgbActiveModal) {
    /**/
  }

  ngOnInit(): void {
    this.tasksSubscription = MeteorObservable.subscribe('tasks').subscribe(() => {
      this.taskCount = Tasks.find({ categoryId: this.categoryId }).fetch().length;
    });
  }

  ngOnDestroy(): void {
    if (this.tasksSubscription) {
      this.tasksSubscription.unsubscribe();
    }
  }
}
