import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { ColorCircleModule } from 'ngx-color/circle';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { IconPickerComponent } from './components/icon-picker/icon-picker.component';
import { IconFilterPipe } from './pipes/icon-filter.pipe';
import { QuillModule } from 'ngx-quill';
import { QUILLCONFIG } from './quill-config';
import { TaskOrderPipe } from './pipes/task-order.pipe';
import { NgxBootstrapSwitchModule } from 'ngx-bootstrap-switch';
import { CategoryModalComponent } from './components/category-modal/category-modal.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    NavbarComponent,
    IconPickerComponent,
    IconFilterPipe,
    TaskOrderPipe,
    CategoryModalComponent,
    CategoryFormComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FontAwesomeModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ColorCircleModule,
    NgxBootstrapSwitchModule,
    QuillModule.forRoot(QUILLCONFIG),
    TranslateModule,
    ToastrModule.forRoot({ positionClass: 'toast-top-center', progressBar: true })
  ],
  exports: [
    CommonModule,
    NgbModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    ColorCircleModule,
    QuillModule,
    NgxBootstrapSwitchModule,
    ToastrModule,
    PageNotFoundComponent,
    NavbarComponent,
    IconPickerComponent,
    TaskOrderPipe,
    CategoryModalComponent
  ],
  entryComponents: [CategoryModalComponent]
})
export class SharedModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}
