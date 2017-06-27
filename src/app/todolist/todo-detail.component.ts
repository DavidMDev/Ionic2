import { Task } from './task';
import {Component} from "@angular/core";
import {TodoService} from "./todo.service";

import {NavController, NavParams} from "ionic-angular";

@Component({
  selector: 'todo-detail',
  templateUrl: './todo-detail.component.html'
})

export class TodoDetailComponent{
  task: Task;
  constructor(public navCtrl: NavController, private todoService: TodoService, public navParams: NavParams) {
    this.task = navParams.get("task");
  }

  public save(): void{
    this.todoService.modifyTask(this.task).then(task => {
      this.task = task;
    })
  }

  goBack(): void {
    this.navCtrl.pop();
  }
}
