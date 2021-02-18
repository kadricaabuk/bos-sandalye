import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  constructor(public toastController: ToastController) { }
  public password;
  public password2;
  ngOnInit() {
    

  }

  public passwordConfirm = 1;

  toastShow(){
    if(this.passwordConfirm == 0){
      this.presentToast();
    }
  }

  deneme(){
    if(this.password !==  this.password2){
      this.passwordConfirm == 0;
    }else if(this.password !==  this.password2){
      this.passwordConfirm == 1;
    }
  }


  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Şifrenizi Kontrol Edin!',
      color : 'danger',
      position : 'top',
      duration: 1000
    });
    toast.present();
  }
}
