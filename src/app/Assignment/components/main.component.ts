import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OptionSelectorComponent } from './option/optionSelector.component';
import { SelectionService } from '../service/selection.service';
import { BoxComponent } from './box/box.componet';

@Component({
  selector: 'main-app',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BoxComponent, CommonModule, OptionSelectorComponent],
  template: `
    <div style="display: flex; flex-wrap: wrap; gap: 10px;">
    @for (box of boxes ;track box; let idx = $index) {
      <app-box
        
        [index]="idx"
        [selection]="selectionService.getSelection(idx) | async"
        (selectionChange)="onSelectionChange($event)"
        (click)="onBoxClick(idx)" 
      ></app-box>

    }
    </div>
    @if(isSelectorVisible){
      <div style="margin-top: 20px;">
      <app-option-selector
        [index]="selectedBoxIndex"
        [options]="options"
        [selectedOption]="selectedOption"
        (optionSelected)="onOptionSelected($event)"
      ></app-option-selector>

    </div>
    }


    <div style="margin-top: 20px;">
      <strong>Total Value: {{ selectionService.totalValue$ | async }}</strong>
    </div>

    <div style="margin-top: 20px;">
      <button (click)="clearSelections()">Clear All</button>
    </div>
  `,
})
export class Maincomponent implements OnInit {
  boxes = Array(10).fill(null);
  isSelectorVisible = false;
  selectedBoxIndex: number | any = null;
  selectedOption: string = '';
  options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];

  constructor(public selectionService: SelectionService) {}

  ngOnInit() {
    this.selectedBoxIndex = null;
  }

  onBoxClick(index: number) {
    if (this.selectedBoxIndex === null || this.selectedBoxIndex !== index) {
      this.selectedBoxIndex = index;
      this.selectionService.setActiveBoxIndex(index);
      this.isSelectorVisible = true;
    }
  }

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

    this.isSelectorVisible = true;
  }

  clearSelections() {
    this.selectionService.clearSelections();
    this.isSelectorVisible = false;
    this.selectedBoxIndex = null;
  }

  onOptionSelected(option: string) {
    if (this.selectedBoxIndex !== null) {
      this.selectedOption = option;
      const value = this.selectionService.getOptionValueFromOption(option);
      this.selectionService.setSelection(this.selectedBoxIndex, option, value);

      const nextBoxIndex = this.selectedBoxIndex + 1;
      if (nextBoxIndex < this.boxes.length) {
        this.selectedBoxIndex = nextBoxIndex;
        this.selectionService.setActiveBoxIndex(nextBoxIndex);
      } else {
        this.selectedBoxIndex = this.selectedBoxIndex;
        this.selectionService.setActiveBoxIndex(this.selectedBoxIndex);
      }
    }
  }
}
