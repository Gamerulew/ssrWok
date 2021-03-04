import { Moment } from 'moment';
import {IModuleTopicExercise} from "../module-topic-exercise.model";

export interface IModuleTopicBasic {
  id?: number;
  maxGrade?: number;
  targetScore?: number;
  minScore?: number;
  activated?: boolean;
  activeTime?: Moment;
  exercices?: IModuleTopicExercise[];
}
export class ModuleTopicBasic implements IModuleTopicBasic {
  constructor(
    public id?: number,
    public maxGrade?: number,
    public targetScore?: number,
    public minScore?: number,
    public activated?: boolean,
    public activeTime?: Moment,
    public exercices?: IModuleTopicExercise[]
  ) {
    this.activated = this.activated || false;
  }
}
