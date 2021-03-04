import { Moment } from 'moment';
import { IAuthorBasic } from './basic-dto/author-basic.model';
import { IExerciseBasic } from './basic-dto/exercise-basic.model';

export interface ITopic {
  id?: number;
  name?: string;
  slug?: string;
  description?: string;
  imageUrl?: string;
  html?: any;
  langKey?: string;
  eventUrl?: string;
  eventYear?: number;
  eventFase?: number;
  createdDate?: Moment;
  lastModifiedDate?: Moment;
  pai?: IExerciseBasic;
  author?: IAuthorBasic;
}

export class Topic implements ITopic {
  constructor(
    public id?: number,
    public name?: string,
    public slug?: string,
    public description?: string,
    public imageUrl?: string,
    public html?: any,
    public langKey?: string,
    public eventUrl?: string,
    public eventYear?: number,
    public eventFase?: number,
    public createdDate?: Moment,
    public lastModifiedDate?: Moment,
    public pai?: IExerciseBasic,
    public author?: IAuthorBasic
  ) {}
}
