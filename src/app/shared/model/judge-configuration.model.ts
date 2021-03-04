import { Moment } from 'moment';

export interface IJudgeConfiguration {
  id?: number;
  name?: string;
  value?: string;
  type?: string;
  published?: boolean;
  category?: string;
  description?: string;
  createdDate?: Moment;
  lastModifiedDate?: Moment;
}

export class JudgeConfiguration implements IJudgeConfiguration {
  constructor(
    public id?: number,
    public name?: string,
    public value?: string,
    public type?: string,
    public published?: boolean,
    public category?: string,
    public description?: string,
    public createdDate?: Moment,
    public lastModifiedDate?: Moment
  ) {
    this.published = this.published || false;
  }
}
