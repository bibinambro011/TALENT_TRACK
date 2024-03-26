import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { allMessage } from 'src/app/Model/chatModel';
import { ChatService } from 'src/app/Services/chat.service';
import { SocketService } from 'src/app/Services/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  message!: string;
  messages: any = [];
  agentId: string = '';
  chatId = '';
  @ViewChild('messageContainer') private messageContainer!: ElementRef;

  private routeSubscription: Subscription | undefined;
  private chatServiceSubscription: Subscription | undefined;
  private socketServiceSubscription: Subscription | undefined;

  constructor(
    private chatService: ChatService,
    private route: ActivatedRoute,
    private store: Store,
    private socketService: SocketService
  ) { }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.agentId = params['id'];
      console.log("messages are===>", this.messages)
    });

    let data = {
      userId: localStorage.getItem("userId"),
      agentId: this.agentId
    };

    this.chatServiceSubscription = this.chatService.accessChat(data).subscribe((message: any) => {
      this.chatId = message._id;
      this.chatService.allMessages(message._id).subscribe((data: allMessage) => {
        if (Array.isArray(data)) {
          data.forEach((res) => {
            this.messages.push(res);
          });
        }
      });
    });

    this.socketServiceSubscription = this.socketService.onMessage().subscribe((res: any) => {
      if (res.chat._id == this.chatId) {
        console.log("send messages is==>",res)
        this.messages.push(res);
      }
    });
  }

  ngOnDestroy() {
    // Unsubscribe from all subscriptions to prevent memory leaks
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    if (this.chatServiceSubscription) {
      this.chatServiceSubscription.unsubscribe();
    }
    if (this.socketServiceSubscription) {
      this.socketServiceSubscription.unsubscribe();
    }
  }

  sendMessage() {
    if(this.message.trim().length ==0){
      return
    }
    let data = {
      content: this.message,
      chatId: this.chatId,
      userId: localStorage.getItem("userId")
    };

    this.chatService.sendMessage(data).subscribe((data) => {
      this.socketService.messageSendfromClient(data);
    });
    this.message = '';
  }

  onSubmit() {
    this.sendMessage();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }
  startvideochat(link:any){
    console.log("link is==>", link)
    const url = `${link}`
    window.location.href = url;
  }
}