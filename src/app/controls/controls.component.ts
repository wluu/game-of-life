import { Component, OnInit, Input } from '@angular/core';

import { DisabledControls } from './disabled-controls.factory';
import { BoardComponent } from '../board/board.component';

@Component({
  selector: 'life-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css'],
})
export class ControlsComponent implements OnInit {

  @Input() board: BoardComponent;

  private disabled: DisabledControls;

  private loopIntervalId: number;

  constructor() { }

  ngOnInit() {
    this.disabled = new DisabledControls()
      .disablePlay()
      .disableNext()
      .disableStop()
      .disableClear();
  }

  play() {
    this.board.update();

    // game loop
    this.loopIntervalId = window.setInterval.call(this,
      () => {
        if (this.board.hasMoreLife()) {
          this.board.update();
        } else {
          window.clearInterval(this.loopIntervalId);
        }
      }, 600);
  }

  next() {
    this.board.update();

    // only if we're pressing the next button
    if (this.board.hasMoreLife()) {
      this.disabled = new DisabledControls().disableStop();
    }
  }

  stop() {
    window.clearInterval(this.loopIntervalId);
    this.disabled = new DisabledControls().disableStop();
  }

  clear() {
    window.clearInterval(this.loopIntervalId);

    this.board.reset();

    this.disabled = new DisabledControls()
      .disablePlay()
      .disableNext()
      .disableStop()
      .disableClear();
  }
}
