import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

/**
 * Component for displaying director information in a modal dialog.
 */
@Component({
  selector: 'app-director-modal',
  templateUrl: './director-modal.component.html',
  styleUrls: ['./director-modal.component.scss'],
})
export class DirectorModalComponent {
  /**
   * The director object to be displayed in the modal.
   */
  director: any;

  /**
   * Creates an instance of DirectorModalComponent.
   *
   * @param dialogRef - A reference to the MatDialogRef, which can be used to control the dialog.
   * @param data - Data injected into the component, containing the director information.
   */
  constructor(
    public dialogRef: MatDialogRef<DirectorModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.director = data.director;
  }

  /**
   * Closes the modal dialog.
   */
  closeModal(): void {
    this.dialogRef.close();
  }
}
