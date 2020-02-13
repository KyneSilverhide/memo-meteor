import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../../../../../imports/models/task';

@Pipe({
  name: 'taskOrder'
})
export class TaskOrderPipe implements PipeTransform {
  transform(tasks: Task[], hideCompletedTasks: boolean): Task[] {
    if (!tasks) {
      return [];
    }
    const filteredTasks = [...tasks];
    return filteredTasks
      .filter(task => {
        return !hideCompletedTasks || !task.done;
      })
      .sort((taskA, taskB) => {
        if (taskA.done) {
          return 1;
        } else if (taskB.done) {
          return -1;
        } else {
          return taskA._id.localeCompare(taskB._id);
        }
      });
  }
}
