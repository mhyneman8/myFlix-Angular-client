import { Component, OnInit, Input } from '@angular/core';

// close dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// brings in API calls
import { FetchApiDataService } from '../fetch-api-data.service';

// notification displayed back to user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.css']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userDetails = { Username: '', Password: '', Email: '', BirthDate: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {  }

  // Function responsible for sending the form inputs to the backend
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userDetails).subscribe((result) => {
      // Logic for a successful user registration (To be implemented)
      this.dialogRef.close(); // This will close the modal on success
      console.log(result);
      this.snackBar.open('You have successfully registered', 'OK', {
        duration: 2000
      });
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

}
