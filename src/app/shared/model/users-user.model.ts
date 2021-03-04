import { Moment } from 'moment';
import { IUserTeam } from './user-team.model';
import { IProfile } from './profile.model';
import { IAffiliationBasic } from './basic-dto/affiliation-basic.model';

export interface IUsersUser {
  id?: number;
  firstName?: string;
  lastName?: string;
  login?: string;
  email?: string;
  emailVerifiedAt?: Moment;
  passwordHash?: string;
  lastAccess?: Moment;
  firstAccess?: Moment;
  activated?: boolean;
  agreeTerms?: boolean;
  imageUrl?: string;
  rememberToken?: string;
  langKey?: string;
  activationKey?: string;
  resetKey?: string;
  resetDate?: Moment;
  lastIpAddress?: string;
  createdBy?: string;
  createdDate?: Moment;
  lastModifiedBy?: string;
  lastModifiedDate?: Moment;
  importado?: string;
  idusermaratona?: number;
  idteammaratona?: number;
  company?: IAffiliationBasic;
  authorities?: string[];
  teamList?: IUserTeam[];
  profile?: IProfile;
}

export class UsersUser implements IUsersUser {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public login?: string,
    public email?: string,
    public emailVerifiedAt?: Moment,
    public passwordHash?: string,
    public lastAccess?: Moment,
    public firstAccess?: Moment,
    public activated?: boolean,
    public agreeTerms?: boolean,
    public imageUrl?: string,
    public rememberToken?: string,
    public langKey?: string,
    public activationKey?: string,
    public resetKey?: string,
    public resetDate?: Moment,
    public lastIpAddress?: string,
    public createdBy?: string,
    public createdDate?: Moment,
    public lastModifiedBy?: string,
    public lastModifiedDate?: Moment,
    public importado?: string,
    public idusermaratona?: number,
    public idteammaratona?: number,
    public company?: IAffiliationBasic,
    public authorities?: string[],
    public teams?: IUserTeam[],
    public profile?: IProfile
  ) {
    this.activated = this.activated || false;
    this.agreeTerms = this.agreeTerms || false;
  }

}
