import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faColumns, faPlus, faTh } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { Category } from '../../../../../../imports/models/category';
import { DisplayMode } from '../../display-mode.model';
import { StorageService } from '../../../shared/services/storage.service';

@Component({
  selector: 'app-task-list-actions',
  templateUrl: './task-list-actions.component.html',
  styleUrls: ['./task-list-actions.component.scss']
})
export class TaskListActionsComponent implements OnInit {
  @Output() onToggleCompletedTasks = new EventEmitter<boolean>();
  @Output() onOpenCategoryModal = new EventEmitter();
  @Output() onToggleDisplayMode = new EventEmitter();

  @Input() completedTaskCount: number;
  @Input() displayedTaskCount: number;
  @Input() taskCount: number;
  @Input() categories: Observable<Category[]>;

  hideCompletedTasks: boolean;
  displayMode: DisplayMode;
  addIcon = faPlus;
  columnIcon = faColumns;
  masonryIcon = faTh;

  constructor(private storage: StorageService) {
    /**/
  }

  ngOnInit(): void {
    this.hideCompletedTasks = true;
    this.displayMode = this.storage.getDisplayMode();
  }

  public isColumnMode(): boolean {
    return this.displayMode === DisplayMode.COLUMN;
  }

  toggleHideCompletedTasks(): void {
    this.hideCompletedTasks = !this.hideCompletedTasks;
    this.onToggleCompletedTasks.emit(this.hideCompletedTasks);
  }

  toggleDisplayMode(): void {
    this.displayMode = this.displayMode === DisplayMode.COLUMN ? DisplayMode.MASONRY : DisplayMode.COLUMN;
    this.storage.storeDisplayMode(this.displayMode);
    this.onToggleDisplayMode.emit(this.displayMode);
  }
}
