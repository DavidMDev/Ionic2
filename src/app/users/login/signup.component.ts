import {Component} from "@angular/core";
import {UserService} from "../services/users.service";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {NavController} from "ionic-angular";
import {HomePage} from "./../../home/home";
import {ToastService} from "../../toast/toast.service";

@Component({
  selector: 'signup',
  templateUrl: 'signup.component.html'
})

export class SignupComponent {
  homePage = HomePage;
  constructor(private toast: ToastService, public navCtrl: NavController, private userService: UserService, private formBuilder: FormBuilder) {
  }

  emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';

  public signupForm = this.formBuilder.group({
    firstName: new FormControl("", Validators.required),
    lastName: new FormControl("", Validators.required),
    username: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.pattern(this.emailRegex)]),
    password: new FormControl("", Validators.required),
    repeatPassword: new FormControl("", Validators.required)
  });

  public signup(event): void {
    let formData = this.signupForm.value;
    if(formData.password != formData.repeatPassword){
      this.toast.presentAlert('PASSWORDS_NOT_EQUAL');
    } else {
      this.userService.createUser(formData.firstName, formData.lastName, formData.username, formData.email, formData.password).then( result => {
        if (result) {
          this.navCtrl.push(this.homePage).then(() => this.toast.presentAlert('SIGNED_UP'));
        }
      }).catch(error => {
        this.toast.presentAlert(error);
      });
    }
  }

}
