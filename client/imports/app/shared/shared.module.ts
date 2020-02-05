import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        PageNotFoundComponent,
        NavbarComponent
    ],
    imports: [
        CommonModule,
        NgbModule,
        FontAwesomeModule,
        RouterModule,
        ReactiveFormsModule
    ],
    exports: [
        CommonModule,
        NgbModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        PageNotFoundComponent,
        NavbarComponent
    ]
})
export class SharedModule {
}
