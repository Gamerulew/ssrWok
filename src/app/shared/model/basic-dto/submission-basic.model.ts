import {IExerciseBasic} from './exercise-basic.model';
import {IJudgehostBasic} from './judgehost-basic.mode';
import {LanguageBasic} from './language-basic.model';
import {IUserTeam} from '../user-team.model';
import {Moment} from 'moment';

export interface ISubmissionBasic {
  entryPoint?: string;
  exercise?: IExerciseBasic;
  expectedResults?: string;
  id?: number;
  judgeHost?: IJudgehostBasic;
  language?: LanguageBasic;
  runPercentA?: number;
  runPercentB?: number;
  runPercentC?: number;
  runPercentD?: number;
  runResultLevelA?: string;
  runResultLevelB?: string;
  runResultLevelC?: string;
  runResultLevelD?: string;
  userTeam?: IUserTeam;
  valid?: boolean;
  cacheResultScoreExercise?: number;
  cacheResultScoreTopic?: number;
  cacheResultExercise?: string;
  cacheResultTopic?: string;
  runResult?: any;
  submitTime?: Moment;
}

export class SubmissionBasic implements ISubmissionBasic {
  constructor(
    public entryPoint?: string,
    public exercise?: IExerciseBasic,
    public expectedResults?: string,
    public id?: number,
    public judgeHost?: IJudgehostBasic,
    public language?: LanguageBasic,
    public runPercentA?: number,
    public runPercentB?: number,
    public runPercentC?: number,
    public runPercentD?: number,
    public runResult?: any,
    public userTeam?: IUserTeam,
    public valid?: boolean,
    public cacheResultScoreExercise?: number,
    public cacheResultScoreTopic?: number,
    public cacheResultExercise?: string,
    public cacheResultTopic?: string,
    public submitTime?: Moment
  ) {
    this.valid = this.valid || false;
  }
}
