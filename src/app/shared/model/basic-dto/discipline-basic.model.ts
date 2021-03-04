import { DisciplineType } from '../enumerations/discipline-type.model';

export interface IDisciplineBasic {
  id?: number;
  name?: string;
  slug?: string;
  imageUrl?: string;
  shortDescription?: string;
  disciplineType?: DisciplineType;
}

export class DisciplineBasic implements IDisciplineBasic {
  constructor(
    public id?: number,
    public name?: string,
    public slug?: string,
    public imageUrl?: string,
    public shortDescription?: string,
    public disciplineType?: DisciplineType
  ) {}
}
