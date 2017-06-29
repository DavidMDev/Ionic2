import {Component, OnInit} from "@angular/core";
import {User} from "../user";
import {UserService} from "../services/users.service";
import {NavParams, NavController} from "ionic-angular";
import {UserEditComponent} from "./user-profile-edit.component";
import {TelephoneComponent} from "../telephones/telephone.component";
import {AddressComponent} from "../addresses/address.component";

@Component({
  selector: 'users',
  templateUrl: 'users-profile.component.html'
})

export class UsersComponent implements OnInit {
  user: User;
  phoneMenu = TelephoneComponent;
  addressMenu = AddressComponent;
  editProfilePage = UserEditComponent;

  ngOnInit(): void {
    let id = this.navParams.get("user");

      if (id === 0) {
        this.usersService.getMyProfile().then(user => {
          this.user = user;
        }).catch(result => {
        });
      } else {
        this.usersService.getUser(id).then(user => {
          this.user = user;
        }).catch(result => {
        });
      }
  }

  constructor(private usersService: UserService, private navParams: NavParams, private navCtrl: NavController) {
  }

  ngOnDestroy(): void {
    this.user = null;
  }

  public managePhones(): void {
    this.navCtrl.push(this.phoneMenu);
  }

  public manageAddresses(): void{
    this.navCtrl.push(this.addressMenu);
  }

  public manageProfile(): void{
    this.navCtrl.push(this.editProfilePage);
  }
}
