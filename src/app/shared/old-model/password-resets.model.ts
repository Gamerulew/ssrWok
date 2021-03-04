import { Moment } from 'moment';

export interface IPasswordResets {
  id?: number;
  email?: string;
  token?: string;
  createdAt?: Moment;
}

export class PasswordResets implements IPasswordResets {
  constructor(public id?: number, public email?: string, public token?: string, public createdAt?: Moment) {}
}
