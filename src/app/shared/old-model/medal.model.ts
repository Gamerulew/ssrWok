import { Moment } from 'moment';

export interface IMedal {
  id?: number;
  name?: string;
  description?: string;
  points?: number;
  imageUrlContentType?: string;
  imageUrl?: any;
  createdDate?: Moment;
  lastModifiedDate?: Moment;
}

export class Medal implements IMedal {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public points?: number,
    public imageUrlContentType?: string,
    public imageUrl?: any,
    public createdDate?: Moment,
    public lastModifiedDate?: Moment
  ) {}
}
