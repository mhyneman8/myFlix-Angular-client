import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-description',
  templateUrl: './movie-description.component.html',
  styleUrls: ['./movie-description.component.css']
})
export class MovieDescriptionComponent implements OnInit {

  /**
   * Gets information of movie using Inject
   * @param data of movie
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string,
      description: string
    }
     
  ) { }

  ngOnInit(): void {
  }

}
