import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'life-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  boardWidth: number;
  boardHeight: number;
  boardMatrix: any[][];
  boardDimensionsStyle: any;

  ngOnInit() {
    // NOTE: manually setting the boardWidth and boardHeight for now
    this.boardWidth = 50;
    this.boardHeight = 30;
    this.boardMatrix = [];

    this.boardDimensionsStyle = {
      'grid-template-columns': `repeat(${this.boardWidth}, 30px)`,
      'grid-template-rows': `repeat(${this.boardHeight}, 30px)`
    };

    for (let row = 0; row < this.boardHeight; row++) {
      this.boardMatrix[row] = new Array(this.boardWidth);

      for (let col = 0; col < this.boardWidth; col++) {
        this.boardMatrix[row][col] = {
          // index starts at 1 for grid layout
          'grid-row': row + 1,
          'grid-column': col + 1
        };
      }
    }
  }

}
