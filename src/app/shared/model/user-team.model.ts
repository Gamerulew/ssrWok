import { ITeamBasic } from './basic-dto/team-basic.model';
import { IRegistration } from './registration.model';
import { ISubmission } from './submission.model';
import { IUsersUserBasic } from './basic-dto/usersUser-basic.model';

export interface IUserTeam {
  id?: number;
  user?: IUsersUserBasic;
  team?: ITeamBasic;
  registrationList?: IRegistration[];
  submissionList?: ISubmission[];
}

export class UserTeam implements IUserTeam {
  constructor(
    public id?: number,
    public user?: IUsersUserBasic,
    public team?: ITeamBasic,
    public registrationList?: IRegistration[],
    public submissionList?: ISubmission[]
  ) {}
}
