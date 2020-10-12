import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackBarDefaultData } from 'models/snackbar.model';

@Injectable({
    providedIn: 'root'
})
export class SnackBarService {
    snackBarRef: MatSnackBarRef<any>;

    constructor(private snackbar: MatSnackBar) {
    }

    showSnackBar(data: SnackBarDefaultData) {
        this.snackBarRef = this.snackbar.open(data.message, data.actionType, { duration: data.duration });

        this.snackBarRef.onAction().subscribe(() => {
            data.onAction();
        });
    }

    closeSnackBar() {
        if (this.snackBarRef) {
            this.snackBarRef.dismiss();
        }
    }
}