import { Moment } from 'moment';
export interface IRunResult {
  createdDate?: Moment;
  description?: string;
  minLength?: number;
  maxLength?: number;
  id?: string;
  lastModifiedDate?: Moment;
  name?: string;
}
export class RunResult implements IRunResult {
  constructor(
    public createdDate?: Moment,
    public description?: string,
    public minLength?: number,
    public id?: string,
    public lastModifiedDate?: Moment,
    public name?: string
  ) {
  }
}
