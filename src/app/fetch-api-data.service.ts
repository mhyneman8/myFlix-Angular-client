import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

// Declares api url that houses data
const apiUrl = 'https://myflix788.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  constructor(private http: HttpClient) { }

  /**
   * User Registration
   * @param userDetails Username, Password, Email, Birthday
   * @returns endpoint for user registration
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.userRegistrationHandleError)
    );
  }

  /**
   * User Login
   * @param userDetails Username, Password
   * @returns returns endpoint for login
   */
  private userRegistrationHandleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }

    if (error.status === 400) {
      return throwError(`Username ${error.error}. Please login to your account`);
    } else {
      return throwError(`Error registering user, please check all required fields`);
    }
  }
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Get all movies
   * @returns endpoint to movie list and bearer token
   */
  moviesList(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(map(this.extractResponseData), 
      catchError(this.handleError));
  }

  /**
   * Get one movie
   * @param title of movie
   * @returns endpoint for choosen movie and bearer token
   */
  movieCard(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + title, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Get director
   * @param name name of director
   * @returns endpoint for director and bearer token
   */
  director(name: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/director/' + name, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
 
  /**
   * Get genre
   * @params movie genre name
   * @returns endpoint for genre and bearer token
   */
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

  /**
   * Get user
   * @params username
   * @returns endpoint for genre and bearer token
   */
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

  /**
   * Get favorite movies for user
   * @params username
   * @returns endpoint for user's favorite movies and bearer token
   */
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

  /**
   * Add a movie to favorites list
   * @param _id of movie
   * @param username
   * @returns endpoint for adding movie and bearer token
   */
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

  /**
   * Edit user
   * @param userDetails Username, Password, Email, Birthday
   * @param username
   * @returns updates for user and bearer token
   */
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

  /**
   * Delete User
   * @param username
   * @returns endpoint for deleting user + bearer token
   */
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('user');
    return this.http.delete(apiUrl + 'users/' + userName, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
        catchError(this.handleError)
    );
  }
  
  /**
   * Delete a movie from favorites list
   * @param _id  of movie
   * @param username
   * @returns endpoint for deleting favorite movie 
   */
  deleteFavoriteMovie(_id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('user');
    return this.http.post(apiUrl + `users/${userName}/Movies/remove/${_id}`, {}, {
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