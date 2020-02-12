import { TaskListComponent } from './task-list/task-list.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { TaskFormComponent } from './task-form/task-form.component';

export const DASHBOARDROUTES = [
  {
    path: 'dashboard',
    component: TaskListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard/add',
    component: TaskFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard/edit',
    component: TaskFormComponent,
    canActivate: [AuthGuard]
  }
];
