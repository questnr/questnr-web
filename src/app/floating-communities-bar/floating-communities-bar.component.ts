import {ChangeDetectionStrategy, Component, Input, HostBinding, AfterViewInit, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
type PaneType = 'left' | 'right';
@Component({
  selector: 'app-floating-communities-bar',
  templateUrl: './floating-communities-bar.component.html',
  styleUrls: ['./floating-communities-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slide', [
      state('left', style({transform: 'translateX(0)'})),
      state('right', style({transform: 'translateX(-50%)'})),
      transition('* => *', animate(300))
    ]),
  ],
})
export class FloatingCommunitiesBarComponent implements  AfterViewInit{
  @Input() activePane: PaneType = 'left';
  isVisible = true;
  constructor() {
  }
  ngAfterViewInit() {
  }
}
