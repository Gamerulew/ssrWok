import { Moment } from 'moment';
import { IExerciseBasic } from './basic-dto/exercise-basic.model';
import { IDifficultyLevelBasic } from './basic-dto/difficultyLevel-basic.model';
import { IStatementBasic } from './basic-dto/statement-basic.model';
import { IScenario } from './scenario.model';
import {ITopicBasic} from "./basic-dto/topic-basic.model";

export interface ITopicExercise {
  id?: number;
  statement?: IStatementBasic;
  alias?: string;
  activated?: boolean;
  createdDate?: Moment;
  lastModifiedDate?: Moment;
  collor?: string;
  lazyEvalResults?: boolean;
  allowJudge?: boolean;
  allowSubmit?: boolean;
  readonly?: boolean;
  topic?: ITopicBasic;
  exercise?: IExerciseBasic;
  difficultyLevel?: IDifficultyLevelBasic;
  scenarios?: IScenario[];
}

export class TopicExercise implements ITopicExercise {
  constructor(
    public id?: number,
    public statement?: IStatementBasic,
    public alias?: string,
    public activated?: boolean,
    public createdDate?: Moment,
    public lastModifiedDate?: Moment,
    public collor?: string,
    public lazyEvalResults?: boolean,
    public allowJudge?: boolean,
    public allowSubmit?: boolean,
    public readonly?: boolean,
    public topic?: ITopicBasic,
    public exercise?: IExerciseBasic,
    public difficultyLevel?: IDifficultyLevelBasic
  ) {
    this.activated = this.activated || false;
    this.lazyEvalResults = this.lazyEvalResults || false;
    this.allowJudge = this.allowJudge || false;
    this.allowSubmit = this.allowSubmit || false;
    this.readonly = this.readonly || false;
  }
}
