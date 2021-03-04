import { Moment } from 'moment';
import { ISubmissionBasic } from './basic-dto/submission-basic.model';

export interface ISubmissionFile {
  id?: number;
  name?: string;
  createdDate?: Moment;
  lastModifiedDate?: Moment;
  extension?: string;
  solutionFile?: string;
  submission?: ISubmissionBasic;
}

export class SubmissionFile implements ISubmissionFile {
  constructor(
    public id?: number,
    public name?: string,
    public createdDate?: Moment,
    public lastModifiedDate?: Moment,
    public extension?: string,
    public solutionFile?: string,
    public submission?: ISubmissionBasic
  ) {}
}
