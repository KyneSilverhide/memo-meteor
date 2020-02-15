import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { MeteorObservable } from 'meteor-rxjs';
import { Observable, Subscription } from 'rxjs';
import { Categories } from '../../../../../imports/collections/categories';
import { Category } from '../../../../../imports/models/category';
import { Task, TaskByCategory } from '../../../../../imports/models/task';
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
  categories: Observable<Category[]>;
  tasks: TaskByCategory;
  taskCount: number;
  completedTaskCount: number;
  displayedTaskCount: number;

  private categoriesSubscription: Subscription;
  private tasksSubscription: Subscription;
  hideCompletedTasks = true;

  constructor(private router: Router, private toastService: ToastService, private zone: NgZone) {
    /**/
  }

  ngOnInit(): void {
    this.categoriesSubscription = MeteorObservable.subscribe('categories').subscribe(() => {
      this.categories = Categories.find();
    });

    this.tasksSubscription = MeteorObservable.subscribe('tasks').subscribe(() => {
      Tasks.find().subscribe(dbTasks => {
        this.taskCount = dbTasks.length;
        this.completedTaskCount = dbTasks.filter(task => task.done).length;
        this.displayedTaskCount = dbTasks.filter(task => !this.hideCompletedTasks || !task.done).length;
        this.tasks = this.buildTaskByCategories();
      });
    });
  }

  private buildTaskByCategories(): TaskByCategory {
    const tasksCache: TaskByCategory = {};
    Categories.find()
      .fetch()
      .forEach(category => {
        tasksCache[category._id] = Tasks.find({ categoryId: category._id }).fetch();
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
    this.router.navigate(['/tasks/edit'], {
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

  toggleCompletedTaskVisibility($event: boolean): void {
    this.hideCompletedTasks = $event;
  }
}
