import { Injectable, EventEmitter } from '@angular/core';
import {Configuration} from "../config/config";

@Injectable()
export class ChatService {

  private socket: WebSocket;
  private listener: EventEmitter<any> = new EventEmitter();

  public constructor(){
  }

  public connect(){
    this.socket = new WebSocket(Configuration.WS_HOST + '/websocket');
    this.socket.onopen = event => {
      this.listener.emit({"type": "open", "data": event});
    };
    this.socket.onclose = event => {
      console.log(event);
      this.listener.emit({"type": "close", "data": event});
    };
    this.socket.onmessage = event => {
      this.listener.emit({"type": "message", "data": event.data});
    };
  }

  public send(data: string) {
    this.socket.send(data);
  }

  public close() {
    this.socket.close();
  }

  public getEventListener() {
    return this.listener;
  }
}
