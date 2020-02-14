import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../../../../../imports/models/category';
import { faPlus, faSun } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-no-task-info',
  templateUrl: './no-task-info.component.html',
  styleUrls: ['./no-task-info.component.scss']
})
export class NoTaskInfoComponent {
  addIcon = faPlus;
  allDoneIcon = faSun;

  @Input() categories: Observable<Category[]>;
  @Input() displayedTaskCount: number;

  constructor() {
    /**/
  }
}
