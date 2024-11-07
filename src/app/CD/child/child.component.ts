import { ChangeDetectionStrategy, Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [],
  templateUrl: './child.component.html',
  styleUrl: './child.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent {
  @Input() items!: number[];

  // Since @Input changes , ChangeDetectionStrategy onpush will work
  ngOnChanges(changes: SimpleChanges) {
    console.log('Change detected in child component', changes);
  }
}
