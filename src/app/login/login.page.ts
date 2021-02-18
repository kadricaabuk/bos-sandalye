import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public http:HttpClient, public router: Router ,public toastController: ToastController,) { }

  public userInfos : any;

  ngOnInit() {

    this.userInfos = localStorage.getItem('userInfos');
    this.userInfos = JSON.parse(this.userInfos)
    if(this.userInfos !== [] && this.userInfos !== null){
      this.router.navigateByUrl('/tabs/tab1')
    }

    

  }

  public email : any;
  public password : any;
  
  public loginService ='https://www.bossandalye.com/mobileApp/login.php'

  login(){
          
    let body = {
      'type' : 'login', 
      'mail' : this.email,
      'password' : this.password,
    };
        
    let sonuc : any;
  
    this.http.post(this.loginService,body).subscribe(data=>{
  
      sonuc = data;
      console.log('user login')
      console.log(sonuc)
    
  
      if (sonuc[0] == undefined) {
        this.presentToast2(); 
        this.email = ""
        this.password = ""
      }else{

      this.presentToast()
  
      setTimeout(() => {
        this.router.navigate(['/'])
      }, 2000);

      localStorage.setItem('userInfos', JSON.stringify(sonuc))
      this.router.navigateByUrl['/tabs/tab1']
    }
      },hata=>{
        console.log('hata var');
        this.presentToast2(); 
      })
    }
    async presentToast() {
      const toast = await this.toastController.create({
        message: 'Giriş başarılı!',
        duration: 2000,
        position: 'top',
        color:  'success'
      });
      toast.present();
    }

    async presentToast2() {
      const toast = await this.toastController.create({
        message: 'E-mail ya da şifrenizi yanlış girdiniz!',
        duration: 7000,
        position: 'top',
        color:  'danger',
        buttons: [
           {
            text: 'Tamam',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      toast.present();
    }
    
}
