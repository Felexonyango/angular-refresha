import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IuserProp } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http:HttpClient
  ) { }

  getusers():Observable<IuserProp[]>{
    return this.http.get<IuserProp[]>('https://jsonplaceholder.typicode.com/users');

  }
}
