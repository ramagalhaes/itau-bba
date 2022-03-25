import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackbar(message: string, type: 'sucess' | 'error', duration: number): void {
    this.snackBar.open(message, '', {duration: duration, panelClass: type === 'sucess' ? 'successSnack' : 'errorSnack'})
  }

}
