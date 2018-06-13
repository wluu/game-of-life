import { Component } from '@angular/core';

import { DisabledControls } from './model-interfaces/disabled-controls.interface';

@Component({
  selector: 'life-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private disabledPlay: boolean;
  private disabledStop: boolean;
  private disabledClear: boolean;
  private disabledSeed: boolean;

  private handleButtonStates($event: DisabledControls) {
    this.disabledPlay = $event.disabledPlay;
    this.disabledStop = $event.disabledStop;
    this.disabledClear = $event.disabledClear;
    this.disabledSeed = $event.disabledSeed;
  }
}
