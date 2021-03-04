export interface IDisciplineStatistics {
  disciplineId?: number;
  disciplineName?: number;
  disciplineSlug?: number;
  exerciseCount?: number;
  exerciseImported?: number;
  exerciseLevelA?: number;
  exerciseLevelB?: number;
  exerciseLevelC?: number;
  exerciseLevelD?: number;
  exerciseLevelO?: number;
  topicCount?: number;
}

export class DisciplineStatistics {
  constructor(
    public disciplineId?: number,
    public disciplineName?: number,
    public disciplineSlug?: number,
    public exerciseCount?: number,
    public exerciseImported?: number,
    public exerciseLevelA?: number,
    public exerciseLevelB?: number,
    public exerciseLevelC?: number,
    public exerciseLevelD?: number,
    public exerciseLevelO?: number,
    public topicCount?: number
  ) {}
}
