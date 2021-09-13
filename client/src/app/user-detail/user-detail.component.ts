import {Component, Input} from '@angular/core';
import {UserInterface} from '../../interfaces/user.interface';
import {MessagesService} from '../services/messages.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {
  @Input() user: UserInterface;
  @Input() yourUser: UserInterface;

  constructor(private msgSrv: MessagesService) {}

  setUser(userName: string | undefined): void {
    if (userName) {
      this.msgSrv.selectUser(userName);
    }
  }
}
