import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://myflix788.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  constructor(private http: HttpClient) { }

  // User Registration
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // User Login
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // Get all movies
  moviesList(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(map(this.extractResponseData), 
      catchError(this.handleError));
  }

  // Get one movie
  movieCard(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/:Title', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get director
  director(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/director/:Name', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get genre
  genre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genres/:Name', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(map(this.extractResponseData),
        catchError(this.handleError)
    );
  }

  // Get user
  user(): Observable<any> {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('user');
    return this.http.get(apiUrl + `users/${userName}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(map(this.extractResponseData),
        catchError(this.handleError)
    );
  }

  // Get favorite movies for user
  userFavoriteMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('user');
    return this.http.get(apiUrl + `users/${userName}/movies`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(map(this.extractResponseData),
        catchError(this.handleError)
    );
  }


  // Add a movie to favorites list
  favoriteMovies(_id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('user');
    return this.http.post(apiUrl + `users/${userName}/movies/${_id}`, {}, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(map(this.extractResponseData),
        catchError(this.handleError)
    );
  }

  // Edit user
  editUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('user');
    return this.http.put(apiUrl + `users/${userName}`, userDetails, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(map(this.extractResponseData),
        catchError(this.handleError)
    );
  }

  // Delete User
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('user');
    return this.http.delete(apiUrl + `users/${userName}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(map(this.extractResponseData),
        catchError(this.handleError)
    );
  }

  // Delete a movie from favorites list 
  deleteFavoriteMovie(_id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('user');
    return this.http.post(apiUrl + `users/${userName}/movies/remove/${_id}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(map(this.extractResponseData),
        catchError(this.handleError)
    );
  }

  // Non-typed response extraction
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    }
    return throwError(
      'Something bad happened; please try again later'
    );
  }
}