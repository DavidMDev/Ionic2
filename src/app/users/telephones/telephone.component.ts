import {Component, OnInit} from "@angular/core";
import {TelephoneService} from "../services/telephones.service";
import {Telephone} from "./telephone";
import {NavController} from "ionic-angular";
import {TelephoneDetailComponent} from "./telephone-detail.component";
import {ToastService} from "../../toast/toast.service";

@Component({
  selector: 'phone-manager',
  templateUrl: 'telephone.component.html'
})

export class TelephoneComponent implements OnInit {
  telephoneDetailComponent = TelephoneDetailComponent;
  telephones: Array<Telephone>;

  ngOnInit(): void {
    this.telephones = [];
    this.telephoneService.getTelephones().then(telephones => {
      this.telephones = telephones;
    });
  }

  ngOnDestroy(): void {
    this.telephones = null;
  }

  constructor(private telephoneService: TelephoneService, public navCtrl: NavController, private toast: ToastService) {
  }

  delete(phone: Telephone): void {
    this.telephoneService.deleteTelephone(phone.id).then((telephones) => {
      this.telephones = telephones;
      this.toast.presentAlert('TELEPHONE_DELETED');
    });
  }

  add(number: string, type: string): void {
    //check to see if the number string only contains digits
    if (/^\d+$/.test(number)) {
      this.telephoneService.createTelephone(number, type).then(telephones => {
        this.telephones = telephones;
        this.toast.presentAlert('TELEPHONE_CREATED');
      });
    } else {
      this.toast.presentAlert('TELEPHONE_INVALID_NUMBER');
    }
  }

  goto(telephone: Telephone): void {
    this.navCtrl.push(this.telephoneDetailComponent, {telephone: telephone.id});
  }

  goBack() {
    this.navCtrl.pop();
  }
}
