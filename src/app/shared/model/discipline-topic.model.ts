import { IDisciplineBasic } from './basic-dto/discipline-basic.model';
import { ITopicBasic } from './basic-dto/topic-basic.model';

export interface IDisciplineTopic {
  discipline: IDisciplineBasic;
  topic: ITopicBasic;
  maxGrade?: number;
  targetScore?: number;
  minScore?: number;
  itemorder?: number;
  numAExercisesCached?: number;
  numBExercisesCached?: number;
  numCExercisesCached?: number;
  numDExercisesCached?: number;
  maxScoreCached?: number;
}

export class DisciplineTopic implements IDisciplineTopic {
  constructor(
    public discipline: IDisciplineBasic,
    public topic: ITopicBasic,
    public maxGrade?: number,
    public targetScore?: number,
    public minScore?: number,
    public itemorder?: number,
    public numAExercisesCached?: number,
    public numBExercisesCached?: number,
    public numCExercisesCached?: number,
    public numDExercisesCached?: number,
    public maxScoreCached?: number
  ) {
    this.numAExercisesCached = this.numAExercisesCached || 0;
    this.numBExercisesCached = this.numBExercisesCached || 0;
    this.numCExercisesCached = this.numCExercisesCached || 0;
    this.numDExercisesCached = this.numDExercisesCached || 0;
    this.maxScoreCached = this.maxScoreCached || 0;
  }
}
