import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { ITodo } from '../interface/TodoInterface';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor() {}

  todos: ITodo[] = [
    {
      id: 1,
      title: 'Buy groceries',
      description: 'Milk, Bread, Eggs',
      completed: true,
    },
    {
      id: 2,
      title: 'Complete assignment',
      description: 'Finish Angular assignment',
      completed: false,
    },
    {
      id: 3,
      title: 'Workout',
      description: 'Gym session at 5 PM',
      completed: false,
    },
    { id: 4, title: 'Meeting', description: 'At 10 AM', completed: false },
    {
      id: 5,
      title: 'Clean house',
      description: 'From 9 AM to 12 PM',
      completed: false,
    },
  ];

  getTodos(): Observable<any> {
    return of(this.todos);
  }
}
