import { CategoryListComponent } from './category-list/category-list.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { CategoryFormComponent } from '../shared/components/category-form/category-form.component';

export const categoryRoutes = [
  {
    path: 'categories/add',
    component: CategoryFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'categories/edit',
    component: CategoryFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'categories',
    component: CategoryListComponent,
    canActivate: [AuthGuard]
  }
];
