import {Moment} from 'moment';
import {IAffiliationBasic} from './basic-dto/affiliation-basic.model';
import {IUserBasic} from './basic-dto/user-basic.model';
import {CourseType} from './enumerations/course-type.model';
import {IModule} from './module.model';

export interface ICourse {
  id?: number;
  name?: string;
  description?: string;
  passcode?: string;
  courseType?: CourseType;
  activated?: boolean;
  createdDate?: Moment;
  startDate?: Moment;
  endDate?: Moment;
  lastModifiedDate?: Moment;
  modules?: IModule[];
  affiliation?: IAffiliationBasic;
  teacher?: IUserBasic;
  slug?: string;
}

export class Course implements ICourse {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public passcode?: string,
    public courseType?: CourseType,
    public activated?: boolean,
    public createdDate?: Moment,
    public lastModifiedDate?: Moment,
    public modules?: IModule[],
    public affiliation?: IAffiliationBasic,
    public teacher?: IUserBasic,
    public slug?: string,
    public startDate?: Moment,
    public endDate?: Moment
  ) {
    this.activated = this.activated || false;
  }
}
