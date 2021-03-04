import { Moment } from 'moment';

export interface IModuleTopicExerciseBasic {
  id?: number;
  alias?: string;
  activated?: boolean;
  createdDate?: Moment;
  lastModifiedDate?: Moment;
  collor?: string;
}

export class ModuleTopicExerciseBasic implements IModuleTopicExerciseBasic {
  constructor(
    public id?: number,
    public alias?: string,
    public activated?: boolean,
    public createdDate?: Moment,
    public lastModifiedDate?: Moment,
    public collor?: string
  ) {
    this.activated = this.activated || false;
  }
}
