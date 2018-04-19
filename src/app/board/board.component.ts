import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'life-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  title = 'game of life';

  constructor() {}

  ngOnInit() {}

}
