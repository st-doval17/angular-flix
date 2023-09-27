import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

/**
 * Component for displaying genre information in a modal dialog.
 */
@Component({
  selector: 'app-genre-modal',
  templateUrl: './genre-modal.component.html',
  styleUrls: ['./genre-modal.component.scss'],
})
export class GenreModalComponent {
  /**
   * The genre object to be displayed in the modal.
   */
  genre: any;

  /**
   * Creates an instance of GenreModalComponent.
   *
   * @param dialogRef - A reference to the MatDialogRef, which can be used to control the dialog.
   * @param data - Data injected into the component, containing the genre information.
   */
  constructor(
    public dialogRef: MatDialogRef<GenreModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.genre = data.genre;
  }

  /**
   * Closes the modal dialog.
   */
  closeModal(): void {
    this.dialogRef.close();
  }
}
