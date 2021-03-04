import { Moment } from 'moment';
import { IUserTeamBasic } from './basic-dto/userTeam-basic.model';
import { ICoursebasic } from './basic-dto/course-basic.model';

export interface IRegistration {
  id?: number;
  cacheScore?: number;
  cacheProblemsSolved?: number;
  createdDate?: Moment;
  lastModifiedDate?: Moment;
  userTeam?: IUserTeamBasic;
  course?: ICoursebasic;
}

export class Registration implements IRegistration {
  constructor(
    public id?: number,
    public cacheScore?: number,
    public cacheProblemsSolved?: number,
    public createdDate?: Moment,
    public lastModifiedDate?: Moment,
    public userTeam?: IUserTeamBasic,
    public course?: ICoursebasic
  ) {}
}
