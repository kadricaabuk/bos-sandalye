import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {

  constructor(public http : HttpClient) { }
  
  public choosenPlace : any;
  public choosenPlaceFilters : any = [];
  public userInfos : any;
  public userId : any;
  public placeFilters : any;
  
  ngOnInit() {
    this.choosenPlace = localStorage.getItem('choosenPlace')
    this.choosenPlace = JSON.parse(this.choosenPlace)
    console.log(this.choosenPlace)
    
    this.userInfos = localStorage.getItem('userInfos')
    this.userInfos = JSON.parse(this.userInfos)
    this.userId = this.userInfos[0].id
    console.log(this.userId)
    console.log(this.userInfos)
  
    this.placeFilters = localStorage.getItem('placeFilters')
    this.placeFilters = JSON.parse(this.placeFilters)
    console.log(this.placeFilters)

    this.placeFilters.forEach((element : any) => {
      if(element.placeId == this.choosenPlace.placeId){
        this.choosenPlaceFilters.push(element)
        console.log(element)
      }
      });
      console.log(this.choosenPlaceFilters);
       


    this.getFavList()
    // this.isFav()

  }

  slideOpts = {
    initialSlide: 1,
    speed: 400
  }; 
public favStatus : any = 0;

public favPlaces : any;
public placeService = 'https://www.bossandalye.com/mobileApp/place-service.php';
public favService = 'https://www.bossandalye.com/mobileApp/fav-service.php';

getFavList(){

  
  let body = {
    'type' : 'favList',
    'userId' : this.userId
  };
      
  let sonuc : any;

  this.http.post(this.favService,body).subscribe(data=>{

    this.favPlaces = data;
    console.log('user save')
    console.log(this.favPlaces)

    this.favPlaces.forEach(element => {
      if (this.choosenPlace.placeId == element.placeId) {
        console.log('var')
        this.favStatus = 1;
      }
    },hata=>{
    })
  })
}

favButton(){

  
  let body = {
    'type' : 'addFav',
    'userId' : this.userId,
    'placeId' : this.choosenPlace.placeId
  };
      
  let sonuc : any;

  this.http.post(this.favService,body).subscribe(data=>{

   this.favStatus= data;
    console.log('fav button')
    console.log(this.favStatus)

   } ,hata=>{})
   
  

}

}

// isFav(){
//   this.favPlaces.forEach(element => {
//     if (this.choosenPlace.id == element.placeId) {

//       console.log('var')
//     if (this.favStatus == 0) {
//       this.favStatus = 1;
//     }else{
//       this.favStatus = 0;
//     }
//  }
// });
// }





