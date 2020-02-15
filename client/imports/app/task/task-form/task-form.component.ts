import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { faBackspace, faCheck, faSave, faTrash, faUndo } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../shared/services/toast.service';
import { MeteorObservable } from 'meteor-rxjs';
import { Categories } from '../../../../../imports/collections/categories';
import { Meteor } from 'meteor/meteor';
import { Category } from '../../../../../imports/models/category';
import { Tasks } from '../../../../../imports/collections/tasks';
import { TaskDeleteComponent } from './task-delete/task-delete.component';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit, OnDestroy {
  saveIcon = faSave;
  backIcon = faBackspace;
  cancelIcon = faUndo;
  completeIcon = faCheck;
  deleteIcon = faTrash;

  taskForm = this.fb.group({
    title: ['', Validators.required],
    content: [''],
    categoryId: ['', Validators.required]
  });

  taskId: string;
  done: boolean;
  categorySubscription: Subscription;
  taskSubscription: Subscription;
  userCategories: Observable<Category[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private zone: NgZone,
    private modalService: NgbModal,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.categorySubscription = MeteorObservable.subscribe('categories').subscribe(() => {
      this.userCategories = Categories.find();
    });

    this.route.queryParams.subscribe(params => {
      if (params.taskId) {
        this.taskId = params.taskId;
        this.taskSubscription = MeteorObservable.subscribe('task', params.taskId).subscribe(() => {
          const task = Tasks.findOne({ _id: this.taskId });
          this.done = task.done;
          this.taskForm.patchValue({
            title: task.title,
            content: task.content,
            categoryId: task.categoryId
          });
        });
      }
    });
  }

  saveTask(): void {
    if (this.taskForm.valid) {
      const title = this.taskForm.get(['title']).value;
      const content = this.taskForm.get(['content']).value;
      const categoryId = this.taskForm.get(['categoryId']).value;
      if (this.taskId != null) {
        this.updateTask(this.taskId, title, categoryId, content);
      } else {
        this.createTask(title, categoryId, content);
      }
    }
  }

  goBackToList(): void {
    this.router.navigateByUrl('/tasks').then(() => {
      /**/
    });
  }

  private createTask(title, categoryId, content): void {
    Meteor.call('addTask', title, categoryId, content, error => {
      this.zone.run(() => {
        if (!error) {
          this.goBackToList();
          this.toastService.success('Task created !');
        } else {
          this.toastService.error(error);
        }
      });
    });
  }

  private updateTask(id, name, icon, color): void {
    Meteor.call('updateTask', id, name, icon, color, error => {
      this.zone.run(() => {
        if (!error) {
          this.goBackToList();
          this.toastService.success('Task edited !');
        } else {
          this.toastService.error(error);
        }
      });
    });
  }

  ngOnDestroy(): void {
    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    }
    if (this.taskSubscription) {
      this.taskSubscription.unsubscribe();
    }
  }

  cancelTask(): void {
    Meteor.call('cancelTask', this.taskId, error => {
      this.zone.run(() => {
        if (!error) {
          this.done = false;
          this.toastService.success('Task ' + this.taskForm.get(['title']).value + ' canceled !');
        } else {
          this.toastService.error(error);
        }
      });
    });
  }

  completeTask(): void {
    Meteor.call('completeTask', this.taskId, error => {
      this.zone.run(() => {
        if (!error) {
          this.done = true;
          this.toastService.success('Task ' + this.taskForm.get(['title']).value + ' completed !');
        } else {
          this.toastService.error(error);
        }
      });
    });
  }

  deleteTask(): void {
    const deleteModalRef = this.modalService.open(TaskDeleteComponent, {
      centered: true
    });
    deleteModalRef.result.then(
      value => {
        if (value === true) {
          this.deleteTaskNow();
        }
      },
      () => {
        // Dismissed
      }
    );
    deleteModalRef.componentInstance.taskName = this.taskForm.get(['title']).value;
  }

  private deleteTaskNow(): void {
    Meteor.call('removeTask', this.taskId, error => {
      this.zone.run(() => {
        if (!error) {
          this.toastService.success('Task ' + this.taskForm.get(['title']).value + ' deleted !');
          this.goBackToList();
        } else {
          this.toastService.error(error);
        }
      });
    });
  }
}
