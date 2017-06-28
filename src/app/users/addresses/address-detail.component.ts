import {Component, OnInit, OnDestroy} from "@angular/core";
import {Address} from "./address";
import {AddressService} from "../services/address.service";
import {NavController, NavParams} from "ionic-angular";
import {ToastService} from "../../toast/toast.service";

@Component({
  selector: 'address-detail',
  templateUrl: './address-detail.component.html'
})

export class AddressDetailComponent implements OnInit, OnDestroy {
  address: Address;

  constructor(private toast: ToastService, public navCtrl: NavController, private addressService: AddressService, public navParams: NavParams) {
  }

  ngOnInit(): void {
    let addressId = this.navParams.get("address");
    this.addressService.getAddress(addressId).then(res => {
     this.address = res;
    });
  }

  ngOnDestroy(): void {
    this.address = null;
  }

  public save(): void {
    this.addressService.modifyAddress(this.address).then(address => {
      this.address = address;
      this.toast.presentToast('ADDRESS_UPDATED');
    });
  }

  goBack(): void {
    this.navCtrl.pop();
  }
}
