import { Moment } from 'moment';
import { IJudgingBasic } from './basic-dto/judging-basic.model';

export interface IInternalError {
  id?: number;
  description?: string;
  judgehostlog?: string;
  time?: number;
  disabled?: string;
  status?: string;
  createdDate?: Moment;
  lastModifiedDate?: Moment;
  judging?: IJudgingBasic;
}

export class InternalError implements IInternalError {
  constructor(
    public id?: number,
    public description?: string,
    public judgehostlog?: string,
    public time?: number,
    public disabled?: string,
    public status?: string,
    public createdDate?: Moment,
    public lastModifiedDate?: Moment,
    public judging?: IJudgingBasic
  ) {}
}
