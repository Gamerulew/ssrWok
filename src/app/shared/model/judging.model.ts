import { IJudgingScenario } from './judgingScenario.model';
import { Moment } from 'moment';
import { IJudgehostBasic } from './basic-dto/judgehost-basic.mode';
import { IRejudgingBasic } from './basic-dto/rejudging-basic.model';
import { ISubmissionBasic } from './basic-dto/submission-basic.model';
import { IJudgeRunresults } from './judge-runresults.model';

export interface IJudging {
  id?: number;
  starttime?: Moment;
  endtime?: Moment;
  verified?: boolean;
  juryMember?: string;
  verifyComment?: string;
  valid?: boolean;
  seen?: boolean;
  createdDate?: Moment;
  lastModifiedDate?: Moment;
  outputCompileContentType?: string;
  outputCompile?: any;
  idJudginold?: number;
  submission?: ISubmissionBasic;
  result?: IJudgeRunresults;
  rejudging?: IRejudgingBasic;
  judgehost?: IJudgehostBasic;
  judgingScenarioTestDTO?: IJudgingScenario[];
}

export class Judging implements IJudging {
  constructor(
    public id?: number,
    public starttime?: Moment,
    public endtime?: Moment,
    public verified?: boolean,
    public juryMember?: string,
    public verifyComment?: string,
    public valid?: boolean,
    public seen?: boolean,
    public createdDate?: Moment,
    public lastModifiedDate?: Moment,
    public outputCompileContentType?: string,
    public outputCompile?: any,
    public idJudginold?: number,
    public submission?: ISubmissionBasic,
    public result?: IJudgeRunresults,
    public rejudging?: IRejudgingBasic,
    public judgehost?: IJudgehostBasic,
    public judgingScenarioTestDTO?: IJudgingScenario[]
  ) {
    this.verified = this.verified || false;
    this.valid = this.valid || false;
    this.seen = this.seen || false;
  }
}
