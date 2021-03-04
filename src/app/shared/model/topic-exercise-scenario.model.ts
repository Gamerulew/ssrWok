import { Moment } from 'moment';
import { IScenarioBasic } from './basic-dto/scenario-basic.model';
import { ITopicExerciseBasic } from './basic-dto/topicExercise-basic.model';
import { IScenarioTestBasic } from './basic-dto/scenarioTest-basic.model';

export interface ITopicExerciseScenario {
  id?: number;
  activated?: boolean;
  createdDate?: Moment;
  lastModifiedDate?: Moment;
  topicExercise?: ITopicExerciseBasic;
  test?: IScenarioTestBasic;
  scenario?: IScenarioBasic;
}

export class TopicExerciseScenario implements ITopicExerciseScenario {
  constructor(
    public id?: number,
    public activated?: boolean,
    public createdDate?: Moment,
    public lastModifiedDate?: Moment,
    public topicExercise?: ITopicExerciseBasic,
    public test?: IScenarioTestBasic,
    public scenario?: IScenarioBasic
  ) {
    this.activated = this.activated || false;
  }
}
