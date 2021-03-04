import { IScenarioBasic } from './basic-dto/scenario-basic.model';
import { IExerciseBasic } from './basic-dto/exercise-basic.model';

export interface IScenarioTestBasic {
  id?: number;
  name?: string;
  testScenario?: IScenarioBasic;
  exercise?: IExerciseBasic;
}

export class ScenarioTestBasic implements IScenarioTestBasic {
  constructor(public id?: number, public name?: string, public testScenario?: IScenarioBasic, public exercise?: IExerciseBasic) {}
}
