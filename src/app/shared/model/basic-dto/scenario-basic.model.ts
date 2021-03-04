export interface IScenarioBasic {
  id?: number;
  name?: string;
  slug?: string;
  difficultyLevelId?: string;
  helpMsg?: string;
}

export class ScenarioBasic implements IScenarioBasic {
  constructor(public id?: number, public name?: string, public slug?: string, public difficultyLevelId?: string, public helpMsg?: string) {}
}
