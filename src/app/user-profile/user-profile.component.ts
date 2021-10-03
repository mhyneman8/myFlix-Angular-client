// Problems: delete user does not redirect to Welcome
//   after updating the profile view doesn't show any info
    // birthday isn't showing up
    // favorite movies aren't showing up
    // update user button to open update dialog

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

  /**
   * gets user details with input
   */
  @Input() userDetails = { 
    Username: '', 
    Password: '', 
    Email: '', 
    BirthDate: '' }
  
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

  /**
   * gets user
   */
  getUser(): void {
    this.fetchApiData.user().subscribe((result) => {
      this.users = result;
      console.log(this.users);
    });
  }

  /**
   * user deregisters
   */
  deleteUser(): void {
    if (confirm('This can\'t be undone, are you sure?')) {
      this.fetchApiData.deleteUser().subscribe(() => {
        localStorage.clear();
        this.router.navigate(['welcome']);
        this.snackBar.open('User successfully deleted.', "OK", {
          duration: 3000
        });
      });
    }
  }

  /**
   * Opens dialog to update user
   */
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

  /**
   * Gets users favorite movies
   */
  favoriteMovies(): void {
    this.fetchApiData.moviesList().subscribe((result: any) => {
      this.movies = result;
      this.filterFavorites();
    });
  }

  /**
   * filters through full movie list to find favorites
   * @returns list of favorite movies
   */
  filterFavorites(): void {
    this.favorites = this.movies.filter((movie: any) => 
      this.users.FavoriteMovies.includes(movie._id));
    return this.favorites;
  }
  
  /**
   * Removes movie from favorites
   * @param _id of movie
   * @param title of movie
   */
  deleteFavorite(_id: string, title: string): void {
    this.fetchApiData.deleteFavoriteMovie(_id).subscribe(() => {
      this.snackBar.open(
        `${title} has been removed`, 'OK', {
          duration: 2000,
        }
      );
      setTimeout(function () {
        window.location.reload();
      }, 1000);
    });
  }

  /**
   * Opens user update dialog
   */
  openUpdateDialog(): void {
    this.dialog.open(UpdateUserComponent, {
      width: '280px'
    });
  }

}
