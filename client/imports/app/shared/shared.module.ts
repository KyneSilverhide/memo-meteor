import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FaIconLibrary, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ColorChromeModule} from "ngx-color/chrome";
import { IconPickerComponent } from './components/icon-picker/icon-picker.component';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { IconFilterPipe } from './pipes/icon-filter.pipe';

@NgModule({
    declarations: [
        PageNotFoundComponent,
        NavbarComponent,
        IconPickerComponent,
        IconFilterPipe,
    ],
    imports: [
        CommonModule,
        NgbModule,
        FontAwesomeModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        ColorChromeModule,
    ],
    exports: [
        CommonModule,
        NgbModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        ColorChromeModule,
        PageNotFoundComponent,
        NavbarComponent,
        IconPickerComponent
    ]
})
export class SharedModule {

    constructor(library: FaIconLibrary) {
        library.addIconPacks(fas);
    }
}
