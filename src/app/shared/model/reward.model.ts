import { Moment } from 'moment';
import { IUserBasic } from './basic-dto/user-basic.model';
import { IMedalBasic } from './basic-dto/medal-basic.model';

export interface IReward {
  id?: number;
  createdDate?: Moment;
  lastModifiedDate?: Moment;
  user?: IUserBasic;
  reward?: IMedalBasic;
}

export class Reward implements IReward {
  constructor(
    public id?: number,
    public createdDate?: Moment,
    public lastModifiedDate?: Moment,
    public user?: IUserBasic,
    public reward?: IMedalBasic
  ) {}
}
