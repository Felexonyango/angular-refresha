import { Component, OnInit } from '@angular/core';

import {
  debounceTime,
  distinctUntilChanged,
  filter,
  Subject,
  Subscription,
  switchMap,
  takeUntil,
} from 'rxjs';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedService } from '../service/shared.service';

import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  providers: [SharedService],
})
export class SearchFormComponent implements OnInit {
  subscriptions = new Subscription();
  countries!: any[];

  inputText = new FormControl('');
  // private destroy$ = new Subject<void>();
  constructor(
    private sharedService: SharedService,
    private fb: FormBuilder
  
  ) {}

  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });
  
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
  ngOnInit() {

    

    //subscriptions
    this.subscriptions.add(
      this.inputText.valueChanges
        .pipe(
          debounceTime(300),
          distinctUntilChanged(),
          filter((query: any) => query !== null),
          switchMap(async (query) => this.getCountries(query))
        )
        .subscribe({
          next: (countries: any) => {
            this.countries = countries;
          },
        })
    );
  }


  getCountries(query: string) {
    this.subscriptions.add(
      this.sharedService.fetchCountries(query).subscribe({
        next: (countries) => {
          this.countries = countries;
          console.log(this.countries);
        },
      })
    );
  }

  // getCountries() {
  //   this.inputText.valueChanges
  //     .pipe(
  //       debounceTime(300),
  //       distinctUntilChanged(),
  //       filter((query) => query !== null),
  //       takeUntil(this.destroy$),
  //       switchMap((query) => this.sharedService.fetchCountries(query))
  //     )
  //     .subscribe((countries) => {
  //       this.countries = countries;
  //       console.log(this.countries);
  //     });
  // }

  // ngOnDestroy() {
  //   this.destroy$.next();
  //   this.destroy$.complete();
  // }

  
}
