import { IAffiliationBasic } from './affiliation-basic.model';
import { IUserBasic } from './user-basic.model';
import { Moment } from 'moment';

export interface ICoursebasic {
  id?: number;
  name?: string;
  affiliation?: IAffiliationBasic;
  teacher?: IUserBasic;
  startDate?: Moment;
  endTime?: Moment;
}

export class Coursebasic implements ICoursebasic {
  constructor(
    public id?: number,
    public name?: string,
    public affiliation?: IAffiliationBasic,
    public teacher?: IUserBasic,
    public startDate?: Moment,
    public endTime?: Moment
  ) {}
}
