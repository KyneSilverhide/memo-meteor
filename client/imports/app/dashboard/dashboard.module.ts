import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './task-list/task-list.component';
import { SharedModule } from '../shared/shared.module';
import { DashBoardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [TaskListComponent],
  imports: [CommonModule, DashBoardRoutingModule, SharedModule]
})
export class DashboardModule {}
