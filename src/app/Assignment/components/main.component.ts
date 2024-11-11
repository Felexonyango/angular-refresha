import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { OptionSelectorComponent } from './option/optionSelector.component';
import { BoxComponent } from './box/box.componet';
import { SelectionService } from '../service/selection.service';

@Component({
  selector: 'main-app',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BoxComponent, CommonModule, OptionSelectorComponent],
  template: `
    <div style="display: flex; flex-wrap: wrap; gap: 10px;">
      <app-box
        *ngFor="let box of boxes; index as i"
        [index]="i"
        [selection]="selectionService.getSelection(i) | async"
        (selectionChange)="onSelectionChange($event)"
      ></app-box>
    </div>

    <div *ngIf="isSelectorVisible" style="margin-top: 20px;">
      <app-option-selector
        [index]="selectedBoxIndex"
        [options]="options"  
        [selectedOption]="selectedOption" 
        (optionSelected)="onOptionSelected($event)"
      ></app-option-selector>
    </div>
    <div style="margin-top: 20px;">
  
      <strong>Total Value: {{ selectionService.totalValue$ | async }}</strong>
    </div>
    <div style="margin-top: 20px;">
      <button (click)="clearSelections()">Clear All</button>
    </div>
  `,
})
export class Maincomponent {
  boxes = Array(10).fill(null);
  isSelectorVisible = false;
  selectedBoxIndex: number | any = null;
  selectedOption: string = '';
  options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];

  constructor(public selectionService: SelectionService) {}

  onSelectionChange({
    index,
    selection,
  }: {
    index: number;
    selection: string;
  }) {
    this.selectedOption = selection;
    const value = this.selectionService.getOptionValueFromOption(selection);

    this.selectionService.setSelection(index, selection, value);

    this.selectedBoxIndex = index;
    this.isSelectorVisible = true;
  }

  clearSelections() {
    this.selectionService.clearSelections();
    this.isSelectorVisible = false;
  }

  onOptionSelected(option: string) {
    if (this.selectedBoxIndex !== null) {
      this.selectedOption = option;
      const value = this.selectionService.getOptionValueFromOption(option);
      this.selectionService.setSelection(this.selectedBoxIndex, option, value);
      const nextBoxIndex = this.selectedBoxIndex + 1;
      if (nextBoxIndex < this.boxes.length) {
        this.selectionService.setActiveBoxIndex(nextBoxIndex);
      } else {
        this.selectionService.setActiveBoxIndex(null);
      }
    }
  }
}
