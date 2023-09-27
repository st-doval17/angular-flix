import { Component, OnInit, Input } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MovieDetailsDialogComponent } from '../movie-details-dialog/movie-details-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreModalComponent } from '../genre-modal/genre-modal.component';
import { DirectorModalComponent } from '../director-modal/director-modal.component';
import { Router } from '@angular/router';

/**
 * Component for displaying movie cards and managing user interactions with movies.
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  /**
   * Input data for the component, typically containing user information.
   */
  @Input() userData: any;

  /**
   * An array of movie objects to display.
   */
  movies: any[] = [];

  /**
   * A map to track whether each movie is in the user's favorites.
   */
  favoritesMap: { [movieId: string]: boolean } = {};

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.loadUserFavorites();
  }

  /**
   * Fetches the list of movies from the API.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Opens a dialog to display movie details.
   * @param movie - The movie object to display details for.
   */
  openMovieDetailsDialog(movie: any): void {
    const dialogRef = this.dialog.open(MovieDetailsDialogComponent, {
      width: '800px',
      data: movie,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  /**
   * Opens a modal dialog to display genre information.
   * @param movie - The movie object containing genre information.
   */
  openGenreModal(movie: any): void {
    const dialogRef = this.dialog.open(GenreModalComponent, {
      width: '600px',
      data: { genre: movie.Genre },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Genre modal closed');
    });
  }

  /**
   * Opens a modal dialog to display director information.
   * @param movie - The movie object containing director information.
   */
  openDirectorModal(movie: any): void {
    const dialogRef = this.dialog.open(DirectorModalComponent, {
      width: '800px',
      data: { director: movie.Director },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Director modal closed');
    });
  }

  /**
   * Adds or removes a movie from the user's favorites.
   * @param movieId - The ID of the movie to add or remove from favorites.
   */
  addToFavorites(movieId: string): void {
    const userObject = JSON.parse(localStorage.getItem('user') || '{}');
    const username = userObject.Username;
    const token = localStorage.getItem('token');

    console.log(username);
    console.log(movieId);

    console.log('Adding/Removing from favorites:', movieId);

    if (username && token) {
      if (this.favoritesMap[movieId]) {
        this.deleteFavoriteMovie(username, movieId);
      } else {
        this.fetchApiData.addFavoriteMovie(username, movieId).subscribe(
          (response) => {
            console.log('Successfully added to favorites:', response);
            this.favoritesMap[movieId] = true;
            this.snackBar.open('Movie added to favorites', 'OK', {
              duration: 2000,
            });
            this.saveUserFavorites();
          },
          (error) => {
            console.error('Failed to add movie to favorites:', error);
            this.snackBar.open('Failed to add movie to favorites', 'OK', {
              duration: 2000,
            });
          }
        );
      }
    } else {
      console.log('User data (username or token) is missing or undefined');
    }
  }

  /**
   * Loads user's favorite movies and populates the favoritesMap.
   */
  loadUserFavorites(): void {
    const userObject = JSON.parse(localStorage.getItem('user') || '{}');
    const favoriteMovies = userObject.FavoriteMovies || [];

    favoriteMovies.forEach((movieId: string) => {
      this.favoritesMap[movieId] = true;
    });
  }

  /**
   * Saves updated favorites to local storage.
   */
  saveUserFavorites(): void {
    const userObject = JSON.parse(localStorage.getItem('user') || '{}');
    userObject.FavoriteMovies = Object.keys(this.favoritesMap).filter(
      (movieId) => this.favoritesMap[movieId]
    );
    localStorage.setItem('user', JSON.stringify(userObject));
  }

  /**
   * Deletes a movie from the user's favorites.
   * @param username - The username of the user.
   * @param movieId - The ID of the movie to remove from favorites.
   */
  deleteFavoriteMovie(username: string, movieId: string): void {
    console.log('Deleting movie:', movieId, 'for user:', username);

    this.fetchApiData.deleteFavoriteMovie(username, movieId).subscribe(
      (response) => {
        console.log('Successfully removed from favorites:', response);

        this.favoritesMap[movieId] = false;
        this.snackBar.open('Movie removed from favorites', 'OK', {
          duration: 2000,
        });

        this.saveUserFavorites();
      },
      (error) => {
        console.error('Failed to remove movie from favorites:', error);
        this.snackBar.open('Failed to remove movie from favorites', 'OK', {
          duration: 2000,
        });
      }
    );
  }

  /**
   * Checks if a movie is already in the user's favorites.
   * @param movieId - The ID of the movie to check.
   * @returns True if the movie is in favorites, false otherwise.
   */
  isMovieInFavorites(movieId: string): boolean {
    const userObject = JSON.parse(localStorage.getItem('user') || '{}');
    const favoriteMovies = userObject.FavoriteMovies || [];

    return favoriteMovies.includes(movieId);
  }

  /**
   * Logs the user out and navigates to the 'welcome' page.
   */
  logout(): void {
    localStorage.removeItem('user');
    localStorage.clear();
    this.router.navigate(['welcome']);
  }
}
