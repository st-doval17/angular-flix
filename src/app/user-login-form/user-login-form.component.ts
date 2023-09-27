import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * Component for displaying a user login form.
 */
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  /**
   * Input data for the component, including the user's username and password.
   */
  @Input() userData = { Username: '', Password: '' };

  /**
   * Creates an instance of UserLoginFormComponent.
   *
   * @param fetchApiData - Service for making API calls related to user registration and authentication.
   * @param dialogRef - A reference to the MatDialogRef, which can be used to control the dialog.
   * @param snackBar - Service for displaying snackbar notifications.
   * @param router - Service for navigating between views in the application.
   */
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  /**
   * Initiates the user login process.
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe({
      next: (data) => {
        this.dialogRef.close();
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        this.snackBar.open("You've been logged in", 'OK', {
          duration: 2000,
        });
        this.router.navigate(['movies']);
      },
      error: (data) => {
        this.snackBar.open(data, 'OK', {
          duration: 2000,
        });
      },
    });
  }
}
