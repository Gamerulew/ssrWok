import { Moment } from 'moment';

export interface IModuleBasic {
  id?: number;
  activated?: boolean;
  createdDate?: Moment;
  lastModifiedDate?: Moment;
}

export class ModuleBasic implements IModuleBasic {
  constructor(public id?: number, public activated?: boolean, public createdDate?: Moment, public lastModifiedDate?: Moment) {
    this.activated = this.activated || false;
  }
}
