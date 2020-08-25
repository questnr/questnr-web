import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, ChangeDetectionStrategy, Component, Input } from '@angular/core';
type PaneType = 'left' | 'right';

@Component({
  selector: 'user-activity-bar',
  templateUrl: './user-activity-bar.component.html',
  styleUrls: ['./user-activity-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slide', [
      state('left', style({ transform: 'translateX(0)' })),
      state('right', style({ transform: 'translateX(-50%)' })),
      transition('* => *', animate(300))
    ]),
  ],
})
export class UserActivityBarComponent implements AfterViewInit {
  @Input() activePane: PaneType = 'left';
  isVisible = true;
  constructor() { }

  ngAfterViewInit(): void {
  }

}
