import { Component, EventEmitter, Output } from '@angular/core';
import { ChildComponent } from '../child/child.component';
import { CommonModule } from '@angular/common';
import { ITodo } from '../../interface/TodoInterface';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [ChildComponent,CommonModule],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.css',
})
export class ParentComponent {
  items = [1, 2, 3];
  todosData: ITodo[] = [];

  modifyArray() {
    
    this.items.push(4); 
  }

  replaceArray() {

    this.items = [...this.items, 4];
  }
  onItemsUpdated(updatedItems: number[]) {
    this.items = updatedItems;
    console.log('Items updated in parent:', this.items);
  }
  getTodos(data:ITodo[]){
    this.todosData = data;
    console.log('Todos received in parent:', data);


  }


}
