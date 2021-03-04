import { Moment } from 'moment';

export interface IJudgehostRestriction {
  id?: number;
  name?: string;
  restricitions?: {
    problem: string[];
    language: string[];
    contest: string[];
  };
  createdDate?: Moment;
  lastModifiedDate?: Moment;
}

export class JudgehostRestriction implements IJudgehostRestriction {
  constructor(
    public id?: number,
    public name?: string,
    public restricitions?: {
      problem: string[];
      language: string[];
      contest: string[];
    },
    public createdDate?: Moment,
    public lastModifiedDate?: Moment
  ) {}
}
