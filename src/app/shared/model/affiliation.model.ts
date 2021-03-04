import { Moment } from 'moment';

export interface IAffiliation {
  id: number;
  name?: string;
  slug?: string;
  description?: string;
  createdDate?: Moment;
  lastModifiedDate?: Moment;
  imageUrl?: string;
  country?: string;
}

export class Affiliation implements IAffiliation {
  constructor(
    public id: number,
    public name?: string,
    public slug?: string,
    public description?: string,
    public createdDate?: Moment,
    public lastModifiedDate?: Moment,
    public imageUrl?: string,
    public country?: string
  ) {}
}
