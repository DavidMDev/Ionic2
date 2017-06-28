import {TranslateService} from "@ngx-translate/core";
import {ToastController} from "ionic-angular";

export class ToastService {
  constructor (public toastCtrl: ToastController, private translationService: TranslateService){
  }

  public presentToast(message:string) {
    this.translationService.get(message).subscribe(translation => {
      let toast = this.toastCtrl.create({
        message: translation,
        duration: 3000
      });
      toast.present();
    });
  }
}
