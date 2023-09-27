import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

/**
 * Component for displaying movie details in a dialog.
 */
@Component({
  selector: 'app-movie-details-dialog',
  templateUrl: './movie-details-dialog.component.html',
  styleUrls: ['./movie-details-dialog.component.scss'],
})
export class MovieDetailsDialogComponent {
  /**
   * Creates an instance of MovieDetailsDialogComponent.
   *
   * @param dialogRef - A reference to the MatDialogRef, which can be used to control the dialog.
   * @param data - Data injected into the component, containing the movie details.
   */
  constructor(
    public dialogRef: MatDialogRef<MovieDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  /**
   * Closes the movie details dialog.
   */
  closeModal(): void {
    this.dialogRef.close();
  }
}
