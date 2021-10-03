import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { MovieDescriptionComponent } from '../movie-description/movie-description.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
    ) { }

  /**
   * Opens getMovies() when page opens
  */
  ngOnInit(): void {
    this.getMovies();
  }

  /**
   * 
   * @returns List of all movies
   * 
   */
  getMovies(): void {
    this.fetchApiData.moviesList().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies
    });
  }

  /**
   * Opens information about a Director
   * @param name of director
   * @param bio 
   * @param birth 
   * @param death 
   */
  openDirectorDialog(name: string, bio: string, birth: Date, death: Date): void {
    this.dialog.open(DirectorViewComponent, {
      data: { name, bio, birth, death },
      width: '400px'
    });
  }

  /**
   * Opens information about a genre
   * @param name of genre
   * @param description of genre
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      data: { name, description },
      width: '400px'
    });
  }

  /**
   * Opens the description of the movie
   * @param title of movie
   * @param description of movie
   */
  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(MovieDescriptionComponent, {
      data: { title, description },
      width: '400px'
    });
  }

  /**
   * Lets user add movie to their favorites
   * @param id 
   */
  addMovieToFavorites(id: string): any {
    this.fetchApiData.favoriteMovies(id).subscribe((response: any) => {
      this.snackBar.open(
        'Added to favorites!', 'OK', { duration: 2000 }
      );
    });
  }

}
