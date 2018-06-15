import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { LifeService } from '../services/life.service';
import { TrackingService } from '../services/tracking.service';
import { CellInfo } from '../cell-info.interface';
import { DisabledControls } from '../controls/disabled-controls.factory';

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
    this.tracking.initBoard(this.height, this.width);
    this.life.useTrackingService(this.tracking);

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

  mouseDown($event: any) {
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

    this.disabledControls.emit(new DisabledControls().disableStop());
  }

  mouseMove($event: any) {
    if (this.isMouseDown) {
      const curCell = this.getCellInfoAt($event.target.style.gridRow, $event.target.style.gridColumn);

      curCell.alive = true;
      this.tracking.markCell(curCell);
      this.cellsStyle[curCell.row][curCell.col].backgroundColor = this.cellColor;
    }
  }

  mouseUp($event: any) {
    this.isMouseDown = false;
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

    // these states only happen after you press play and the game cotinues byitself i.e. during the game loop (in controls component)
    if (this.hasMoreLife()) {
      this.disabledControls.emit(
        new DisabledControls()
          .disablePlay()
          .disableNext()
          .disableSeed()
      );
    } else {
      this.disabledControls.emit(
        new DisabledControls()
          .disablePlay()
          .disableNext()
          .disableStop()
          .disableClear()
      );
    }
  }

  hasMoreLife() {
    return this.life.newGeneration.reduce((liveCells: number, cell: CellInfo) => {
      if (cell.alive) {
        liveCells++;
      }
      return liveCells;
    }, 0);
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
}
