import {Component, OnInit} from "@angular/core";
import {User} from "../user";
import {UserService} from "../services/users.service";
import {NavController} from "ionic-angular";
import {ToastService} from "../../toast/toast.service";

@Component({
  templateUrl: 'user-profile-edit.component.html'
})

export class UserEditComponent implements OnInit {
  user: User;

  ngOnInit(): void {
    this.usersService.getMyProfile().then(user => {
      this.user = user;
    }).catch(result => {
      console.log(result);
    });
  }

  constructor(private usersService: UserService, public navCtrl: NavController, private toast: ToastService) {
  }

  ngOnDestroy(): void {
    this.user = null;
  }

  public save(user: User, password, repeatPassword): void {
    if (password) {
      if (password == repeatPassword) {
        let requestObject = {password: '', lastName: user.lastName, firstName: user.firstName, username: user.username};
        requestObject.password = password;
        this.usersService.modifyUser(requestObject).then((result) => {
          this.toast.presentToast('PROFILE_SAVED');
        }).catch((err) => {
          this.toast.presentToast(err.message);
        });
      } else {
        this.toast.presentToast('PASSWORDS_NOT_EQUAL');
      }
    } else {
      let requestObject = {lastName: user.lastName, firstName: user.firstName, username: user.username};
      this.usersService.modifyUser(requestObject).then((result) => {
        this.toast.presentToast('PROFILE_SAVED');
      }).catch((err) => {
        this.toast.presentToast(err.message);
      });
    }
  }

  public back(): void {
    this.navCtrl.pop();
  }
}
