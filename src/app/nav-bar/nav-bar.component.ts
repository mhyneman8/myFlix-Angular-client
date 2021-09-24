// Problem: navigation buttons get pushed off screen at a certain point

import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(
    // public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  logout(): void {
    if (confirm('Are you sure you want to log out?')) {
      localStorage.clear();
      this.router.navigate(['welcome']);
      this.snackBar.open("User has been logged out.", "OK", {
        duration: 2000,
      });
    }
  }
  
}
