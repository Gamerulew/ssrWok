import { IRunResult } from './run-result.model';
import { Moment } from 'moment';
import { IScenarioTestBasic } from './basic-dto/scenarioTest-basic.model';
import { IJudgingBasic } from './basic-dto/judging-basic.model';
import { IModuleTopicExerciseScenarioBasic } from './basic-dto/moduleTopicExerciseScenario-basic.model';

export interface IJudgingTests {
  id?: number;
  runtime?: number;
  runtimememory?: number;
  runresult?: IRunResult;
  runtimewall?: number;
  endtime?: Moment;
  createdDate?: Moment;
  lastModifiedDate?: Moment;
  outputRunContentType?: string;
  outputRun?: any;
  outputDiffContentType?: string;
  outputDiff?: any;
  outputErrorContentType?: string;
  outputError?: any;
  outputSystemContentType?: string;
  outputSystem?: any;
  judging?: IJudgingBasic;
  scenarioTest?: IScenarioTestBasic;
  moduleTopicExerciseScenario?: IModuleTopicExerciseScenarioBasic;
  // runresultId?: number;
}

export class JudgingTests implements IJudgingTests {
  constructor(
    public id?: number,
    public runtime?: number,
    public runresult?: IRunResult,
    public runtimememory?: number,
    public runtimewall?: number,
    public endtime?: Moment,
    public createdDate?: Moment,
    public lastModifiedDate?: Moment,
    public outputRunContentType?: string,
    public outputRun?: any,
    public outputDiffContentType?: string,
    public outputDiff?: any,
    public outputErrorContentType?: string,
    public outputError?: any,
    public outputSystemContentType?: string,
    public outputSystem?: any,
    public judging?: IJudgingBasic,
    public scenarioTest?: IScenarioTestBasic,
    public moduleTopicExerciseScenario?: IModuleTopicExerciseScenarioBasic // public runresultId?: number
  ) {}
}
