import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-view',
  templateUrl: './genre-view.component.html',
  styleUrls: ['./genre-view.component.css']
})
export class GenreViewComponent implements OnInit {

  /**
   * Gets information of genre using Inject
   * @param data of genre
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      name: string,
      description: string
    }
  ) { }

  ngOnInit(): void {
  }

}
