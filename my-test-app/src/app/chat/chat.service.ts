import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export class Message {
  constructor(public author: string, public content: string) {}
}
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor() { }
  conversation = new Subject<Message[]>()
  messageMap = {
    "Hi": "Hello",
    "Who are you": "I do not have a name",
    "What is your role": "Just guide for the user",
    "defaultmsg": "I can't understand your text.",
  }
  
  getBotAnswer(msg:string) {
    const userMessage = new Message('user', msg)
    this.conversation.next([userMessage])
    const botMessage = new Message('bot', this.getBotMessage(msg))
    setTimeout(() => {
      this.conversation.next([botMessage])
    }, 1500)
  }

  getBotMessage(question:string) {
    let answer = this.messageMap[question as keyof typeof this.messageMap]
    return answer || this.messageMap['defaultmsg']
  }
}
