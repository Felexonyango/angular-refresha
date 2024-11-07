import { Component } from '@angular/core';
import { ChildComponent } from '../child/child.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [ChildComponent,CommonModule],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.css',
})
export class ParentComponent {
  items = [1, 2, 3];

  modifyArray() {
    
    this.items.push(4); // This will NOT trigger change detection in the child
  }

  replaceArray() {

    this.items = [...this.items, 4]; // This WILL trigger change detection in the child
  }
}
