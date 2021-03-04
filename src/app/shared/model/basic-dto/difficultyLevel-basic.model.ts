export interface IDifficultyLevelBasic {
  id: string;
  name?: string;
  topicCoefficient?: number;
  exerciseCoefficient?: number;
}

export class DifficultyLevelBasic implements IDifficultyLevelBasic {
  constructor(public id: string, public name?: string, public topicCoefficient?: number, public exerciseCoefficient?: number) {}
}
