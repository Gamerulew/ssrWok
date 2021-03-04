import { Moment } from 'moment';
import {IJudgehostRestriction} from "../judgehost-restriction.model";

export interface IJudgehostBasic {
  id?: number;
  description?: string;
  active?: boolean;
  polltime?: number;
  createdDate?: Moment;
  lastModifiedDate?: Moment;
  restriction?: IJudgehostRestriction;
}

export class JudgehostBasic implements IJudgehostBasic {
  constructor(
    public id?: number,
    public description?: string,
    public active?: boolean,
    public polltime?: number,
    public createdDate?: Moment,
    public lastModifiedDate?: Moment,
    public restriction?: IJudgehostRestriction
  ) {
    this.active = this.active || false;
  }
}
