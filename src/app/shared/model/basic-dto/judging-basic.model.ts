import { Moment } from 'moment';

export interface IJudgingBasic {
  id?: number;
  starttime?: number;
  endtime?: number;
  verified?: boolean;
  juryMember?: string;
  verifyComment?: string;
  valid?: boolean;
  seen?: boolean;
  createdDate?: Moment;
}

export class JudgingBasic implements IJudgingBasic {
  constructor(
    public id?: number,
    public starttime?: number,
    public endtime?: number,
    public verified?: boolean,
    public juryMember?: string,
    public verifyComment?: string,
    public valid?: boolean,
    public seen?: boolean,
    public createdDate?: Moment
  ) {
    this.verified = this.verified || false;
    this.valid = this.valid || false;
    this.seen = this.seen || false;
  }
}
