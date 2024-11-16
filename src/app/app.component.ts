import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodolistComponent } from './Todo/todolist/todolist.component';
import { UserslistComponent } from './Users/userslist/userslist.component';
import { ParentComponent } from './CD/parent/parent.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { ReactiveFormsComponent } from './reactive-forms/reactive-forms.component';
import { SignalstoreTestComponent } from './signalStore/signalstore-test/signalstore-test.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TodolistComponent,
    SearchFormComponent,
    UserslistComponent,
    ParentComponent,
    ReactiveFormsComponent,
    SignalstoreTestComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-test';
}
