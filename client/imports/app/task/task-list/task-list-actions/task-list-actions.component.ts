import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { Category } from '../../../../../../imports/models/category';

@Component({
  selector: 'app-task-list-actions',
  templateUrl: './task-list-actions.component.html',
  styleUrls: ['./task-list-actions.component.scss']
})
export class TaskListActionsComponent {
  @Output() onToggleCompletedTasks = new EventEmitter<boolean>();
  @Output() onOpenCategoryModal = new EventEmitter();

  @Input() completedTaskCount: number;
  @Input() displayedTaskCount: number;
  @Input() taskCount: number;
  @Input() categories: Observable<Category[]>;

  hideCompletedTasks: boolean;
  addIcon = faPlus;

  constructor() {
    this.hideCompletedTasks = true;
  }

  toggleHideCompletedTasks(): void {
    this.hideCompletedTasks = !this.hideCompletedTasks;
    this.onToggleCompletedTasks.emit(this.hideCompletedTasks);
  }

  openCategoryModal(): void {
    this.onOpenCategoryModal.emit();
  }
}
