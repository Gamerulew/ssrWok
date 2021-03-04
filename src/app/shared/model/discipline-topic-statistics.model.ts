export interface IDisciplineTopicStatistics {
  disId?: number;
  disImg?: string;
  disName?: string;
  disSlug?: string;
  disTopMaxGrade?: number;
  disTopMinScore?: number;
  disTopTargetScore?: number;
  exerciseCount?: number;
  exerciseImported?: number;
  exerciseLevelA?: number;
  exerciseLevelB?: number;
  exerciseLevelC?: number;
  exerciseLevelD?: number;
  exerciseLevelO?: number;
  topId?: number;
  topImg?: string;
  topLang?: string;
  topName?: string;
  topSlug?: string;
}

export class DisciplineTopicStatistics implements IDisciplineTopicStatistics {
  constructor(
    public disId?: number,
    public disImg?: string,
    public disName?: string,
    public disSlug?: string,
    public disTopMaxGrade?: number,
    public disTopMinScore?: number,
    public disTopTargetScore?: number,
    public exerciseCount?: number,
    public exerciseImported?: number,
    public exerciseLevelA?: number,
    public exerciseLevelB?: number,
    public exerciseLevelC?: number,
    public exerciseLevelD?: number,
    public exerciseLevelO?: number,
    public topId?: number,
    public topImg?: string,
    public topLang?: string,
    public topName?: string,
    public topSlug?: string
  ) {}
}
