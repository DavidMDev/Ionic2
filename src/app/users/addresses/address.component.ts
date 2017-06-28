import {Component, OnInit} from "@angular/core";
import {AddressService} from "../services/address.service";
import {Address} from "./address";
import {NavController} from "ionic-angular";
import {AddressDetailComponent} from "./address-detail.component";
import {ToastService} from "../../toast/toast.service";

@Component({
  selector: 'address-manager',
  templateUrl: 'address.component.html'
})

export class AddressComponent implements OnInit {
  addresses: Array<Address>;
  addressDetailComponent = AddressDetailComponent;

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.addresses = null;
  }

  constructor(private addressService: AddressService, public navCtrl: NavController, private toast: ToastService) {
    this.addressService.getAddresss().then(addresses => {
      this.addresses = addresses;
    });
  }

  delete(address: Address): void {
    this.addressService.deleteAddress(address.id).then((addresses) => {
      this.addresses = addresses;
      this.toast.presentToast('ADDRESS_DELETED');
    });
  }

  add(postcode: string,
      streetName: string,
      addressDetails: string,
      houseNumber: number,
      city: string): void {
    //check to see if the number string only contains digits
    this.addressService.createAddress(postcode,
      streetName,
      addressDetails,
      houseNumber,
      city).then(addresses => {
      this.addresses = addresses;
      this.toast.presentToast('ADDRESS_CREATED');
    });
  }

  goto(address: Address): void {
    this.navCtrl.push(this.addressDetailComponent, {address: address.id});
  }
}
