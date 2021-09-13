import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie';
import {UserInterface} from '../../interfaces/user.interface';
import {generateSlug} from 'random-word-slugs';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {Socket} from 'ngx-socket-io';
import {SocketEnum} from '../../enums/socket.enums';

const USER_KEY = 'user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users$: BehaviorSubject<UserInterface[]> = new BehaviorSubject<UserInterface[]>([]);

  constructor(private cook: CookieService, private socket: Socket) {
  }

  get user(): UserInterface {
    const userRaw = this.cook.get(USER_KEY);
    return userRaw ? JSON.parse(userRaw) : null;
  }

  set user(user: UserInterface) {
    if (!user) {
      return;
    }

    this.cook.put(USER_KEY, JSON.stringify(user));
  }

  init(): void {
    if (!this.user) {
      this.generateUser();
    }

    this.socket.on(SocketEnum.ON_CONNECT, (ev: any) => {
      this.socket.emit(SocketEnum.SET_ME, this.user);

      this.socket.on(SocketEnum.ON_DISCONNECT, () => {
        this.socket.emit(SocketEnum.REMOVE_USER, this.user?.id);
      });
    });

    this.socket.on(SocketEnum.GET_USERS, (users: UserInterface[]) => {
      this.users$.next(users || []);
    });
  }

  generateUser(): void {
    const slug = generateSlug(2, {format: 'camel'});

    const user: UserInterface = {
      id: Math.floor(Math.random() * 1000),
      name: slug,
    };

    this.user = user;
  }
}
