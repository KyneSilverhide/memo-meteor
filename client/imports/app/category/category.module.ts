import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { SharedModule } from '../shared/shared.module';
import { CategoryDeleteComponent } from './category-form/category-delete/category-delete.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CategoryFormComponent, CategoryListComponent, CategoryDeleteComponent],
  imports: [CommonModule, SharedModule, RouterModule],
  entryComponents: [CategoryDeleteComponent]
})
export class CategoryModule {}
