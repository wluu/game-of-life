import { Component, OnInit, Input } from '@angular/core';

import { BoardComponent } from '../board/board.component';

import { Seed } from '../misc/seed';

import { ControlStates } from './control-states.class';

@Component({
  selector: 'life-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.css'],
})
export class ControlsComponent implements OnInit {

  @Input() board: BoardComponent;

  private controlStates: ControlStates;

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
    this.controlStates = new ControlStates()
      .disablePlay()
      .disableNext()
      .disableStop()
      .disableClear();
  }

  onClickPlay() {
    this.board.update();
    this.board.disableMouseEvents();

    let cs = new ControlStates().disablePlay().disableNext();

    if (this.board.isEmpty()) {
      cs.disableStop()
        .disableClear()
        .resetSeed();
    } else {
      cs.disableSeed();
    }

    this.controlStates = cs;

    // game loop
    this.loopIntervalId = window.setInterval.call(this,
      () => {
        cs = new ControlStates().disablePlay().disableNext();

        if (this.board.isEmpty()) {
          window.clearInterval(this.loopIntervalId);

          cs.disableStop()
            .disableClear()
            .resetSeed();

          this.board.enableMouseEvents();
        } else {
          this.board.update();
          cs.disableSeed();
        }

        this.controlStates = cs;
      }, 600);
  }

  onClickNext() {
    this.board.update();

    const cs = new ControlStates().disableStop();

    if (this.board.isEmpty()) {
      cs.disablePlay()
        .disableNext()
        .disableClear()
        .resetSeed();
    }

    this.controlStates = cs;
  }

  onClickStop() {
    window.clearInterval(this.loopIntervalId);
    this.controlStates = new ControlStates().disableStop();
    this.board.enableMouseEvents();
  }

  onClickClear() {
    window.clearInterval(this.loopIntervalId);

    this.board.reset();

    this.controlStates = new ControlStates()
      .disablePlay()
      .disableNext()
      .disableStop()
      .disableClear()
      .resetSeed();
  }

  onControlStates($event: ControlStates) {
    this.controlStates = $event;
  }

  onSelectChange($event: any) {
    this.controlStates = new ControlStates().disableStop();
    this.board.populateSeed(<Seed>$event.target.value);
  }
}
