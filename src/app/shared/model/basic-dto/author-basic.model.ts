import { AuthorType } from '../enumerations/author-type.model';
import { IAffiliationBasic } from './affiliation-basic.model';
import { IUserBasic } from './user-basic.model';

export interface IAuthorBasic {
  id: number;
  name?: string;
  slug?: string;
  description?: string;
  authorType?: AuthorType;
  email?: string;
  user?: IUserBasic;
  affiliation?: IAffiliationBasic;
}

export class AuthorBasic implements IAuthorBasic {
  constructor(
    public id: number,
    public name?: string,
    public slug?: string,
    public description?: string,
    public authorType?: AuthorType,
    public email?: string,
    public user?: IUserBasic,
    public affiliation?: IAffiliationBasic
  ) {}
}
