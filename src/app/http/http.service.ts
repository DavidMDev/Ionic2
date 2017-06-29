import {Http, Headers} from "@angular/http";
import {Injectable, ViewChild} from "@angular/core";
import {LocalStorageService} from 'angular-2-local-storage';
import {AlertController, Nav} from 'ionic-angular';
import {Configuration} from "../config/config";
import 'rxjs/add/operator/toPromise';
import {TranslateService} from "@ngx-translate/core";
import {LoginComponent} from "./../users/login/login.component";

@Injectable()
export class HttpService {
  contentTypeHeader = 'Content-Type';
  contentTypeValue = 'application/json';
  csrfHeader = 'X-XSRF-TOKEN';
  serverURL = Configuration.API_HOST + '/api/';
  loginPage = LoginComponent;
  @ViewChild(Nav) navCtrl;

  public userLogged = false;

  constructor(private translationService: TranslateService, private alertController: AlertController, private http: Http, private localStorageService: LocalStorageService) {
    this.localStorageService.set('csrf_token', '');
    this.localStorageService.set('logged', false);

  }

  get(url: string): Promise<any> {
    let headers = new Headers();
    headers.set(this.contentTypeHeader, this.contentTypeValue);
    let token = '' + this.localStorageService.get('csrf_token');
    headers.set(this.csrfHeader, token);
    return new Promise((resolve, reject) => {
      this.http.get(this.serverURL + url, {headers: headers, withCredentials:true}).toPromise().then(result => {
        resolve(result);
      }).catch(error => {
        this.handleError(reject, error);
      });
    });
  }

  put(url: string, obj: Object): Promise<any> {
    let headers = new Headers();
    headers.set(this.contentTypeHeader, this.contentTypeValue);
    let token = '' + this.localStorageService.get('csrf_token');
    headers.set(this.csrfHeader, token);
    return new Promise((resolve, reject) => {
      this.http.put(this.serverURL + url, JSON.stringify(obj), {headers: headers, withCredentials:true})
        .toPromise().then(result => {
        resolve(result);
      }).catch(error => {
        this.handleError(reject, error);
      });
    });
  }

  post(url: string, obj: Object): Promise<any> {
    let headers = new Headers();
    headers.set(this.contentTypeHeader, this.contentTypeValue);
    let token = '' + this.localStorageService.get('csrf_token');
    headers.set(this.csrfHeader, token);
    return new Promise((resolve, reject) => {
      this.http.post(this.serverURL + url, JSON.stringify(obj), {headers: headers, withCredentials:true})
        .toPromise().then(result => {
        resolve(result);
      }).catch(error => {
        this.handleError(reject, error);
      });
    });
  }

  delete(url: string): Promise<any> {
    let headers = new Headers();
    headers.set(this.contentTypeHeader, this.contentTypeValue);
    let token = '' + this.localStorageService.get('csrf_token');
    headers.set(this.csrfHeader, token);
    return new Promise((resolve, reject) => {
      this.http.delete(this.serverURL + url, {headers: headers, withCredentials:true}).toPromise().then(result => {
        resolve(result);
      }).catch(error => {
        this.handleError(reject, error);
      });
    });
  }

  login(username: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      //get translations
      this.translationService.get(['EMPTY_USERNAME_PASSWORD', 'BAD_USERNAME_PASSWORD']).subscribe(translations => {

        if (username === '' || password === '') {
          reject(translations.EMPTY_USERNAME_PASSWORD);
        }
        const authHeader = 'Authorization';
        let authValue = 'Basic ' + btoa(username + ':' + password);

        let headers = new Headers();
        headers.set('X-Requested-With', 'XMLHttpRequest');
        headers.set(this.contentTypeHeader, this.contentTypeValue);
        headers.set(authHeader, authValue);
        this.http
        let url = this.serverURL + 'token';
        this.http.get(url, {headers: headers, withCredentials:true}).toPromise().then(result => {
          console.log(result.headers);
          let body = result.json();
          this.localStorageService.set('csrf_token', body.token);
          this.userLogged = true;
          resolve(true);
        }).catch(error => {
          if (error.status == 401) {
            reject(translations.BAD_USERNAME_PASSWORD);
          }
        });
      });
    });
  }

  logOut() {
    this.userLogged = false;
    this.localStorageService.set('csrf_token', '');
  }

  redirectToLogIn() {
    this.logOut();
    this.navCtrl.push(this.loginPage);
  }

  handleError(reject, error) {
    this.translationService.get(['ERROR', 'LOGGED_OUT', 'REQUIRES_LOG_IN', 'OK', 'LOG_IN']).subscribe(translations => {
      if (error.status === 403) {
        let alert;
        if (this.userLogged) {
          alert = this.alertController.create({
            title: translations.ERROR,
            subTitle: translations.LOGGED_OUT,
            buttons: [translations.OK, {
              text: translations.LOG_IN,
              handler: () => {
                this.redirectToLogIn();
              }
            }]
          });
          alert.present();
        } else {
          alert = this.alertController.create({
            title: translations.ERROR,
            subTitle: translations.LOGGED_OUT,
            buttons: [translations.OK, {
              text: translations.LOG_IN,
              handler: () => {
                this.redirectToLogIn();
              }
            }]
          });
          alert.present();
        }
      }
    });
  }
}
