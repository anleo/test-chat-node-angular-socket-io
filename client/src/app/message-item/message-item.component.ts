import {Component, Input} from '@angular/core';
import {MessageInterface} from '../../interfaces/message.interface';
import {UserService} from '../services/user.service';
import {UserInterface} from '../../interfaces/user.interface';
import {MessagesService} from '../services/messages.service';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.scss']
})
export class MessageItemComponent {
  @Input() message: MessageInterface;

  user: UserInterface = this.usrSrv.user;

  constructor(private usrSrv: UserService, private msgSrv: MessagesService) {
  }

  setUser(userName: string | undefined): void {
    if (userName) {
      this.msgSrv.selectUser(userName);
    }
  }

}
