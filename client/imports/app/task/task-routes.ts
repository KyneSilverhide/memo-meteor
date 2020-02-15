import { TaskListComponent } from './task-list/task-list.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { TaskFormComponent } from './task-form/task-form.component';

export const taskRoutes = [
  {
    path: 'tasks',
    component: TaskListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'tasks/add',
    component: TaskFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'tasks/edit',
    component: TaskFormComponent,
    canActivate: [AuthGuard]
  }
];
