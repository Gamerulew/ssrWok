import { Moment } from 'moment';
import { IExerciseBasic } from './basic-dto/exercise-basic.model';
import { IDifficultyLevelBasic } from './basic-dto/difficultyLevel-basic.model';
import { IScenarioSkill } from './scenario-skill.model';

export interface IScenario {
  id?: number;
  name?: string;
  slug?: string;
  description?: string;
  activated?: boolean;
  testtype?: string;
  helpMsg?: string;
  itemorder?: number;
  createdDate?: Moment;
  lastModifiedDate?: Moment;
  exercise?: IExerciseBasic;
  difficultyLevel?: IDifficultyLevelBasic;
  skills?: IScenarioSkill[];
  helpTopicId?: number;
}

export class Scenario implements IScenario {
  constructor(
    public id?: number,
    public name?: string,
    public slug?: string,
    public description?: string,
    public activated?: boolean,
    public testtype?: string,
    public helpMsg?: string,
    public itemorder?: number,
    public createdDate?: Moment,
    public lastModifiedDate?: Moment,
    public exercise?: IExerciseBasic,
    public difficultyLevel?: IDifficultyLevelBasic,
    public helpTopicId?: number
  ) {
    this.activated = this.activated || false;
    this.itemorder = this.itemorder || 0;
  }
}
