import { IJudgingTests } from './judging-tests.model';
import { Moment } from 'moment';
import { IExerciseBasic } from './basic-dto/exercise-basic.model';
import { IDifficultyLevelBasic } from './basic-dto/difficultyLevel-basic.model';
import { IScenarioSkill } from './scenario-skill.model';

export interface IJudgingScenario {
  id?: number;
  name?: string;
  slug?: string;
  description?: string;
  visible?: boolean;
  testtype?: string;
  helpMsg?: string;
  itemorder?: number;
  createdDate?: Moment;
  lastModifiedDate?: Moment;
  exercise?: IExerciseBasic;
  difficultyLevel?: IDifficultyLevelBasic;
  skills?: IScenarioSkill[];
  helpTopicId?: number;
  judgingTestsList?: IJudgingTests[];
}

export class JudgingScenario implements IJudgingScenario {
  constructor(
    public id?: number,
    public name?: string,
    public slug?: string,
    public description?: string,
    public visible?: boolean,
    public testtype?: string,
    public helpMsg?: string,
    public itemorder?: number,
    public createdDate?: Moment,
    public lastModifiedDate?: Moment,
    public exercise?: IExerciseBasic,
    public difficultyLevel?: IDifficultyLevelBasic,
    public helpTopicId?: number,
    public judgingTestsList?: IJudgingTests[]
  ) {
    this.visible = this.visible || false;
    this.itemorder = this.itemorder || 0;
  }
}
