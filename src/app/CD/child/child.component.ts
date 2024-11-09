import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { TodosService } from '../../service/todos.service';
import { count, map, Subscription, take } from 'rxjs';
import { ITodo } from '../../interface/TodoInterface';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [],
  templateUrl: './child.component.html',
  styleUrl: './child.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildComponent {
  apiService = inject(TodosService);
  todos: ITodo[] = [];
  @Input() items!: number[];
  subscription = new Subscription();

  @Output() itemsUpdated = new EventEmitter();
   @Output()dataLoaded = new EventEmitter();

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.subscription.add(
      this.apiService.getAllTodos().pipe(
        
        map(data => data.slice(0, 10))).subscribe((data) => {
          this.todos = data;
          this.dataLoaded.emit(this.todos); 
        },
        (error) => {
          console.error('Error fetching data', error);
        }
      )
    );
  }

  UpdateItems() {
    const updatedItems = [...this.items, Math.floor(Math.random() * 100)];
    this.itemsUpdated.emit(updatedItems);
  }
}
