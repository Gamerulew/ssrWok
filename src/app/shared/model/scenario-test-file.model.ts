import { Moment } from 'moment';

export interface IScenarioTestFile {
  id?: number;
  inFileMd5?: string;
  outFileMd5?: string;
  inFileContentType?: string;
  inFile?: any;
  outFileContentType?: string;
  outFile?: any;
  createdDate?: Moment;
  lastModifiedDate?: Moment;
  testId?: number;
}

export class ScenarioTestFile implements IScenarioTestFile {
  constructor(
    public id?: number,
    public inFileMd5?: string,
    public outFileMd5?: string,
    public inFileContentType?: string,
    public inFile?: any,
    public outFileContentType?: string,
    public outFile?: any,
    public createdDate?: Moment,
    public lastModifiedDate?: Moment,
    public testId?: number
  ) {}
}
