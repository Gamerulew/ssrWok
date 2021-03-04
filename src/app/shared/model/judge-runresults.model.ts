import { Moment } from 'moment';

export interface IJudgeRunresults {
  id?: number;
  nome?: string;
  descricao?: string;
  createdDate?: Moment;
  lastModifiedDate?: Moment;
}

export class JudgeRunresults implements IJudgeRunresults {
  constructor(
    public id?: number,
    public nome?: string,
    public descricao?: string,
    public createdDate?: Moment,
    public lastModifiedDate?: Moment
  ) {}
}
