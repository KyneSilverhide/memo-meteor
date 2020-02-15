import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../../../../../imports/models/category';
import { Task } from '../../../../../../imports/models/task';
import { faCheck, faEdit, faUndo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task-display',
  templateUrl: './task-display.component.html',
  styleUrls: ['./task-display.component.scss']
})
export class TaskDisplayComponent {
  editIcon = faEdit;
  cancelIcon = faUndo;
  completeIcon = faCheck;

  @Input() category: Category;
  @Input() task: Task;

  @Output() onTaskComplete = new EventEmitter<Task>();
  @Output() onTaskCanceled = new EventEmitter<Task>();
  @Output() onTaskEdited = new EventEmitter<Task>();

  constructor() {
    /**/
  }

  editTask(task: Task): void {
    this.onTaskEdited.emit(task);
  }

  cancelTask(task: Task): void {
    this.onTaskCanceled.emit(task);
  }

  completeTask(task: Task): void {
    this.onTaskComplete.emit(task);
  }
}
