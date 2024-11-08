import { Component, OnInit } from '@angular/core';

import { debounceTime, distinctUntilChanged, filter, Subject, Subscription, switchMap, takeUntil } from 'rxjs';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  // subscriptions = new Subscription();
  countries!: any[];

  inputText = new FormControl('');
  private destroy$ = new Subject<void>();
  constructor(private sharedService: SharedService) {}

  
  ngOnInit(): void {
    this.getCountries()
  }

  // ngOnDestroy() {
  //   this.subscriptions.unsubscribe();
  // }
  // ngOnInit() {
  //   this.subscriptions.add(
  //     this.inputText.valueChanges.subscribe((value: any) => {
  //       this.getCountries(value);
  //     })
  //   );
  // }



  // getCountries(query: string) {
  //   this.subscriptions.add(
  //     this.sharedService.fetchCountries(query).subscribe({
  //       next: (countries) => {
  //         this.countries = countries;
  //         console.log(this.countries);
  //       },
  //     })
  //   );
  // }

  getCountries() {
    this.inputText.valueChanges
      .pipe(
        debounceTime(300),    // Add debounce to limit rapid calls

        filter((value): value is string => value !== null),   // Filter out null values              
        distinctUntilChanged(),              // Avoid duplicate requests for the same value 
        switchMap((value: string) => this.sharedService.fetchCountries(value)),
        takeUntil(this.destroy$)         // Automatically unsubscribe on component destroy      
      )
      .subscribe({
        next: (countries) => {
          this.countries = countries;
          console.log(this.countries);
        },
        error: (err) => console.error(err),
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
