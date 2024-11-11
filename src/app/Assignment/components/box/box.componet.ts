import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Observable } from 'rxjs';
import { SelectionService } from '../../service/selection.service';

@Component({
  selector: 'app-box',
  standalone: true,
  changeDetection:ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
  <div
      (click)="onBoxClick()"
      style="padding: 5px; border: 1px solid #ccc; width: 100px; height: 40px; text-align: center; cursor: pointer; position: relative;"
      [style.backgroundColor]="isActive ? '#e6f7ff' : '#fff'"
    >
      <span>{{ selection || 'Select Element' }}</span>
      
      
      <div *ngIf="optionValue$ | async as optionValue" style="position: absolute; bottom: 5px; width: 100%; text-align: center;">
        <span *ngIf="optionValue !== null">{{ optionValue }}</span>
      </div>
    </div>
    
  `,
})
export class BoxComponent implements OnInit {
  @Input() index!: number;
  @Input() selection: any = '';
  optionValue$!: Observable<number>;
  @Output() selectionChange = new EventEmitter<{
    index: number;
    selection: string;
  }>();

  isActive = false;

  constructor(private selectionService: SelectionService) {
    this.optionValue$ = this.selectionService.getOptionValue(this.index);
  }

  ngOnInit() {
    this.optionValue$ = this.selectionService.getOptionValue(this.index);
  
    this.selectionService.getSelection(this.index).subscribe((selection) => {
      this.selection = selection;
    });
    this.selectionService.getActiveBoxIndex().subscribe((activeIndex) => {
      this.isActive = this.index === activeIndex;
    });
  }

  onBoxClick() {
    this.selectionService.setActiveBoxIndex(this.index);
    this.selectionChange.emit({ index: this.index, selection: this.selection });
  }
}
