import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TodoAddComponent } from './components/todo-add/todo-add.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [BrowserModule, FormsModule, SharedModule, AppRoutingModule],
  declarations: [AppComponent, TodoAddComponent, TodoListComponent, LoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
