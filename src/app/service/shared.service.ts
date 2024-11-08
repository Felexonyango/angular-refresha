import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private http: HttpClient) {}

  fetchCountries(name: any) {
    return this.http
      .get<any>('https://restcountries.com/v3.1/name/' + name)
      .pipe(
        tap((countries) => {
          return countries;
        })
      );
  }
}
