import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { formatDate } from '@angular/common';

import { UpdateUserComponent } from '../update-user/update-user.component';

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
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<UserProfileComponent>
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.fetchApiData.user().subscribe((result) => {
      this.users = result;
      console.log(result);
      this.favoriteMovies();
    });
  }

  deleteUser(): void {
    if (confirm('This can\'t be undone, are you sure?')) {
      console.log('delete User before');
      this.fetchApiData.deleteUser().subscribe(() => {
        console.log('delete user after')
        localStorage.clear();
        this.router.navigate(['welcome']);
        this.snackBar.open('User successfully deleted.', "OK", {
          duration: 3000
        });
      });
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

  editUser(): void {
      this.snackBar.open('User successfully updated.', 'OK', {
        duration: 3000
      });
  }

  formatDate(birthday: string) {
    return formatDate(birthday, 'MM-dd-yyyy', 'en-US');
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

      return this.getUser();
    });
  }

  openUpdateDialog(): void {
    this.dialog.open(UpdateUserComponent, {
      width: '280px'
    });
  }

}
