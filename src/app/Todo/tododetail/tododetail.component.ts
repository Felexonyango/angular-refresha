import { Component, Input } from '@angular/core';
import { ITodo } from '../../interface/TodoInterface';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tododetail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tododetail.component.html',
  styleUrl: './tododetail.component.css'
})
export class TododetailComponent {
  @Input() todo: ITodo | null = null;



  //Activated route practices
  todoId!: number
  constructor(private activatedRoute: ActivatedRoute){


  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
    
      this.todoId=Number(params['id'])
     
    });
    // For query parameters like ?page=1, you can also use the ActivatedRoute in two ways.

    const page = this.activatedRoute.snapshot.queryParamMap.get('page');
    console.log('Page:', page);
    
  }
  



}
