import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './task-list/task-list.component';
import { SharedModule } from '../shared/shared.module';
import { TaskFormComponent } from './task-form/task-form.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [TaskListComponent, TaskFormComponent],
  imports: [CommonModule, SharedModule, RouterModule]
})
export class DashboardModule {}
