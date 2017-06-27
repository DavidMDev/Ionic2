
import {Component, OnInit} from "@angular/core";
import {TodoService} from "./todo.service";
import { Task } from "./task";
import {NavController} from "ionic-angular";
import {TodoDetailComponent} from "./todo-detail.component";

@Component({

  selector: 'todo-list',
  templateUrl: './todo.component.html'
})
export class TodoComponent implements OnInit {
  tasks: Task[] = [];
  todoDetailComponent = TodoDetailComponent;
  constructor(public navCtrl: NavController, private todoService: TodoService) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.todoService.getTasks().then(tasks => {
      this.tasks = tasks;
    });
  }

  add(name: string, description: string): void {
    name = name.trim();
    if (!name && !description) { return; }
    this.todoService.create(name, description)
      .then(tasks => {
        this.tasks = tasks;
      });
  }

  delete(task: Task): void {
    this.todoService
      .delete(task.id)
      .then((tasks) => {
        this.tasks = tasks;
      });
  }

  goto(task: Task): void {
    this.navCtrl.push(this.todoDetailComponent, {task: task});
  }
}
