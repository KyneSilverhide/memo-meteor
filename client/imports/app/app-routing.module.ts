import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {TodoListComponent} from "./components/todo-list/todo-list.component";
import {AuthGuard} from "./shared/guards/auth.guard";
import {TodoAddComponent} from "./components/todo-add/todo-add.component";
import {LoginComponent} from "./components/login/login.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {LoginGuard} from "./shared/guards/login.guard";

let routes = [
    {
        path: 'todoList',
        component: TodoListComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'todoAdd',
        component: TodoAddComponent,
        canActivate: [AuthGuard],
    },
    {
        path: '',
        redirectTo: '/todoList',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [LoginGuard],
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
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
