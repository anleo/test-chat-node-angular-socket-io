import {Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MessagesService} from '../services/messages.service';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent {
  form = new FormGroup({
    message: new FormControl('', Validators.required),
  });

  userName: string;

  @ViewChild('input', {static: true}) input: ElementRef<HTMLInputElement>;

  constructor(private msgSrv: MessagesService) {
    this.msgSrv
      .selectedUser$
      .subscribe((userName) => {
        this.userName = userName;

        if (userName && !this.form.get('message')?.value?.includes(userName)) {
          this.form.get('message')?.setValue(`@${userName}, `);
          this.input.nativeElement.focus();
        }
      });
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.send();
    }
  }

  send(): void {
    if (!this.form.get('message')?.value) {
      return;
    }

    this.msgSrv.sendMessage(this.form.get('message')?.value);
    this.form.reset({emitEvent: true});
    this.form.markAsUntouched();
  }
}
