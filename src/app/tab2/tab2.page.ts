import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  constructor(public http : HttpClient) {}

  ngOnInit(){
    
    this.userInfos = localStorage.getItem('userInfos')
    this.userInfos = JSON.parse(this.userInfos)
    this.userId = this.userInfos[0].id
    console.log(this.userId)
    console.log(this.userInfos)
    this.getFavPlaces()
    this.getFilters()
  
    
  }
  public tabTitle = 'Favoriler'
  public userInfos;
  public userId;


  public favPlaces : any;
  public placeService = 'https://www.bossandalye.com/mobileApp/place-service.php';
  public favService = 'https://www.bossandalye.com/mobileApp/fav-service.php';
  
  public favList;
  getFavPlaces(){

    let body = {
      'type' : 'favList',
      'userId' : this.userId
    };
        
    let sonuc : any;
  
    this.http.post(this.favService,body).subscribe(data=>{

      this.favList = data;
    }
  ,hata=>{
      })
    ;
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

  
  doRefresh(event) {
    console.log('Begin async operation');
    this.getFavPlaces()
    this.getFilters()
    

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }


  goLocal(item :any){
    localStorage.setItem('choosenPlace',JSON.stringify(item))
  }
}
