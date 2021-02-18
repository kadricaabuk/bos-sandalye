import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor(public http : HttpClient) {}

  public tabTitle = 'İşletme Ara';
  public places : any;
  

  ngOnInit(){
    this.getPlaces()
    this.getFilters()
  }

  public placeService = 'https://www.bossandalye.com/mobileApp/place-service.php';

  getPlaces(){

  let body = {
    'type' : 'places'
  };
  
  this.http.post(this.placeService,body).subscribe(data=>{
    this.places = data;
    console.log('places')
    console.log(this.places)
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

  doRefresh(event) {
    console.log('Begin async operation');
    this.getPlaces();
    this.getFilters();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }


}
