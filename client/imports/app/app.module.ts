import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {TodoAddComponent} from './components/todo-add/todo-add.component';
import {TodoListComponent} from './components/todo-list/todo-list.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {LoginComponent} from "./components/login/login.component";
import {AuthGuard} from "./shared/guards/auth.guard";
import {SharedModule} from "./shared/shared/shared.module";
import {AppRoutingModule} from "./app-routing.module";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        SharedModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        TodoAddComponent,
        TodoListComponent,
        NavbarComponent,
        PageNotFoundComponent,
        LoginComponent
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
