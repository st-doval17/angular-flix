import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

/** The API URL that provides data for the client app. */
const apiUrl = 'https://sandoval-flixdb-eadce14b2925.herokuapp.com/';

@Injectable({
  providedIn: 'root',
})
export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}

  /**
   * Makes an API call for user registration.
   *
   * @param userDetails - The user details to be registered.
   * @returns An observable with the registration response.
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Makes an API call for user login.
   *
   * @param userDetails - The user details for login.
   * @returns An observable with the login response.
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login?' + new URLSearchParams(userDetails), {})
      .pipe(catchError(this.handleError));
  }

  /**
   * Makes an API call to get all movies.
   *
   * @returns An observable with the list of all movies.
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Makes an API call to get a single movie by its title.
   *
   * @param Title - The title of the movie to retrieve.
   * @returns An observable with the movie details.
   */
  getOneMovie(Title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/' + Title, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Makes an API call to get movies by a director's name.
   *
   * @param directorName - The name of the director.
   * @returns An observable with the list of movies by the director.
   */
  getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/director/' + directorName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Makes an API call to get movies by a genre's name.
   *
   * @param genreName - The name of the genre.
   * @returns An observable with the list of movies in the genre.
   */
  getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/genre/' + genreName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Makes an API call to get user details by their username.
   *
   * @param userName - The username of the user to retrieve.
   * @returns An observable with the user's details.
   */
  getUser(userName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'users/' + userName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Makes an API call to add a movie to a user's favorite movies.
   *
   * @param userName - The username of the user.
   * @param MovieID - The ID of the movie to add to favorites.
   * @returns An observable with the response status.
   */
  getFavoriteMovies(userName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'favoriteMovies/' + userName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Makes an API call to add a movie to a user's favorite movies.
   *
   * @param userName - The username of the user.
   * @param MovieID - The ID of the movie to add to favorites.
   * @returns An observable with the response status.
   */
  addFavoriteMovie(userName: string, MovieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const requestBody = { movie_id: MovieID };

    console.log(apiUrl + 'users/' + userName + '/movies/' + MovieID);

    return this.http
      .post(apiUrl + 'users/' + userName + '/movies/' + MovieID, requestBody, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Makes an API call to edit user data.
   *
   * @param username - The username of the user to edit.
   * @param userData - The updated user data.
   * @returns An observable with the edited user data.
   */
  editUser(username: string, userData: any): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .put(apiUrl + 'users/' + username, userData, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Makes an API call to delete a user by username.
   *
   * @param userName - The username of the user to delete.
   * @returns An observable indicating the success or failure of the deletion.
   */
  deleteUser(userName: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .delete(apiUrl + 'users/' + userName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
        responseType: 'text',
      })
      .pipe(
        map((response: any) => {
          if (response && response.includes('was deleted')) {
            return null;
          } else {
            throw new Error(
              'Unexpected response for user deletion: ' + response
            );
          }
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Makes an API call to delete a movie from a user's favorite movies.
   *
   * @param userName - The username of the user.
   * @param MovieID - The ID of the movie to delete from favorites.
   * @returns An observable with the response status.
   */
  deleteFavoriteMovie(userName: string, MovieID: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .delete(apiUrl + 'users/' + userName + '/movies/' + MovieID, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Extracts and maps the API response data to a specific type.
   *
   * @param res - The API response.
   * @returns The extracted and mapped data of type T.
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  /**
   * Handles HTTP errors and returns an observable with an error message.
   *
   * @param error - The HTTP error response.
   * @returns An observable with an error message.
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
