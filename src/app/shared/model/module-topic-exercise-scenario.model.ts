import { Moment } from 'moment';
import { IModuleTopicExerciseBasic } from './basic-dto/moduleTopicExercise-basic.model';
import { IScenarioBasic } from './basic-dto/scenario-basic.model';

export interface IModuleTopicExerciseScenario {
  id?: number;
  activated?: boolean;
  createdDate?: Moment;
  lastModifiedDate?: Moment;
  moduleTopicExercise?: IModuleTopicExerciseBasic;
  scenario?: IScenarioBasic;
}

export class ModuleTopicExerciseScenario implements IModuleTopicExerciseScenario {
  constructor(
    public id?: number,
    public activated?: boolean,
    public createdDate?: Moment,
    public lastModifiedDate?: Moment,
    public moduleTopicExercise?: IModuleTopicExerciseBasic,
    public scenario?: IScenarioBasic
  ) {
    this.activated = this.activated || false;
  }
}
