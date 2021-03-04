import { IUsersUserBasic } from './usersUser-basic.model';

export interface ITeamBasic {
  id?: number;
  name?: string;
  slug?: string;
  owner?: IUsersUserBasic;
}

export class TeamBasic implements ITeamBasic {
  constructor(
    public id?: number,
    public name?: string,
    public slug?: string,
    public owner?: IUsersUserBasic
  ) {}
}
