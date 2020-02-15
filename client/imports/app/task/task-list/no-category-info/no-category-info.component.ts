import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faInfoCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { Category } from '../../../../../../imports/models/category';

@Component({
  selector: 'app-no-category-info',
  templateUrl: './no-category-info.component.html',
  styleUrls: ['./no-category-info.component.scss']
})
export class NoCategoryInfoComponent {
  addIcon = faPlus;
  infoIcon = faInfoCircle;

  @Input() categories: Observable<Category[]>;

  @Output() onOpenCategoryModal = new EventEmitter();

  constructor() {
    /**/
  }

  openCategoryModal(): void {
    this.onOpenCategoryModal.emit();
  }
}
