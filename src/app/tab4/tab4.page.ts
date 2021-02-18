import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor(public router : Router, private http : HttpClient) { }
  public userInfos : any;
  public userId : any;
  ngOnInit() {
    
    this.userInfos = localStorage.getItem('userInfos')
    this.userInfos = JSON.parse(this.userInfos)
    this.userId = this.userInfos[0].id
    console.log(this.userId)
    console.log(this.userInfos)
    this.getPlaces()
    this.getFilters()
  }
  public tabTitle = 'İşletmelerim'

  
  public placeService = 'https://www.bossandalye.com/mobileApp/place-service.php';
  public places = [];
  public places_;
  getPlaces(){

  let body = {
    'type' : 'places'
  };
  
  this.http.post(this.placeService,body).subscribe(data=>{
    this.places_ = data;
    console.log('places')
    console.log(this.places_)

    this.places_.forEach(element => {
      if(this.userId == element.placeUserId){
        this.places.push(element)
      }
    });

    },hata=>{
    })
  }
  
  public filterService = 'https://www.bossandalye.com/mobileApp/filter-service.php';
  public filters : any;
  
  getFilters(){

  let body = {
    'type' : 'placeFilters'
  };
  
  this.http.post(this.filterService,body).subscribe(data=>{
    this.filters = data;
    console.log('filters')
    console.log(this.filters)
    localStorage.setItem('placeFilters',JSON.stringify(this.filters))
    },hata=>{
    })
  }

  
  goLocal(item :any){
    localStorage.setItem('choosenPlace',JSON.stringify(item))
  }

}
