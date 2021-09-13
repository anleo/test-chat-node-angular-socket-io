import {Injectable} from '@angular/core';
import {UserService} from './user.service';
import {MessageInterface} from '../../interfaces/message.interface';
import {Socket} from 'ngx-socket-io';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {SocketEnum} from '../../enums/socket.enums';



@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  messages$: BehaviorSubject<MessageInterface[]> = new BehaviorSubject<MessageInterface[]>([]);
  selectedUser$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private usrSrv: UserService, private socket: Socket) {
    this.init();
  }

  init(): void {
    this.socket.on(SocketEnum.ON_CONNECT, (ev: any) => {
      console.log('[WS Connected]');
    });

    this.socket.on(SocketEnum.ALL_MESSAGES, (messages: MessageInterface[]) => {
      this.messages$.next(messages);
    });
  }

  selectUser(userName: string): void {
    this.selectedUser$.next(userName);
  }

  sendMessage(msg: string) {
    const message: MessageInterface = {
      user: this.usrSrv.user,
      text: msg,
    };

    this.socket.emit(SocketEnum.GET_MESSAGE, message);
    this.selectUser('');
  }
}
