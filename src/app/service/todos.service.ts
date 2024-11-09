import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { ITodo } from '../interface/TodoInterface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor(private http: HttpClient) {}

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

  getAllTodos(): Observable<any> {
    return this.http.get<ITodo[]>('https://jsonplaceholder.typicode.com/todos');
  }
  getTodosById(id: number): Observable<any> {
    return this.http.get<ITodo>(`https://jsonplaceholder.typicode.com/todos/${id}`);
  }
}
