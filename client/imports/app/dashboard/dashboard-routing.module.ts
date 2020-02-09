import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { PageNotFoundComponent } from '../shared/components/page-not-found/page-not-found.component';
import { TaskFormComponent } from './task-form/task-form.component';

const routes = [
  {
    path: '',
    component: TaskListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add',
    component: TaskFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit',
    component: TaskFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashBoardRoutingModule {}
