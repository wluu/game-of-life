import { Component, OnInit, Input } from '@angular/core';

import { DisabledControls } from '../model-interfaces/disabled-controls.interface';
import { BoardComponent } from '../board/board.component';

@Component({
  selector: 'life-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css'],
})
export class ControlsComponent implements OnInit {

  @Input() board: BoardComponent;

  private disabledPlay: boolean;
  private disabledStop: boolean;
  private disabledClear: boolean;
  private disabledSeed: boolean;

  private loopIntervalId: number;

  constructor() { }

  ngOnInit() {
    this.disabledPlay = true;
    this.disabledStop = true;
    this.disabledClear = true;
    this.disabledSeed = false;
  }

  // game loop
  play() {
    this.board.update();

    this.loopIntervalId = window.setInterval.call(this,
      () => {
        if (this.board.hasMoreLife()) {
          this.board.update();
        } else {
            window.clearInterval(this.loopIntervalId);

            this.disabledPlay = true;
            this.disabledStop = true;
            this.disabledClear = true;
            this.disabledSeed = false;
        }
      }, 600);

    this.disabledPlay = true;
    this.disabledStop = false;
    this.disabledClear = false;
    this.disabledSeed = true;
  }

  stop() {
    window.clearInterval(this.loopIntervalId);

    this.disabledPlay = false;
    this.disabledStop = true;
    this.disabledClear = false;
    this.disabledSeed = false;
  }

  clear() {
    window.clearInterval(this.loopIntervalId);

    this.board.reset();

    this.disabledPlay = true;
    this.disabledStop = true;
    this.disabledClear = true;
    this.disabledSeed = false;
  }

  handleDisabledStates($event: DisabledControls) {
    this.disabledPlay = $event.disabledPlay;
    this.disabledStop = $event.disabledStop;
    this.disabledClear = $event.disabledClear;
    this.disabledSeed = $event.disabledSeed;
  }
}
