export interface Task {
  _id?: string;
  title: string;
  content?: string;
  categoryId: string;
  owner: string;
  done: boolean;
}

export interface TaskByCategory {
  [categoryId: string]: Task[];
}
