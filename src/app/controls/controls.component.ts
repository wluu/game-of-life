import { Component, OnInit, Input } from '@angular/core';

import { BoardComponent } from '../board/board.component';

import { Seed } from '../misc/seed';

import { DisabledControls } from './disabled-controls.class';

@Component({
  selector: 'life-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css'],
})
export class ControlsComponent implements OnInit {

  @Input() board: BoardComponent;

  private disabled: DisabledControls;

  private loopIntervalId: number;

  private initialSeeds: Seed[];

  constructor() {
    this.initialSeeds = [
      Seed.Blinker,
      Seed.Pulsar,
      Seed.Pentadecathlon,
      Seed.Glider,
      Seed.LWSS
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
    this.board.disableMouseEvents();

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
          this.board.enableMouseEvents();
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
    this.board.enableMouseEvents();
  }

  onClickClear() {
    window.clearInterval(this.loopIntervalId);

    this.board.reset();
    this.board.enableMouseEvents();

    this.disabled = new DisabledControls()
      .disablePlay()
      .disableNext()
      .disableStop()
      .disableClear();
  }

  onSelectChange($event: any) {
    this.disabled = new DisabledControls().disableStop();
    this.board.populateSeed(<Seed>$event.target.value);
  }
}
