// Problem: fill in favorite heart if its a favorite

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

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.moviesList().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies
    });
  }

  openDirectorDialog(name: string, bio: string, birth: string, death: Date): void {
    this.dialog.open(DirectorViewComponent, {
      data: { name, bio, birth, death },
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

}
