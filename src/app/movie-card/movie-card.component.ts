import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { MovieDescriptionComponent } from '../movie-description/movie-description.component';
import { ActivatedRoute, Router } from '@angular/router';

// Global variables
const user = localStorage.getItem('user');

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {
  
  users: any = {};
  movies: any = [];
  favorites: any = [];
  favs: any = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router,
    ) { }

  /**
   * Opens getMovies() when page opens
  */
  ngOnInit(): void {
    this.getMovies(); 
    this.getUsersFavs();
  }

  /**
   * @returns List of all movies
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
  openDirectorDialog(name: string, bio: string, birth: string, death: Date, imageUrl: any): void {
    this.dialog.open(DirectorViewComponent, {
      data: { name, bio, birth, death, imageUrl },
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
        'Added to favorites!', 'OK', { duration: 3000 }
      );
      return this.getUsersFavs();
    });
  }

  /**
   * Lets user remove a movie from their favorites
   * @param id 
   */
  removeFromFavorites(id: string): void {
    this.fetchApiData.deleteFavoriteMovie(id).subscribe((response: any) => {
      this.snackBar.open(
        'Movie has been removed from favorites', 'OK', {
        duration: 3000,
      })
      setTimeout(function () {
      }, 3500);
      return this.getUsersFavs();
    })
   }

  /**
   * Gets a list of the users favorite movies
   */
  getUsersFavs(): void {
    this.fetchApiData.user().subscribe((resp: any) => {
      this.favs = resp.FavoriteMovies;
      return this.favs;
    });
  }

  /**
   * Tells if the movie is in the users favorites or not
   * @param id 
   * @returns 
   */
  favMovieStatus(id: any): any {
    if (this.favs.includes(id)) {
      return true;
    } else {
      return false;
    }
  }

}
