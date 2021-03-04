import {IUserBasic} from "./user-basic.model";
import {ITeamBasic} from "./team-basic.model";


export interface IUserTeamBasic {
  id?: number;
  user?: IUserBasic;
  team?: ITeamBasic;
}

export class UserTeamBasic implements IUserTeamBasic {
  constructor(
    public id?: number,
    public user?: IUserBasic,
    public team?: ITeamBasic
  ) {}
}
