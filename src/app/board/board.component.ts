import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'life-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  boardWidth: number;
  boardHeight: number;
  boardDimensions: any;

  constructor() {
    // NOTE: manually setting the boardWidth and boardHeight for now
    this.boardWidth = 50;
    this.boardHeight = 30;
  }

  ngOnInit() {
    this.boardDimensions = {
      'grid-template-columns': `repeat(${this.boardWidth}, 30px)`,
      'grid-template-rows': `repeat(${this.boardHeight}, 30px)`
    };
  }

}
