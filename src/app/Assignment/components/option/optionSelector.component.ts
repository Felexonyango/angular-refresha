import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-option-selector',
  standalone: true,
  changeDetection:ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <div>
    <div>
  @for ( option of options;track  option) {
    <button
      (click)="selectOption(option)"
      [ngStyle]="{
        backgroundColor: isSelected(option) ? '#e6f7ff' : 'transparent'
      }"
    >
      {{ option }}
    </button>
  }
</div>

    </div>

  `,
})
export class OptionSelectorComponent {
  @Input() index!: number;
  @Input() selectedOption: string = '';
  @Output() optionSelected = new EventEmitter<string>();
  @Input() options: string[] = [];

  selectOption(option: string) {
    this.optionSelected.emit(option);
  }

  isSelected(option: string): boolean {
    return option === this.selectedOption;
  }
}
