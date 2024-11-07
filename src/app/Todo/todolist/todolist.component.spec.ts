import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodolistComponent } from './todolist.component';
import { TodosService } from '../../service/todos.service';
import { ITodo } from '../../interface/TodoInterface';
import { of } from 'rxjs';

describe('TodolistComponent', () => {
  let component: TodolistComponent;
  let fixture: ComponentFixture<TodolistComponent>;
  let todosServiceMock: jasmine.SpyObj<TodosService>;

  const mockTodos: ITodo[] = [
    { id: 1, title: 'Test Todo 1', description:'test', completed: false },
    { id: 2, title: 'Test Todo 2',description:'test', completed: true },
  ];
  beforeEach(async () => {
    todosServiceMock = jasmine.createSpyObj('TodosService', ['getTodos']);
    todosServiceMock.getTodos.and.returnValue(of(mockTodos));

    await TestBed.configureTestingModule({
      imports: [TodolistComponent],
      providers: [{ provide: TodosService, useValue:todosServiceMock }],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(TodolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(()=>{
    component.ngOnDestroy();
    fixture.destroy();
  })
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize with a list of todos', () => {
    component.ngOnInit();
    expect(component.todos).toEqual(mockTodos);
  });

  it('should unsubscribe from observables on destroy', () => {
    spyOn(component.subscribe, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.subscribe.unsubscribe).toHaveBeenCalled();
  });

  it('should select a todo', () => {
    const todo: ITodo = { id: 3, title: 'Test Todo 3', description:'test', completed: false };
    component.selectTodo(todo);
    expect(component.selectedTodo).toBe(todo);
  });

  it('should call TodosService.getTodos when getTodos is invoked', () => {
    component.getTodos();
    expect(todosServiceMock.getTodos).toHaveBeenCalled();
  });

  
});
