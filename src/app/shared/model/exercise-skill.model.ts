import { Moment } from 'moment';
import { IExerciseBasic } from './basic-dto/exercise-basic.model';
import { ISkillBasic } from './basic-dto/skill-basic.model';

export interface IExerciseSkill {
  id?: number;
  createdDate?: Moment;
  lastModifiedDate?: Moment;
  exercise?: IExerciseBasic;
  skill?: ISkillBasic;
}

export class ExerciseSkill implements IExerciseSkill {
  constructor(
    public id?: number,
    public createdDate?: Moment,
    public lastModifiedDate?: Moment,
    public exercise?: IExerciseBasic,
    public skill?: ISkillBasic
  ) {}
}
