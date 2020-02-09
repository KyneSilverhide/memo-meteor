import { MongoObservable } from 'meteor-rxjs';
import { Category } from '../models/category';

export const Categories = new MongoObservable.Collection<Category>('categories');
