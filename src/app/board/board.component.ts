import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { LifeService } from '../services/life.service';
import { TrackingService } from '../services/tracking.service';
import { CellInfo } from '../cell-info.interface';
import { DisabledControls } from '../controls/disabled-controls.class';

import { environment } from '../../environments/environment';

@Component({
  selector: 'life-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  providers: [TrackingService, LifeService]
})
export class BoardComponent implements OnInit {

  @Output() disabledControls = new EventEmitter<DisabledControls>();

  private width: number;
  private height: number;
  private cellColor: string;
  private cellsStyle: any[][];
  private boardDimensionStyle: any;

  private isMouseDown: boolean;
  private isShiftDown: boolean;

  private debugMode = environment['debug'];

  constructor(
    private tracking: TrackingService,
    private life: LifeService
  ) {
    this.width = 50;
    this.height = 30;
    this.cellColor = '#FFDF46';

    /*
      NOTE:
      dynamic style changes to the cell should be applied through this.cellsStyle.
      applying style changes through $event.target.style will not update the template's style correctly.
      e.g. click on a cell, apply rules, click on same cell, ui does not get updated.

      i suspect angular is enforcing some rule to prevent me to write to the style via the DOM event object.
      or, i've missed something in the angular docs or i don't fully understand how anuglar works ... which is the most likely case.
    */
    this.cellsStyle = [];
  }

  ngOnInit() {
    this.initBoardStyles();
    this.initEventListeners();
    this.tracking.initBoard(this.height, this.width);
    this.life.useTrackingService(this.tracking);
  }

  onMouseDown($event: any) {
    this.isMouseDown = true;

    // the grid layout starts index at 1
    const curCell = this.getCellInfoAt($event.target.style.gridRow, $event.target.style.gridColumn);

    const backgroundColor = $event.target.style.backgroundColor;
    if (!backgroundColor) {
      curCell.alive = true;
      this.cellsStyle[curCell.row][curCell.col].backgroundColor = this.cellColor;
    } else {
      this.cellsStyle[curCell.row][curCell.col].backgroundColor = '';
    }

    this.tracking.markCell(curCell);
  }

  onMouseMove($event: any) {
    if (this.isMouseDown) {
      const curCell = this.getCellInfoAt($event.target.style.gridRow, $event.target.style.gridColumn);

      if (this.isShiftDown) {
        curCell.alive = false;
        this.cellsStyle[curCell.row][curCell.col].backgroundColor = '';
      } else {
        curCell.alive = true;
        this.cellsStyle[curCell.row][curCell.col].backgroundColor = this.cellColor;
      }

      this.tracking.markCell(curCell);
    }
  }

  onMouseUp($event: any) {
    this.isMouseDown = false;

    // by default, only disable stop button because we're in the seeding state
    const dc = new DisabledControls().disableStop();

    // but, if there are no more cells on the board after deselecting the cells, then disable the following buttons:
    if (this.tracking.isBoardEmpty()) {
      dc.disablePlay()
        .disableNext()
        .disableClear();
    }
    this.disabledControls.emit(dc);
  }

  update() {
    this.life.applyRules();

    this.life.newGeneration.forEach((c: CellInfo) => {
      this.tracking.markCell(c);

      // cellsStyle is still linked to the template i.e. can make dynamic changes to the css style
      if (c.alive) {
        this.cellsStyle[c.row][c.col].backgroundColor = this.cellColor;
      } else {
        this.cellsStyle[c.row][c.col].backgroundColor = '';
      }
    });

    // these states only happen after you press play and the game cotinues by itself i.e. during the game loop (in controls component)
    const dc = new DisabledControls()
      .disablePlay()
      .disableNext();
    if (!this.tracking.isBoardEmpty()) {
      dc.disableSeed();
    } else {
      dc.disableStop()
        .disableClear();
    }
    this.disabledControls.emit(dc);
  }

  isEmpty() {
    return this.tracking.isBoardEmpty();
  }

  reset() {
    this.cellsStyle.forEach((columns: any[]) => {
      columns.forEach((c: any) => {
        c.backgroundColor = '';
      });
    });

    this.tracking.initBoard(this.height, this.width);
    this.life.newGeneration = [];
  }

  private getCellInfoAt(gridRow: string, gridCol: string): CellInfo {
    return {
      row: parseInt(gridRow.split('/')[0].trim(), 10) - 1,
      col: parseInt(gridCol.split('/')[0].trim(), 10) - 1,
      alive: false // assume cell is dead
    };
  }

  private initBoardStyles() {
    this.boardDimensionStyle = {
      'grid-template-columns': `repeat(${this.width}, 25px)`,
      'grid-template-rows': `repeat(${this.height}, 25px)`
    };

    for (let row = 0; row < this.height; row++) {
      this.cellsStyle[row] = new Array(this.width);

      for (let col = 0; col < this.width; col++) {
        let borderStyle = '';

        // creating cell borders from left to right on each row; starting point (0, 0)
        if (row === 0 && col === 0) {
          // starting at (0, 0), all the borders should be groove
          borderStyle = 'groove';
        } else if (row === 0) {
          // after (0, 0), all cells on the first row will have:
          borderStyle = 'groove groove groove none';
        } else if (col === 0) {
          // moving to the next rows, the cells in the first column will have:
          borderStyle = 'none groove groove groove';
        } else {
          // and the cells after the after column will have:
          borderStyle = 'none groove groove none';
        }

        this.cellsStyle[row][col] = {
          // index starts at 1 for grid layout
          'grid-row': row + 1,
          'grid-column': col + 1,
          'border-style': borderStyle
        };

        if (this.debugMode) {
          this.cellsStyle[row][col]['font-size'] = '8pt';
        }
      }
    }
  }

  private initEventListeners() {
    window.addEventListener('keydown', ($event: any) => {
      if ($event.shiftKey) {
        this.isShiftDown = true;
      }
    });

    window.addEventListener('keyup', ($event: any) => {
      // not too sure why i can't use $event.shiftKey ...
      if ($event.key === 'Shift') {
        this.isShiftDown = false;
      }
    });
  }
}
