import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.page.html',
  styleUrls: ['./add-place.page.scss'],
})
export class AddPlacePage implements OnInit {

  constructor(public http : HttpClient, public toastController: ToastController) { }

  public userInfos : any;
  public userId;

  ngOnInit() {


    this.userInfos = localStorage.getItem('userInfos');
    this.userInfos = JSON.parse(this.userInfos)
    console.log(this.userInfos)
    this.userId = this.userInfos[0].id
    console.log(this.userId)
    
    this.getFilters()
    this.getCity()
  }

  public tabTitle = 'İşletme Ekle';

  
  public filterService = 'https://www.bossandalye.com/mobileApp/filter-service.php';
  public filters : any;
  
  getFilters(){

  let body = {
    'type' : 'filters'
  };
  
  this.http.post(this.filterService,body).subscribe(data=>{
    this.filters = data;
    console.log('filters')
    console.log(this.filters)
    },hata=>{
    })
  }

  denme(){
    console.log(this.filters)
  }

  public ilIlceService = 'https://www.bossandalye.com/mobileApp/il-ilce.php';
  public il : any;
  
  getCity(){

  let body = {
    'type' : 'il'
  };
  
  this.http.post(this.ilIlceService,body).subscribe(data=>{
    this.il = data;
    console.log('il')
    console.log(this.il)
    },hata=>{
    })
  }

  public ilce : any;

  getIlce(item){
    let plaka = item.target.value;
    console.log(plaka)

    let body = {
      'type' : 'ilce',
      'plaka' : plaka
    };
    
    this.http.post(this.ilIlceService,body).subscribe(data=>{
      this.ilce = data;
      console.log('ilce')
      console.log(this.ilce)
      },hata=>{
      })

  }

  public ilceId_ : any;

  ilceId(item){
    this.ilceId_ = item.target.value;
    console.log(this.ilceId_)
  }

  public placeName;
  public placeMail;
  public placePhone;
  public placeStreet;
  public placeShortAddress;
  public placeService = 'https://www.bossandalye.com/mobileApp/place-service.php';
  savePlace(){
    let body = {
      'type' : 'addPlace',
      'placeName' : this.placeName,
      'placeMail' : this.placeMail,
      'placePhone' : this.placePhone,
      'placeCityId' : this.ilceId_,
      'placeShortAddress' : this.placeShortAddress,
      'placeStreet' : this.placeStreet,
      'userId' : this.userId
    };
    let sonuc;
    this.http.post(this.placeService,body).subscribe(data=>{
      sonuc = data;
      console.log('save place')
      console.log(sonuc)
      setTimeout(() => {
        this.savePlaceFilters(sonuc)
      }, 500);
      
      },hata=>{
        this.presentToast()
      })
  }
  public isHaving;
  public filterService2 = "https://www.biterbitmez.com/services-bosSandalye/filter-service.php"

  savePlaceFilters(item){

    this.filters.forEach((element : any) => {
      
      if(element.status == 'false' || element.status == '0'){
        this.isHaving = 'false'
      }else{
        this.isHaving = 'true'
      }

    let body = {
      'type' : 'saveFilters',
      'placeId' : item[0].id,
      'filterId' : element.id,
      'filterStatus' : element.status,
      'isHaving' : this.isHaving
      
    };
    let sonuc;
    this.http.post(this.filterService2,body).subscribe(data=>{
      sonuc = data;
      console.log('filter save')
      console.log(sonuc)
      },hata=>{
      })

    });


  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'İşletme Kayıtlı.',
      duration: 3000,
      color: 'danger',
      position : 'bottom'
    });
    toast.present();
  }
}
