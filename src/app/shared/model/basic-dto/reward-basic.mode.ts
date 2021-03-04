import { IMedalBasic } from './basic-dto/medal-basic.model';

export interface IReward {
  id?: number;
  reward?: IMedalBasic;
}

export class Reward implements IReward {
  constructor(public id?: number, public reward?: IMedalBasic) {}
}
