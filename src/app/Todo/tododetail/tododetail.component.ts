import { Component, Input } from '@angular/core';
import { ITodo } from '../../interface/TodoInterface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tododetail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tododetail.component.html',
  styleUrl: './tododetail.component.css'
})
export class TododetailComponent {
  
  @Input() todo: ITodo | null = null;


}
