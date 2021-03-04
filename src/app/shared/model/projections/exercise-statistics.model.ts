export interface IExerciseStatistics {
  id?: number;
  name?: string;
  slug?: string;
  hasDescription?: boolean;
  fonteDir?: string;
  eventSlug?: string;
  countScenarios?: number;
  countTests?: number;
  countStatements?: number;
  countSubmissions?: number;
  countTopics?: number;
  countSoluctions?: number;
}

export class ExerciseStatistics {
  constructor(
    public id?: number,
    public name?: string,
    public slug?: string,
    public hasDescription?: boolean,
    public fonteDir?: string,
    public eventSlug?: string,
    public countScenarios?: number,
    public countTests?: number,
    public countStatements?: number,
    public countSubmissions?: number,
    public countTopics?: number,
    public countSoluctions?: number
  ) {}
}
