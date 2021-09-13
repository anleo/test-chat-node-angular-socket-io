import {Component, ElementRef, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {MessagesService} from '../services/messages.service';
import {delay, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit {
  messages$: Observable<any[]> = this.msgSrv.messages$;

  constructor(
    private msgSrv: MessagesService,
    private el: ElementRef) {
  }

  ngOnInit(): void {
    this.messages$
      .pipe(startWith())
      .pipe(delay(100))
      .subscribe(() => {
        this.el.nativeElement.scrollTop = this.el.nativeElement.scrollHeight;
      });
  }

}
