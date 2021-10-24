
// Problem: fill in favorite heart if its a favorite


import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { MovieDescriptionComponent } from '../movie-description/movie-description.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {
  
  users: any = {};
  movies: any = {};
  favorites: any = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.getMovies(); 
    this.getUsersFavs();
  }

  getMovies(): void {
    this.fetchApiData.moviesList().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies
    });
  }

  getUsersFavs(): void {
    // const user = localStorage.getItem('user');
    this.fetchApiData.user().subscribe((response: any) => {
      this.favorites = response.Favorites;
      console.log(this.favorites);
      return this.favorites;
    })
  }

  openDirectorDialog(name: string, bio: string, birth: string, death: Date, imageUrl: any): void {
    this.dialog.open(DirectorViewComponent, {
      data: { name, bio, birth, death, imageUrl },
      width: '400px'
    });
  }

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      data: { name, description },
      width: '400px'
    });
  }

  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(MovieDescriptionComponent, {
      data: { title, description },
      width: '400px'
    });
  }

  addMovieToFavorites(id: string): any {
    this.fetchApiData.favoriteMovies(id).subscribe((response: any) => {
      this.snackBar.open(
        'Added to favorites!', 'OK', { duration: 2000 }
      );
    });
  }

  removeFromFavorites(id: string, Title: string): void {
    this.fetchApiData.deleteFavoriteMovie(id).subscribe((response: any) => {
      this.snackBar.open(
        `${Title} has been removed from favorties`, 'OK', {
        duration: 3000,
      })
      setTimeout(function () {
       window.location.reload();
      }, 3500);
      return this.users();
    })
   }

  favoriteMovies(): void {
    this.fetchApiData.moviesList().subscribe((result: any) => {
      this.movies = result;
      this.filterFavorites();
    });
  }

  filterFavorites(): any {
    this.favorites = this.movies.filter((movie: any) => 
      this.users.FavoriteMovies.includes(movie._id));
    return this.favorites;
  }

  favMovieStatus(id: any): any {
    this.favorites = this.movies.filter((movie: any) => 
      this.users.FavoriteMovies.includes(movie._id));
    if (this.favorites.includes(id)) {
      return true;
    } else {
      return false;
    }
   
  }

}
