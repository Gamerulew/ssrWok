import { Moment } from 'moment';

export interface IDifficultyLevel {
  id?: number;
  name?: string;
  exerciseCoefficient?: number;
  topicCoefficient?: number;
  createdDate?: Moment;
  lastModifiedDate?: Moment;
  descricaoOldEnunciado?: string;
  descricaoOldTeste?: string;
}

export class DifficultyLevel implements IDifficultyLevel {
  constructor(
    public id?: number,
    public name?: string,
    public exerciseCoefficient?: number,
    public topicCoefficient?: number,
    public createdDate?: Moment,
    public lastModifiedDate?: Moment,
    public descricaoOldEnunciado?: string,
    public descricaoOldTeste?: string
  ) {}
}
