import { IUserBasic } from './basic-dto/user-basic.model';
import { ITopicBasic } from './basic-dto/topic-basic.model';

export interface IReportResults {
  maxGrade?: number;
  minScore?: number;
  point?: number;
  targetScore?: number;
  user?: IUserBasic;
  topic?: ITopicBasic;
  idModuleTopic?: number;
  numA?: number;
  numB?: number;
  numC?: number;
  numD?: number;
  numAresolved?: number;
  numBresolved?: number;
  numCresolved?: number;
  numDresolved?: number;
}

export class ReportResults implements IReportResults {
  constructor(
    public maxGrade?: number,
    public minScore?: number,
    public point?: number,
    public targetScore?: number,
    public user?: IUserBasic,
    public topic?: ITopicBasic,
    public idModuleTopic?: number,
    public numA?: number,
    public numB?: number,
    public numC?: number,
    public numD?: number,
    public numAresolved?: number,
    public numBresolved?: number,
    public numCresolved?: number,
    public numDresolved?: number
  ) {
  }
}
