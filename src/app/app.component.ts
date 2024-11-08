import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodolistComponent } from "./Todo/todolist/todolist.component";
import { UserslistComponent } from "./Users/userslist/userslist.component";
import { ParentComponent } from "./CD/parent/parent.component";
import { SearchFormComponent } from './search-form/search-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TodolistComponent,SearchFormComponent, UserslistComponent, ParentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-test';
}
