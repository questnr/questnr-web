import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public notification: string = "notifications";
  public  home: string = "home";
  public group: string = "supervisor_account";
  public message: string = "chat";
  public account: string = "account_circle";

  constructor() { }

  public changeIcon(newIcon: string, oldIcon: string) {
    if(oldIcon == "notifications"){
      this.notification= newIcon;
    }
    if(oldIcon == "supervisor_account"){
      this.group= newIcon;
    }
    if(oldIcon == "chat"){
      this.message= newIcon;
    }
    if(oldIcon == "account_circle"){
      this.account= newIcon;
    }
    if(oldIcon == "home"){
      this.home= newIcon;
    }
  }
  ngOnInit() {

  }

}
