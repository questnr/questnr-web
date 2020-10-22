import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { ActionType, SnackBarDefaultData } from '../models/snackbar.model';

@Injectable({
    providedIn: 'root'
})
export class SnackBarService {
    snackBarRef: MatSnackBarRef<any>;

    constructor(private snackbar: MatSnackBar) {
    }

    showSnackBar(data: SnackBarDefaultData) {
        const duration = data.duration ? data.duration : 5000;
        const actionType = data.actionType ? data.actionType : ActionType.close;
        this.snackBarRef = this.snackbar.open(data.message, actionType, { duration: duration });

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
