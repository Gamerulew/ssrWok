import { AuthorType } from './enumerations/author-type.model';
import { IAffiliationBasic } from './basic-dto/affiliation-basic.model';
import { IUserBasic } from './basic-dto/user-basic.model';

export interface IAuthorList {
  id: number;
  name?: string;
  slug?: string;
  authorType?: AuthorType;
}

export class AuthorList implements IAuthorList {
  constructor(public id: number, public name?: string, public slug?: string, public authorType?: AuthorType) {}
}
