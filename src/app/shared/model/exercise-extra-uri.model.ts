import { IDifficultyLevelBasic } from './basic-dto/difficultyLevel-basic.model';
import { IExerciseBasic } from './basic-dto/exercise-basic.model';

export interface IExerciseExtraUri {
  id?: number;
  category?: string;
  solvedNum?: number;
  difficultyLevel?: IDifficultyLevelBasic;
  exercise?: IExerciseBasic;
}

export class ExerciseExtraUri implements IExerciseExtraUri {
  constructor(
    public id?: number,
    public category?: string,
    public solvedNum?: number,
    public difficultyLevel?: IDifficultyLevelBasic,
    public exercise?: IExerciseBasic
  ) {}
}
