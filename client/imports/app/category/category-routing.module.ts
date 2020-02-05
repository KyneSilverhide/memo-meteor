import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {CategoryListComponent} from "./category-list/category-list.component";
import {AuthGuard} from "../shared/guards/auth.guard";
import {CategoryFormComponent} from "./category-form/category-form.component";
import {PageNotFoundComponent} from "../shared/components/page-not-found/page-not-found.component";

let routes = [
    {
        path: '',
        component: CategoryListComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'add',
        redirectTo: 'edit',
        pathMatch: 'full'
    },
    {
        path: 'edit',
        component: CategoryFormComponent,
        canActivate: [AuthGuard],
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class CategoryRoutingModule {
}
