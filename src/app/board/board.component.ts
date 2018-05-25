import { Component, OnInit } from '@angular/core';

import { LifeService } from '../services/life.service';
import { TrackingService } from '../services/tracking.service';
import { CellInfo } from '../cell-info.interface';

import { environment } from '../../environments/environment';

@Component({
  selector: 'life-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  providers: [TrackingService, LifeService]
})
export class BoardComponent implements OnInit {

  private boardWidth: number;
  private boardHeight: number;
  private cellsStyle: any[][];
  private boardDimensionStyle: any;

  private debugMode = environment['debug'];

  constructor(
    private tracking: TrackingService,
    private life: LifeService
  ) {
    // NOTE: manually setting the boardWidth and boardHeight for now
    this.boardHeight = 30;
    this.boardWidth = 50;
    this.cellsStyle = [];
  }

  ngOnInit() {
    this.tracking.initBoard(30, 50);

    this.boardDimensionStyle = {
      'grid-template-columns': `repeat(${this.boardWidth}, 30px)`,
      'grid-template-rows': `repeat(${this.boardHeight}, 30px)`
    };

    for (let row = 0; row < this.boardHeight; row++) {
      this.cellsStyle[row] = new Array(this.boardWidth);

      for (let col = 0; col < this.boardWidth; col++) {
        let borderStyle = '';

        // creating cell borders from left to right on each row; starting point (0, 0)
        if (row === 0 && col === 0) {
          // starting at (0, 0), all the borders should be solid
          borderStyle = 'solid';
        } else if (row === 0) {
          // after (0, 0), all cells on the first row will have:
          borderStyle = 'solid solid solid none';
        } else if (col === 0) {
          // moving to the next rows, the cells in the first column will have:
          borderStyle = 'none solid solid solid';
        } else {
          // and the cells after the after column will have:
          borderStyle = 'none solid solid none';
        }

        this.cellsStyle[row][col] = {
          // index starts at 1 for grid layout
          'grid-row': row + 1,
          'grid-column': col + 1,
          'border-style': borderStyle
        };
      }
    }
  }

  updateCell($event: any) {
    // the grid layout starts index at 1
    const curCell = {
      row: parseInt($event.target.style.gridRow.split('/')[0].trim(), 10) - 1,
      col: parseInt($event.target.style.gridColumn.split('/')[0].trim(), 10) - 1,
      alive: false
    };

    /*
      NOTE:
      style changes to the cell should be applied through this.cellsStyle.
      applying style changes through $event.target.style will not update the template's style correctly.
      e.g. click on a cell, apply rules, click on same cell, ui does not get updated.

      i suspect angular is enforcing some rule to prevent me to write to the style via the DOM event object.
      or, i've missed something in the angular docs or i don't fully understand how anuglar works ... which is the most likely case.
    */
    const backgroundColor = $event.target.style.backgroundColor;
    if (!backgroundColor) {
      this.cellsStyle[curCell.row][curCell.col].backgroundColor = 'red';
      curCell.alive = true;
    } else {
      this.cellsStyle[curCell.row][curCell.col].backgroundColor = '';
    }

    this.tracking.markCell(curCell);
  }

  // NOTE: used for testing the rules and the game loop
  fooRun() {
    this.life.useTrackingService(this.tracking);

    let generation = 0;

    const intervalId = window.setInterval(() => {
      generation++;

      this.life.applyRules();

      this.life.newGeneration.forEach((c: CellInfo) => {
        this.tracking.markCell(c);

        // cellsStyle is still linked to the template i.e. can make dynamic changes to the css style
        if (c.alive) {
          this.cellsStyle[c.row][c.col].backgroundColor = 'red';
        } else {
          this.cellsStyle[c.row][c.col].backgroundColor = '';
        }
      });

      if (generation === 20) {
        window.clearInterval(intervalId);
      }
    }, 1000);
  }
}
