import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SelectionService {
  private readonly storageKey = 'boxSelections';
  private selectionsSubject = new BehaviorSubject<string[]>(
    this.loadSelections()
  );
  private activeBoxIndexSubject = new BehaviorSubject<number | null>(null);
  private optionValuesSubject = new BehaviorSubject<number[]>(
    Array(10).fill(null)
  );
  selections$ = this.selectionsSubject.asObservable();
  activeBoxIndex$ = this.activeBoxIndexSubject.asObservable();

  setSelection(index: number, selection: string, value: number) {
    const selections = [...this.selectionsSubject.value];
    const optionValues = [...this.optionValuesSubject.value];
    selections[index] = selection;
    optionValues[index] = value;
    this.selectionsSubject.next(selections);
    this.optionValuesSubject.next(optionValues);
    this.saveSelections(selections);
  }

  getSelection(index: number) {
    return this.selectionsSubject
      .asObservable()
      .pipe(map((selections) => selections[index] || ''));
  }

  getOptionValue(index: number) {
    return this.optionValuesSubject.pipe(
      map((optionValues) => optionValues[index])
    );
  }
  setActiveBoxIndex(index: number | null) {
    this.activeBoxIndexSubject.next(index);
  }

  getActiveBoxIndex() {
    return this.activeBoxIndex$;
  }

  clearSelections() {
    const emptySelections = Array(10).fill('');
    this.optionValuesSubject.next(Array(10).fill(null));
    this.selectionsSubject.next(emptySelections);
    localStorage.removeItem(this.storageKey);
    this.setActiveBoxIndex(null);
  }

  loadSelections(): string[] {
    const storedSelections = localStorage.getItem(this.storageKey);
    return storedSelections ? JSON.parse(storedSelections) : Array(10).fill('');
  }

  saveSelections(selections: string[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(selections));
  }
  getOptionValueFromOption(option: string): number {
    const options = [
      'Option 1',
      'Option 2',
      'Option 3',
      'Option 4',
      'Option 5',
    ];
    return options.indexOf(option) + 1;
  }
  totalValue$: Observable<number> = this.optionValuesSubject
    .asObservable()
    .pipe(map((values) => values.reduce((acc, val) => acc + (val || 0), 0)));
}
