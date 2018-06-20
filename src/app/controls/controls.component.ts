import { Component, OnInit, Input } from '@angular/core';

import { DisabledControls } from './disabled-controls.class';
import { BoardComponent } from '../board/board.component';
import { InitSeed } from '../init-seed.enum';

@Component({
  selector: 'life-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css'],
})
export class ControlsComponent implements OnInit {

  @Input() board: BoardComponent;

  private disabled: DisabledControls;

  private loopIntervalId: number;

  private initialSeeds: InitSeed[];

  constructor() {
    this.initialSeeds = [
      InitSeed.Blinker,
      InitSeed.Pulsar,
      InitSeed.Pentadecathlon,
      InitSeed.Glider,
      InitSeed.LWSS
    ];
  }

  ngOnInit() {
    this.disabled = new DisabledControls()
      .disablePlay()
      .disableNext()
      .disableStop()
      .disableClear();
  }

  onClickPlay() {
    this.board.update();

    let dc = new DisabledControls().disablePlay().disableNext();
    if (this.board.isEmpty()) {
      dc.disableStop().disableClear();
    } else {
      dc.disableSeed();
    }
    this.disabled = dc;

    // game loop
    this.loopIntervalId = window.setInterval.call(this,
      () => {
        dc = new DisabledControls().disablePlay().disableNext();

        if (this.board.isEmpty()) {
          window.clearInterval(this.loopIntervalId);
          dc.disableStop().disableClear();
        } else {
          this.board.update();
          dc.disableSeed();
        }

        this.disabled = dc;
      }, 600);
  }

  onClickNext() {
    this.board.update();

    const dc = new DisabledControls().disableStop();

    if (this.board.isEmpty()) {
      dc.disablePlay()
        .disableNext()
        .disableClear();
    }

    this.disabled = dc;
  }

  onClickStop() {
    window.clearInterval(this.loopIntervalId);
    this.disabled = new DisabledControls().disableStop();
  }

  onClickClear() {
    window.clearInterval(this.loopIntervalId);

    this.board.reset();

    this.disabled = new DisabledControls()
      .disablePlay()
      .disableNext()
      .disableStop()
      .disableClear();
  }

  onSelectChange($event: any) {
    this.disabled = new DisabledControls().disableStop();
    this.board.populateSeed(<InitSeed>$event.target.value);
  }
}
