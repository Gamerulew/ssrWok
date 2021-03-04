// ChartBarSkill
export interface IChartBarSkill {
  skills?: string[];
  seriesDifficultyLevel?: ISeriesDifficultyLevel[];
}

export class ChartBarSkill implements IChartBarSkill {
  constructor(public skills?: string[], public seriesDifficultyLevel?: ISeriesDifficultyLevel[]) {}
}
// SeriesSkill
export interface ISeriesDifficultyLevel {
  name?: string;
  data?: string[];
}

export class SeriesDifficultyLevel implements ISeriesDifficultyLevel {
  constructor(public name?: string, public data?: string[]) {}
}
