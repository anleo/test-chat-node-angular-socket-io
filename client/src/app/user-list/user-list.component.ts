import { Component, OnInit } from '@angular/core';
import {UserInterface} from '../../interfaces/user.interface';
import {Observable} from 'rxjs/internal/Observable';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users$: Observable<UserInterface[]> = this.usrSrv.users$;
  yourUser: UserInterface = this.usrSrv.user;

  constructor(private usrSrv: UserService) { }

  ngOnInit(): void {
  }

}
