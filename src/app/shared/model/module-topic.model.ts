import { Moment } from 'moment';
import { ITopicBasic } from './basic-dto/topic-basic.model';
import * as moment from 'moment';
import { IModuleTopicExercise } from './module-topic-exercise.model';
import {IModule} from "./module.model";

export interface IModuleTopic {
  module: IModule;
  topic: ITopicBasic;
  id?: number;
  maxGrade?: number;
  targetScore?: number;
  minScore?: number;
  activated?: boolean;
  createdDate?: Moment;
  lastModifiedDate?: Moment;
  startTime?: Moment;
  activeTime?: Moment;
  freezeTime?: Moment;
  endTime?: Moment;
  deactiveTime?: Moment;
  unfreezeTime?: Moment;
  availableToSee?: boolean;
  availableToDo?: boolean;
  exercises?: IModuleTopicExercise[];
  itemorder?: number;
  numAExercisesCached?: number;
  numBExercisesCached?: number;
  numCExercisesCached?: number;
  numDExercisesCached?: number;
  maxScoreCached?: number;

  dateActiveCompare(): boolean;

  dateEndCompare(): boolean;

  dateStartCompare(): boolean;
}

export class ModuleTopic implements IModuleTopic {
  constructor(
    public module: IModule,
    public topic: ITopicBasic,
    public id?: number,
    public maxGrade?: number,
    public targetScore?: number,
    public minScore?: number,
    public activated?: boolean,
    public createdDate?: Moment,
    public lastModifiedDate?: Moment,
    public startTime?: Moment,
    public activeTime?: Moment,
    public freezeTime?: Moment,
    public endTime?: Moment,
    public deactiveTime?: Moment,
    public unfreezeTime?: Moment,
    public availableToSee?: boolean,
    public availableToDo?: boolean,
    public exercises?: IModuleTopicExercise[],
    public itemorder?: number,
    public numAExercisesCached?: number,
    public numBExercisesCached?: number,
    public numCExercisesCached?: number,
    public numDExercisesCached?: number,
    public maxScoreCached?: number
  ) {
    this.activated = this.activated || false;
    this.numAExercisesCached = this.numAExercisesCached || 0;
    this.numBExercisesCached = this.numBExercisesCached || 0;
    this.numCExercisesCached = this.numCExercisesCached || 0;
    this.numDExercisesCached = this.numDExercisesCached || 0;
    this.maxScoreCached = this.maxScoreCached || 0;
    this.maxGrade = this.maxGrade || 0;

    if (this.dateActiveCompare()) {
      this.availableToSee = true;

      if (this.dateStartCompare()) {
        this.availableToDo = true;
      } else {
        this.availableToDo = false;
      }
    } else {
      this.availableToSee = false;
      this.availableToDo = false;
    }
    console.warn(this);
  }

  public dateActiveCompare(): boolean {
    const currentDate = new Date();
    if (this.activeTime && this.deactiveTime) {
      return moment(currentDate).isBetween(moment(this.activeTime), moment(this.deactiveTime));
    }
    return false;
  }

  public dateEndCompare(): boolean {
    const currentDate = new Date();
    if (this.endTime) {
      return moment(this.endTime).isBefore(currentDate);
    }
    return false;
  }

  public dateStartCompare(): boolean {
    const currentDate = new Date();
    if (this.startTime && this.endTime) {
      return moment(currentDate).isBetween(moment(this.startTime), moment(this.endTime));
    }
    return false;
  }
}
