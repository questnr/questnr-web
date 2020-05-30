import {Component, ElementRef, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {
  descriptionText: any;
  background: any;
  editDescription = false;
  loading = false;
  owner = true;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DescriptionComponent>) {

  }
  @ViewChild('description') editDesc: ElementRef;
  ngOnInit() {
    this.descriptionText = this.data.text;
    this.background = this.data.communityAvatar;
  }

  getImgUrl(src: string) {
    return src ? `url(${src})` : `url("assets/default.jpg")`;
  }

  toggleEdit() {
    this.loading = false;
    this.editDescription = !this.editDescription;
  }

  editDescriptionText() {
    const desc = this.editDesc.nativeElement.value;
    if (desc) {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.editDescription = false;
        this.descriptionText = desc;
      }, 2000);
    }
  }
}
