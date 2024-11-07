import { Component, inject } from '@angular/core';
import { UserService } from '../../service/user.service';
import { IuserProp } from '../../interface/user';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-userslist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './userslist.component.html',
  styleUrl: './userslist.component.css',

})
export class UserslistComponent {
  users: IuserProp[] = [];

  users$!: Observable<IuserProp[]>;
  
  subscriptions = new Subscription();
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // this.getusers();
    this.users$ = this.userService.getusers();

  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
 //option 1 using manual subscription
  getusers() {
    this.subscriptions.add(
      this.userService.getusers().subscribe({
        next: (users) => {
          this.users = users;
          console.log(users)
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          console.log('Users fetched successfully');
        },
      })
    );
  }

  //option 2 using async pipe



}
