import { Moment } from 'moment';
import { IScenarioBasic } from './basic-dto/scenario-basic.model';
import { IExerciseBasic } from './basic-dto/exercise-basic.model';
import { IScenarioTestFile } from './scenario-test-file.model';

export interface IScenarioTest {
  id?: number;
  name?: string;
  visible?: boolean;
  itemorder?: number;
  activated?: boolean;
  createdDate?: Moment;
  lastModifiedDate?: Moment;
  testScenario?: IScenarioBasic;
  exercise?: IExerciseBasic;
  testFile?:IScenarioTestFile;
}

export class ScenarioTest implements IScenarioTest {
  constructor(
    public id?: number,
    public name?: string,
    public visible?: boolean,
    public itemorder?: number,
    public activated?: boolean,
    public createdDate?: Moment,
    public lastModifiedDate?: Moment,
    public testScenario?: IScenarioBasic,
    public exercise?: IExerciseBasic,
    public testFile?:IScenarioTestFile
  ) {
    this.visible = this.visible || false;
    this.activated = this.activated || false;
  }
}
