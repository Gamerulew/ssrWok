import { IExerciseBasic } from './basic-dto/exercise-basic.model';
import { IDifficultyLevelBasic } from './basic-dto/difficultyLevel-basic.model';
import { ISolutionFile } from './solution-file.model';

export interface ISolution {
  id?: number;
  name?: string;
  slug?: string;
  description?: string;
  exercise?: IExerciseBasic;
  difficultyLevel?: IDifficultyLevelBasic;
  files?:ISolutionFile[];
}

export class Solution implements ISolution {
  constructor(
    public id?: number,
    public name?: string,
    public slug?: string,
    public description?: string,
    public exercise?: IExerciseBasic,
    public difficultyLevel?: IDifficultyLevelBasic,
    public files?:ISolutionFile[]
  ) {}
}
