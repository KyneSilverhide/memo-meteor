import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoryRoutingModule} from "./category-routing.module";
import {CategoryFormComponent} from "./category-form/category-form.component";
import {CategoryListComponent} from "./category-list/category-list.component";
import {SharedModule} from "../shared/shared.module";

@NgModule({
    declarations: [
        CategoryFormComponent,
        CategoryListComponent,
    ],
    imports: [
        CommonModule,
        CategoryRoutingModule,
        SharedModule
    ]
})
export class CategoryModule {
}
