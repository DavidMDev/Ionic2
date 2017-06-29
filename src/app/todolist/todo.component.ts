import {Component, OnInit} from "@angular/core";
import {TodoService} from "./todo.service";
import {Task} from "./task";
import {NavController, ActionSheetController} from "ionic-angular";
import {TodoDetailComponent} from "./todo-detail.component";
import {TranslateService} from "@ngx-translate/core";
import {ToastService} from "../toast/toast.service";

@Component({

  selector: 'todo-list',
  templateUrl: './todo.component.html'
})
export class TodoComponent implements OnInit {
  tasks: Task[] = [];
  todoDetailComponent = TodoDetailComponent;

  constructor(public toast: ToastService, private translationService: TranslateService, public actionSheetCtrl: ActionSheetController, public navCtrl: NavController, private todoService: TodoService) {
  }

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
    if (!name && !description) {
      return;
    }
    this.todoService.create(name, description)
      .then(tasks => {
        this.tasks = tasks;
        this.toast.presentAlert('TASK_ADDED');
      });
  }

  remove(task: Task): void {
    this.todoService
      .delete(task.id)
      .then((tasks) => {
        this.tasks = tasks;
        this.toast.presentAlert('TODO_DELETED');
      }).catch(res => console.log(res));
  }

  goto(task: Task): void {
    this.navCtrl.push(this.todoDetailComponent, {task: task.id});
  }

  presentActionSheet(task: Task) {
    this.translationService.get(['TODO_MANAGE_TITLE', 'TODO_DELETE', 'TODO_MODIFY', 'CANCEL']).subscribe(translations => {
      let actionSheet = this.actionSheetCtrl.create({
        title: translations.TODO_MANAGE_TITLE,
        buttons: [
          {
            text: translations.TODO_DELETE,
            role: 'destructive',
            handler: () => {
              this.remove(task);
            }
          },
          {
            text: translations.TODO_MODIFY,
            handler: () => {
              this.goto(task);
            }
          },
          {
            text: translations.CANCEL,
            role: 'cancel'
          }
        ]
      });
      actionSheet.present();
    });

  }
}
