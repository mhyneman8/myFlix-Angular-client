import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  /**
   * Params for updating user
   */
  @Input() userDetails = { 
    Username: '', 
    Password: '', 
    Email: '', 
    BirthDate: ''};
  
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UpdateUserComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  /**
   * Updates the user's information
   */
  updateUser(): void {
    this.fetchApiData.editUser(this.userDetails).subscribe((result) => {
      this.dialogRef.close();
      localStorage.setItem('user', result.user.Username);

      this.snackBar.open('User updated.', 'OK', {
        duration: 3000
      });
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 3000
      });
    });
    setTimeout(function () {
      window.location.reload();
    }, 1250);
  }

  // cancel(): void {
  //   this.dialogRef.close();
  // }

}
