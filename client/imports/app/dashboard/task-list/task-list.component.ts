import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { MeteorObservable } from 'meteor-rxjs';
import { Observable, Subscription } from 'rxjs';
import { Categories } from '../../../../../imports/collections/categories';
import { Category } from '../../../../../imports/models/category';
import { Task, TaskByCategory } from '../../../../../imports/models/task';
import { faCheck, faEdit, faInfo, faPlus, faSun, faUndo } from '@fortawesome/free-solid-svg-icons';
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
  infoIcon = faInfo;
  allDoneIcon = faSun;

  categories: Observable<Category[]>;
  tasks: TaskByCategory;
  taskCount: number;
  completedTaskCount: number;
  displayedTaskCount: number;

  private categoriesSubscription: Subscription;
  private tasksSubscription: Subscription;
  editIcon = faEdit;
  cancelIcon = faUndo;
  completeIcon = faCheck;
  hideCompletedTasks = true;

  constructor(private router: Router, private toastService: ToastService, private zone: NgZone) {
    /**/
  }

  ngOnInit(): void {
    this.categoriesSubscription = MeteorObservable.subscribe('categories').subscribe(() => {
      this.categories = Categories.find();
    });
    this.tasksSubscription = MeteorObservable.subscribe('tasks').subscribe(() => {
      const dbTasks = Tasks.find().fetch();
      this.taskCount = dbTasks.length;
      this.completedTaskCount = dbTasks.filter(task => task.done).length;
      this.displayedTaskCount = dbTasks.filter(task => !this.hideCompletedTasks || !task.done).length;
      this.tasks = this.buildTaskByCategories(dbTasks);
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
