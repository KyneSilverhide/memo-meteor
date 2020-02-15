import { Component, Input, Output, TemplateRef } from '@angular/core';
import { faInfoCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { Category } from '../../../../../../imports/models/category';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryFormComponent } from '../../../category/category-form/category-form.component';

@Component({
  selector: 'app-no-category-info',
  templateUrl: './no-category-info.component.html',
  styleUrls: ['./no-category-info.component.scss']
})
export class NoCategoryInfoComponent {
  addIcon = faPlus;
  infoIcon = faInfoCircle;

  @Input() categories: Observable<Category[]>;

  constructor(private modalService: NgbModal) {
    /**/
  }

  openCategoryModal(categoryModal: TemplateRef<any>): void {
    this.modalService.open(categoryModal, { size: 'lg' });
  }
}
