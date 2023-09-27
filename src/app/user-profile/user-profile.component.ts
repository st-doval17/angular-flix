import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserRegistrationService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

/**
 * Component for displaying and managing user profile information.
 */
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  /**
   * The user object containing user profile data.
   */
  user: any = {};

  /**
   * Input data for the component, typically containing user information.
   */
  @Input() userData: any = {};

  /**
   * Creates an instance of UserProfileComponent.
   *
   * @param fetchApiData - Service for making API calls related to user registration and authentication.
   * @param snackBar - Service for displaying snackbar notifications.
   * @param router - Service for navigating between views in the application.
   */
  constructor(
    public fetchApiData: UserRegistrationService,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    const savedUser = localStorage.getItem('user');
    this.user = JSON.parse(savedUser || '');
    this.getUserData();
  }

  /**
   * Retrieves user data and formats it for display.
   */
  getUserData(): void {
    this.userData = {
      Username: this.user.Username,
      Email: this.user.Email,
      Birthday: formatDate(this.user.Birthday, 'yyyy-MM-dd', 'en-US', 'UTC+0'),
    };
  }

  /**
   * Updates the user's profile information.
   */
  updateUser(): void {
    const username = this.userData.Username;

    this.fetchApiData.editUser(username, this.userData).subscribe(
      () => {
        this.snackBar.open('User successfully updated', 'OK', {
          duration: 2000,
        });
      },
      (error) => {
        this.snackBar.open(error, 'OK', {
          duration: 2000,
        });
      }
    );
  }

  /**
   * Deletes the user's account.
   */
  deleteUser(): void {
    this.fetchApiData.deleteUser(this.user.Username).subscribe(
      (response: any) => {
        if (response && response.message) {
          console.error('Error deleting user:', response.message);
          this.snackBar.open(response.message, 'OK', {
            duration: 2000,
          });
        } else if (response === null) {
          localStorage.clear();
          this.snackBar.open('User successfully deleted', 'OK', {
            duration: 2000,
          });

          this.router.navigate(['welcome']);
        } else {
          console.error('Unexpected response for user deletion:', response);
          this.snackBar.open('An unexpected error occurred', 'OK', {
            duration: 2000,
          });
        }
      },
      (error) => {
        console.error('Error deleting user:', error);
        this.snackBar.open('An error occurred while deleting the user', 'OK', {
          duration: 2000,
        });
      }
    );
  }

  /**
   * Navigates back to the movie listing page.
   */
  returnToMovies(): void {
    this.router.navigate(['/movies']);
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
