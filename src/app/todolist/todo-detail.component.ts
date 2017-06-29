import { Task } from './task';
import {Component} from "@angular/core";
import {TodoService} from "./todo.service";

import {NavController, NavParams} from "ionic-angular";
import {ToastService} from "../toast/toast.service";

@Component({
  selector: 'todo-detail',
  templateUrl: './todo-detail.component.html'
})

export class TodoDetailComponent{
  task: Task;
  constructor(public navCtrl: NavController, private todoService: TodoService, public navParams: NavParams, private toast: ToastService) {
    let taskId = navParams.get("task");
    todoService.getTask(taskId).then(res => {
      this.task = res;
    });
  }

  public save(): void{
    this.todoService.modifyTask(this.task).then(task => {
      this.task = task;
      this.toast.presentAlert('TODO_UPDATED');
    })
  }

  goBack(): void {
    this.navCtrl.pop();
  }
}
