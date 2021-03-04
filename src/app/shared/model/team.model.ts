import { Moment } from 'moment';
import { IAffiliationBasic } from './basic-dto/affiliation-basic.model';
import { IUserTeam } from './user-team.model';
import { IUsersUserBasic } from './basic-dto/usersUser-basic.model';

export interface ITeam {
  id?: number;
  name?: string;
  slug?: string;
  description?: any;
  activated?: boolean;
  room?: string;
  createdDate?: Moment;
  lastModifiedDate?: Moment;
  affliliation?: IAffiliationBasic;
  userList?:IUserTeam[];
  owner?: IUsersUserBasic;
}

export class Team implements ITeam {
  constructor(
    public id?: number,
    public name?: string,
    public slug?: string,
    public description?: any,
    public activated?: boolean,
    public room?: string,
    public createdDate?: Moment,
    public lastModifiedDate?: Moment,
    public affliliation?: IAffiliationBasic,
    public users?:IUserTeam[],
    public owner?: IUsersUserBasic
  ) {
    this.activated = this.activated || false;
  }
}
