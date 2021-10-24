// Problems: delete user does not redirect to Welcome
//   after updating the profile view doesn't show any info
    // birthday isn't showing up
    // favorite movies aren't showing up

import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { FormControl, Validators } from '@angular/forms';

import { UpdateUserComponent } from '../update-user/update-user.component';
import { WelcomePageComponent } from '../welcome-page/welcome-page.component'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  @Input() userDetails = { Username: '', Password: '', Email: '', BirthDate: '' }
  
  users: any = {};
  movies: any = {};
  favorites: any = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.fetchApiData.user().subscribe((result) => {
      this.users = result;
      this.favoriteMovies();
    });
  }

  deleteUser(): void {
    if (confirm('This can\'t be undone, are you sure?')) {
      this.fetchApiData.deleteUser().subscribe((resp: any) => {
        localStorage.clear();
        
        this.snackBar.open('User successfully deleted.', "OK", {
          duration: 3000
        });
        this.router.navigate(['welcome']);
      });
    }
  }

  editUser(): void {
    // this.fetchApiData.editUser(this.userDetails).subscribe((result) => {


      this.snackBar.open('User successfully updated.', 'OK', {
        duration: 3000
      });
    // }, (result) => {
    //   this.snackBar.open(result, 'OK', {
    //     duration: 3000
    //   });
    // });
  }

  favoriteMovies(): void {
    this.fetchApiData.moviesList().subscribe((result: any) => {
      this.movies = result;
      this.filterFavorites();
    });
  }

  filterFavorites(): void {
    this.favorites = this.movies.filter((movie: any) => 
      this.users.FavoriteMovies.includes(movie._id));
    return this.favorites;
  }
  
  deleteFavorite(_id: string, title: string): void {
    this.fetchApiData.deleteFavoriteMovie(_id).subscribe(() => {
      this.snackBar.open(
        `${title} has been removed from favorites.`, 'OK', {
          duration: 2000,
        }
      );
      setTimeout(function () {
        window.location.reload();
      }, 3500);
      return this.getUser();
    });
  }

  openUpdateDialog(): void {
    this.dialog.open(UpdateUserComponent, {
      width: '280px'
    });
  }

}
