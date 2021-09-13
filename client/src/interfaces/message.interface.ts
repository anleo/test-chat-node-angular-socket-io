import {UserInterface} from './user.interface';

export interface MessageInterface {
  user: UserInterface,
  text: string,
  date?: any;
}
