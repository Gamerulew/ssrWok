import { Moment } from 'moment';
import { IAuthorBasic } from './basic-dto/author-basic.model';
import { IDifficultyLevelBasic } from './basic-dto/difficultyLevel-basic.model';
import { IStatementBasic } from './basic-dto/statement-basic.model';

export interface IExercise {
  id?: number;
  name?: string;
  slug?: string;
  description?: string;
  defaultStatement?: IStatementBasic;
  pdf?: string;
  createdDate?: Moment;
  lastModifiedDate?: Moment;
  idproblem?: number;
  timelimit?: number;
  memlimit?: number;
  outputlimit?: number;
  specialRun?: number;
  specialCompare?: number;
  specialCompareArgs?: string;
  combinedRunCompare?: boolean;
  fonteimportacao?: string;
  author?: IAuthorBasic;
  difficultyLevel?: IDifficultyLevelBasic;
  authorTopicId?: number;
}

export class Exercise implements IExercise {
  constructor(
    public id?: number,
    public name?: string,
    public slug?: string,
    public description?: string,
    public html?: string,
    public pdf?: string,
    public createdDate?: Moment,
    public lastModifiedDate?: Moment,
    public idproblem?: number,
    public timelimit?: number,
    public memlimit?: number,
    public outputlimit?: number,
    public specialRun?: number,
    public specialCompare?: number,
    public specialCompareArgs?: string,
    public combinedRunCompare?: boolean,
    public fonteimportacao?: string,
    public author?: IAuthorBasic,
    public difficultyLevel?: IDifficultyLevelBasic,
    public authorTopicId?: number,
    public defaultStatement?: IStatementBasic
  ) {
    this.combinedRunCompare = this.combinedRunCompare || false;
  }
}
