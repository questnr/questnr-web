import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostReportService } from './post-report.service';

@Component({
  selector: 'app-post-report',
  templateUrl: './post-report.component.html',
  styleUrls: ['./post-report.component.scss']
})
export class PostReportComponent implements OnInit {
  formGroup: FormGroup;
  reportOptions: string[] = [
    'spam',
    'inappropriate',
    'other'
  ];
  postId;
  reportText = new FormControl('');
  postReportCategory = new FormControl(this.reportOptions[2], [
    Validators.required
  ]);
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PostReportComponent>,
    private postReportService: PostReportService) {
    this.formGroup = this.fb.group({
      postReportCategory: this.postReportCategory,
      reportText: this.reportText
    });
    this.postId = this.data.postId;
  }

  ngOnInit(): void {
  }

  selectOption(option) {
    this.formGroup.get('postReportCategory').setValue(option);
  }

  reportThisPost() {
    if (this.formGroup.valid) {
      this.postReportService.reportPost(this.postId,
        this.formGroup.get('postReportCategory').value,
        this.formGroup.get('reportText').value).subscribe((res: any) => {
          this.dialogRef.close();
          this.snackBar.open("Post has been reported!", 'close', { duration: 5000 });
        }, (err: any) => {
          if (err && err.errorMessage) {
            this.snackBar.open(err.errorMessage, 'close', { duration: 5000 });
          }
        });

    } else {
      this.formGroup.markAllAsTouched();
    }
  }
}
