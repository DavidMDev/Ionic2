import {Component} from "@angular/core";
import {HttpService} from "../../http/http.service";
import {FormBuilder, Validators, FormControl} from "@angular/forms";
import {NavController} from "ionic-angular";
import {ToastService} from "../../toast/toast.service";
import {HomePage} from "./../../home/home";

@Component({
  selector: 'login',
  templateUrl: 'login.component.html'
})

export class LoginComponent {
  homePage = HomePage;
  constructor(public navCtrl: NavController, private httpService: HttpService, private formBuilder: FormBuilder, private toast: ToastService) {
  }

  public loginForm = this.formBuilder.group({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  });

  public login(event) {
    let formData = this.loginForm.value;
    this.httpService.login(formData.username, formData.password).then(result => {
      if (result) {
        this.navCtrl.push(this.homePage);
      }
    }).catch(error => {
      this.toast.presentToast(error);
    });
  }
}
