import { Moment } from 'moment';
import { IScenarioBasic } from './basic-dto/scenario-basic.model';
import { SkillBasic } from './basic-dto/skill-basic.model';

export interface IScenarioSkill {
  id?: number;
  points?: number;
  createdDate?: Moment;
  lastModifiedDate?: Moment;
  testScenario?: IScenarioBasic;
  skill?: SkillBasic;
}

export class ScenarioSkill implements IScenarioSkill {
  constructor(
    public id?: number,
    public points?: number,
    public createdDate?: Moment,
    public lastModifiedDate?: Moment,
    public testScenario?: IScenarioBasic,
    public skill?: SkillBasic
  ) {}
}
