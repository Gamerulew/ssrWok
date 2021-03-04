import { Moment } from 'moment';
import { DisciplineType } from './enumerations/discipline-type.model';

export interface IDiscipline {
  id?: number;
  name?: string;
  slug?: string;
  description?: string;
  shortDescription?: string;
  itemorder?: number;
  imageUrl?: string;
  disciplineType?: DisciplineType;
  createdDate?: Moment;
  lastModifiedDate?: Moment;
}

export class Discipline implements IDiscipline {
  constructor(
    public id?: number,
    public name?: string,
    public slug?: string,
    public shortDescription?: string,
    public description?: string,
    public itemorder?: number,
    public imageUrl?: string,
    public disciplineType?: DisciplineType,
    public createdDate?: Moment,
    public lastModifiedDate?: Moment
  ) {}
}
