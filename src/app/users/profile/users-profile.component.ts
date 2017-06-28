import {Component, OnInit} from "@angular/core";
import {User} from "../user";
import {UserService} from "../services/users.service";
import {NavParams, NavController} from "ionic-angular";
import {UserEditComponent} from "./user-profile-edit.component";

@Component({
  selector: 'users',
  templateUrl: 'users-profile.component.html',
  styleUrls: ['../users.component.css']
})

export class UsersComponent implements OnInit {
  user: User;
  phoneMenu = false;
  addressMenu = false;
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

  phonesMenuEnable(): void {
    this.phoneMenu ? this.phoneMenu = false : this.phoneMenu = true;
  }

  addressMenuEnable(): void{
    this.addressMenu ? this.addressMenu = false : this.addressMenu = true;
  }

  public editProfile(): void{
    this.navCtrl.push(this.editProfilePage);
  }
}
