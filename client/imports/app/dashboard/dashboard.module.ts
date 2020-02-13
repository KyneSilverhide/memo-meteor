import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './task-list/task-list.component';
import { SharedModule } from '../shared/shared.module';
import { TaskFormComponent } from './task-form/task-form.component';
import { RouterModule } from '@angular/router';
import { TaskDeleteComponent } from './task-form/task-delete/task-delete.component';

@NgModule({
  declarations: [TaskListComponent, TaskFormComponent, TaskDeleteComponent],
  imports: [CommonModule, SharedModule, RouterModule],
  entryComponents: [TaskDeleteComponent]
})
export class DashboardModule {}
