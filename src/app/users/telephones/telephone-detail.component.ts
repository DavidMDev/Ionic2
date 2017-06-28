import {TelephoneService} from "../services/telephones.service";
import {Telephone} from "./telephone";
import {OnDestroy, OnInit, Component} from "@angular/core";
import {ToastService} from "../../toast/toast.service";
import {NavController, NavParams} from "ionic-angular";

@Component({
  selector: 'telephone-detail',
  templateUrl: './telephone-detail.component.html'
})

export class TelephoneDetailComponent implements OnInit, OnDestroy {
  telephone: Telephone;
  sub: any;

  constructor(private toast: ToastService, public navCtrl: NavController, public navParams: NavParams, private telephoneService: TelephoneService) {
  }

  ngOnInit(): void {
    let telephoneId = this.navParams.get("telephone");
    this.telephoneService.getTelephone(telephoneId).then(res => {
      this.telephone = res;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.telephone = null;
  }

  public save(): void {
    this.telephoneService.modifyTelephone(this.telephone).then(telephone => {
      this.telephone = telephone;
      this.toast.presentToast('TELEPHONE_UPDATED');
    });
  }

  goBack(): void {
    this.navCtrl.pop();
  }
}
