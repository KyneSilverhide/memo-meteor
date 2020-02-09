import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { SharedModule } from '../shared/shared.module';
import { CategoryDeleteComponent } from './category-form/category-delete/category-delete.component';

@NgModule({
  declarations: [CategoryFormComponent, CategoryListComponent, CategoryDeleteComponent],
  imports: [CommonModule, CategoryRoutingModule, SharedModule],
  entryComponents: [CategoryDeleteComponent]
})
export class CategoryModule {}
