import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.page.html',
  styleUrls: ['./profile-page.page.scss'],
})
export class ProfilePagePage implements OnInit {

  constructor() { }

  public userInfos : any;

  ngOnInit() {
    this.userInfos = localStorage.getItem('userInfos')
    this.userInfos = JSON.parse(this.userInfos  )
  }

  public tabTitle = "Profil"

}
