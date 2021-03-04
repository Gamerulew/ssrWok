import { Moment } from 'moment';

export interface IExecutable {
  id?: number;
  name?: string;
  md5sum?: string;
  description?: string;
  type?: string;
  createdDate?: Moment;
  lastModifiedDate?: Moment;
  zipfile?: any;
  unzipedFiles?: Object;
}

export class Executable implements IExecutable {
  constructor(
    public id?: number,
    public name?: string,
    public md5sum?: string,
    public description?: string,
    public type?: string,
    public createdDate?: Moment,
    public lastModifiedDate?: Moment,
    public zipfile?: any,
    public unzipedFiles?: Object
  ) {}
}
