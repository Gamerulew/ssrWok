export interface IExerciseBasic {
  id?: number;
  name?: string;
  slug?: string;
  description?: string;
  difficultyLevelId?: string;
}

export class ExerciseBasic implements IExerciseBasic {
  constructor(
    public id?: number,
    public name?: string,
    public slug?: string,
    public description?: string,
    public difficultyLevelId?: string
  ) {}
}
