import { Moment } from 'moment';

export interface IRejudging {
  id?: number;
  useridStart?: number;
  useridFinish?: number;
  starttime?: number;
  endtime?: number;
  reason?: string;
  valid?: boolean;
  createdDate?: Moment;
  lastModifiedDate?: Moment;
}

export class Rejudging implements IRejudging {
  constructor(
    public id?: number,
    public useridStart?: number,
    public useridFinish?: number,
    public starttime?: number,
    public endtime?: number,
    public reason?: string,
    public valid?: boolean,
    public createdDate?: Moment,
    public lastModifiedDate?: Moment
  ) {
    this.valid = this.valid || false;
  }
}
