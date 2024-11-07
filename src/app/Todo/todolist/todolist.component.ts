import { Component, inject, OnInit } from '@angular/core';
import { ITodo } from '../../interface/TodoInterface';
import { TododetailComponent } from '../tododetail/tododetail.component';
import { NgFor } from '@angular/common';
import { Subscription } from 'rxjs';
import { TodosService } from '../../service/todos.service';

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [NgFor, TododetailComponent],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css',
})
export class TodolistComponent implements OnInit {
  todosservice = inject(TodosService);
  todos: ITodo[] = [];
  subscribe = new Subscription();
  selectedTodo: ITodo | null = null;

  ngOnInit(): void {
    this.getTodos();
  }
  ngOnDestroy(): void {
    this.subscribe.unsubscribe();
  }

  getTodos() {
    this.subscribe.add(
      this.todosservice.getTodos().subscribe((todos: ITodo[]) => {
        this.todos = todos;
      })
    );
  }

  selectTodo(todo: ITodo): void {
    this.selectedTodo = todo;
  }

  
}
