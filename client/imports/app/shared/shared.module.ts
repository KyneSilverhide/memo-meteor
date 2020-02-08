import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FaIconLibrary, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IconPickerComponent} from './components/icon-picker/icon-picker.component';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {IconFilterPipe} from './pipes/icon-filter.pipe';
import {ToastsComponent} from './components/toast/toasts.component';
import {ColorCircleModule} from "ngx-color/circle";

@NgModule({
    declarations: [
        PageNotFoundComponent,
        NavbarComponent,
        IconPickerComponent,
        IconFilterPipe,
        ToastsComponent,
    ],
    imports: [
        CommonModule,
        NgbModule,
        FontAwesomeModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        ColorCircleModule,
    ],
    exports: [
        CommonModule,
        NgbModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        ColorCircleModule,
        PageNotFoundComponent,
        NavbarComponent,
        IconPickerComponent,
        ToastsComponent
    ]
})
export class SharedModule {

    constructor(library: FaIconLibrary) {
        library.addIconPacks(fas);
    }
}
