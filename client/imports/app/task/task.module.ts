import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './task-list/task-list.component';
import { SharedModule } from '../shared/shared.module';
import { TaskFormComponent } from './task-form/task-form.component';
import { RouterModule } from '@angular/router';
import { TaskDeleteComponent } from './task-form/task-delete/task-delete.component';
import { NoCategoryInfoComponent } from './task-list/no-category-info/no-category-info.component';
import { TaskListActionsComponent } from './task-list/task-list-actions/task-list-actions.component';
import { NoTaskInfoComponent } from './task-list/no-task-info/no-task-info.component';
import { TaskDisplayComponent } from './task-list/task-display/task-display.component';

@NgModule({
  declarations: [
    TaskListComponent,
    TaskFormComponent,
    TaskDeleteComponent,
    NoCategoryInfoComponent,
    TaskListActionsComponent,
    NoTaskInfoComponent,
    TaskDisplayComponent
  ],
  imports: [CommonModule, SharedModule, RouterModule],
  entryComponents: [TaskDeleteComponent]
})
export class TaskModule {}
