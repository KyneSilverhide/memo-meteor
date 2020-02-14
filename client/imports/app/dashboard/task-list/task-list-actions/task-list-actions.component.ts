import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task-list-actions',
  templateUrl: './task-list-actions.component.html',
  styleUrls: ['./task-list-actions.component.scss']
})
export class TaskListActionsComponent {
  @Output() onToggleCompletedTasks = new EventEmitter<boolean>();

  @Input() completedTaskCount: number;
  @Input() displayedTaskCount: number;
  @Input() taskCount: number;

  hideCompletedTasks: boolean;
  addIcon = faPlus;

  constructor() {
    this.hideCompletedTasks = true;
  }

  toggleHideCompletedTasks(): void {
    this.hideCompletedTasks = !this.hideCompletedTasks;
    this.onToggleCompletedTasks.emit(this.hideCompletedTasks);
  }
}
