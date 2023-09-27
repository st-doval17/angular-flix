import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Component for displaying and handling user registration form.
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})
export class UserRegistrationFormComponent implements OnInit {
  /**
   * Input data for the component, including user registration information (Username, Password, Email, Birthday).
   */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
   * Creates an instance of UserRegistrationFormComponent.
   *
   * @param fetchApiData - Service for making API calls related to user registration.
   * @param dialogRef - A reference to the MatDialogRef, which can be used to control the dialog.
   * @param snackBar - Service for displaying snackbar notifications.
   */
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  /**
   * Initiates the user registration process.
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe({
      next: (result: any) => {
        console.log(
          'User registration successful:',
          JSON.stringify(this.userData)
        );

        this.snackBar.open(result.message, 'Success', {
          duration: 2000,
        });
        this.dialogRef.close();
      },
      error: (error) => {
        console.error('User registration error:', error);
        this.snackBar.open(error, 'OK', {
          duration: 2000,
        });
      },
    });
  }
}
