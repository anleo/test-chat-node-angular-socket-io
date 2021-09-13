import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InputTextComponent} from './input-text/input-text.component';
import {UserListComponent} from './user-list/user-list.component';
import {MessageListComponent} from './message-list/message-list.component';
import {MessageItemComponent} from './message-item/message-item.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CookieModule, CookieService} from 'ngx-cookie';
import {UserService} from './services/user.service';
import {MessagesService} from './services/messages.service';
import {UserDetailComponent} from './user-detail/user-detail.component';

import {SocketIoConfig, SocketIoModule} from 'ngx-socket-io';


const config: SocketIoConfig = {
  url: 'ws://localhost:3000', options: {
    path: '/test',
    transports: ['websocket']
  }
};


@NgModule({
  declarations: [
    AppComponent,
    InputTextComponent,
    UserListComponent,
    MessageListComponent,
    MessageItemComponent,
    UserDetailComponent,
  ],
  imports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,

    CookieModule.forRoot(),
    SocketIoModule.forRoot(config),

    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [
    UserService,
    CookieService,
    MessagesService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
