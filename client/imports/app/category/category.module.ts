import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from './category-list/category-list.component';
import { SharedModule } from '../shared/shared.module';
import { CategoryDeleteComponent } from './category-list/category-delete/category-delete.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [CategoryListComponent, CategoryDeleteComponent],
  imports: [CommonModule, SharedModule, RouterModule, TranslateModule],
  exports: [],
  entryComponents: [CategoryDeleteComponent]
})
export class CategoryModule {}
