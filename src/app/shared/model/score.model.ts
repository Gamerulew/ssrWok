import { Moment } from 'moment';
import { IUserBasic } from './basic-dto/user-basic.model';
import { ISkillBasic } from './basic-dto/skill-basic.model';
import { ISubmissionBasic } from './basic-dto/submission-basic.model';

export interface IScore {
  id?: number;
  idTesteResolvido?: number;
  createdDate?: Moment;
  lastModifiedDate?: Moment;
  pontos?: number;
  user?: IUserBasic;
  skill?: ISkillBasic;
  submission?: ISubmissionBasic;
}

export class Score implements IScore {
  constructor(
    public id?: number,
    public idTesteResolvido?: number,
    public createdDate?: Moment,
    public lastModifiedDate?: Moment,
    public pontos?: number,
    public user?: IUserBasic,
    public skill?: ISkillBasic,
    public submission?: ISubmissionBasic
  ) {}
}
