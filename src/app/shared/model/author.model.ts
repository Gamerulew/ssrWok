import { Moment } from 'moment';
import { AuthorType } from './enumerations/author-type.model';
import { IAffiliationBasic } from './basic-dto/affiliation-basic.model';
import { IUserBasic } from './basic-dto/user-basic.model';

export interface IAuthor {
  id: number;
  name?: string;
  slug?: string;
  description?: string;
  authorType?: AuthorType;
  email?: string;
  linkedin?: string;
  lattes?: string;
  createdDate?: Moment;
  lastModifiedDate?: Moment;
  user?: IUserBasic;
  affiliation?: IAffiliationBasic;
}

export class Author implements IAuthor {
  constructor(
    public id: number,
    public name?: string,
    public slug?: string,
    public description?: string,
    public authorType?: AuthorType,
    public email?: string,
    public linkedin?: string,
    public lattes?: string,
    public createdDate?: Moment,
    public lastModifiedDate?: Moment,
    public user?: IUserBasic,
    public affiliation?: IAffiliationBasic
  ) {}
}
