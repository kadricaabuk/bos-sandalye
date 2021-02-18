import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  constructor(public router : Router) {}

  ngOnInit(){
    if(!localStorage.getItem('userInfos')){
      this.router.navigateByUrl('login')
    }
  }

}
