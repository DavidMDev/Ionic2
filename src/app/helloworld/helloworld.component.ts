import {Component, Input} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Configuration} from "../config/config";

@Component({
  selector: 'helloworld',
  templateUrl: './helloworld.component.html'
})
export class HelloworldComponent {
  messageUrl: string;
  message: string;

  constructor(private http: Http) {
  }


  @Input()
  name: string = "";

  sendMessage() {
    this.getMessage(this.name);
  }

  public getMessage(name) {
    if (name != "") {
      this.messageUrl = Configuration.API_HOST + "/hello?name=" + name;
    } else {
      this.messageUrl = Configuration.API_HOST + "/hello";
    }
    this.http.get(this.messageUrl).subscribe((data: Response) => {
      this.message = data.text();
    });
  }
}
