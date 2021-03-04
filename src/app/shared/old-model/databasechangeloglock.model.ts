import { Moment } from 'moment';

export interface IDatabasechangeloglock {
  id?: number;
  locked?: boolean;
  lockgranted?: Moment;
  lockedby?: string;
}

export class Databasechangeloglock implements IDatabasechangeloglock {
  constructor(public id?: number, public locked?: boolean, public lockgranted?: Moment, public lockedby?: string) {
    this.locked = this.locked || false;
  }
}
