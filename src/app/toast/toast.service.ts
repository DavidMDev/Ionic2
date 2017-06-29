import {TranslateService} from "@ngx-translate/core";
import {AlertController} from "ionic-angular";
import {Injectable} from "@angular/core";

@Injectable()
export class ToastService {
  constructor (public alertCtrl: AlertController, public translationService: TranslateService){
  }

  public presentAlert(message:string) {
    let translateArray = [];
    translateArray.push(message);
    translateArray.push('OK');
    this.translationService.get(translateArray).subscribe(translations => {
      let alert = this.alertCtrl.create({
        message: translations[message],
        buttons: [translations.OK]
      });
      alert.present();
    });
  }
}
