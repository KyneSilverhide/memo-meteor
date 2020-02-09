import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { faBackspace, faSave } from '@fortawesome/free-solid-svg-icons';
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

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit, OnDestroy {
  saveIcon = faSave;
  backIcon = faBackspace;

  taskForm = this.fb.group({
    title: ['', Validators.required],
    content: [''],
    categoryId: ['', Validators.required]
  });

  taskId: string;
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
    this.zone
      .run(() => this.router.navigateByUrl('/dashboard'))
      .then(() => {
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
}
