import { Moment } from 'moment';
import { IUserTeam } from '../user-team.model';
import { IAffiliationBasic } from './affiliation-basic.model';

export interface IUsersAuthoritiesBasic {
  id?: number;
  login?: string;
  email?: string;
  activated?: boolean;
  agreeTerms?: boolean;
  imageUrl?: string;
  langKey?: string;
  teams?: IUserTeam[];
  authorities?: string[];
  company?: IAffiliationBasic;
  createdDate?: Moment;
  lastAccess?: Moment;
}

export class UsersAuthoritiesBasic implements IUsersAuthoritiesBasic {
  constructor(
    public id?: number,
    public login?: string,
    public email?: string,
    public activated?: boolean,
    public agreeTerms?: boolean,
    public imageUrl?: string,
    public langKey?: string,
    public teams?: IUserTeam[],
    public authorities?: string[],
    public  company?: IAffiliationBasic,
    public createdDate?: Moment,
    public lastAccess?: Moment
  ) {
  }
}
