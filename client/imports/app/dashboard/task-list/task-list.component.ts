import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { MeteorObservable } from 'meteor-rxjs';
import { Observable, Subscription } from 'rxjs';
import { Categories } from '../../../../../imports/collections/categories';
import { Category } from '../../../../../imports/models/category';
import { Task, TaskByCategory } from '../../../../../imports/models/task';
import { faCheck, faEdit, faPlus, faUndo } from '@fortawesome/free-solid-svg-icons';
import { Tasks } from '../../../../../imports/collections/tasks';
import { Router } from '@angular/router';
import { Meteor } from 'meteor/meteor';
import { ToastService } from '../../shared/services/toast.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, OnDestroy {
  addIcon = faPlus;

  categories: Observable<Category[]>;
  tasks: TaskByCategory;

  private categoriesSubscription: Subscription;
  private tasksSubscription: Subscription;
  editIcon = faEdit;
  cancelIcon = faUndo;
  completeIcon = faCheck;

  constructor(private router: Router, private toastService: ToastService, private zone: NgZone) {
    /**/
  }

  ngOnInit(): void {
    this.categoriesSubscription = MeteorObservable.subscribe('categories').subscribe(() => {
      this.categories = Categories.find();
    });
    this.tasksSubscription = MeteorObservable.subscribe('tasks').subscribe(() => {
      this.tasks = this.buildTaskByCategories(Tasks.find().fetch());
    });
  }

  private buildTaskByCategories(tasks: Task[]): TaskByCategory {
    const tasksCache: TaskByCategory = {};
    tasks.forEach(task => {
      if (!tasksCache[task.categoryId]) {
        tasksCache[task.categoryId] = [];
      }
      tasksCache[task.categoryId].push(task);
    });
    return tasksCache;
  }

  ngOnDestroy(): void {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
    if (this.tasksSubscription) {
      this.tasksSubscription.unsubscribe();
    }
  }

  editTask(task: Task): void {
    this.router.navigate(['/dashboard/edit'], {
      queryParams: { taskId: task._id }
    });
  }

  cancelTask(task: Task): void {
    task.done = false;
    Meteor.call('cancelTask', task._id, error => {
      this.zone.run(() => {
        if (!error) {
          this.toastService.success('Task ' + task.title + ' canceled !');
        } else {
          this.toastService.error(error);
        }
      });
    });
  }

  completeTask(task: Task): void {
    task.done = true;
    Meteor.call('completeTask', task._id, error => {
      this.zone.run(() => {
        if (!error) {
          this.toastService.success('Task ' + task.title + ' completed !');
        } else {
          this.toastService.error(error);
        }
      });
    });
  }
}
