import { MongoObservable } from 'meteor-rxjs';
import { Task } from '../models/task';

export const Tasks = new MongoObservable.Collection<Task>('tasks');
