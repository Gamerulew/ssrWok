import { Moment } from 'moment';
import { GenderType } from './enumerations/gender-type.model';
import { IUserBasic } from './basic-dto/user-basic.model';

export interface IProfile {
  id?: number;
  aboutMe?: string;
  education?: string;
  experience?: string;
  country?: string;
  gender?: GenderType;
  birthday?: Moment;
  city?: string;
  uf?: string;
  publicProfile?: boolean;
  publicRank?: boolean;
  instagram?: string;
  lattes?: string;
  mobileNumber?: string;
  facebook?: string;
  hackerrank?: string;
  uri?: string;
  linkedin?: string;
  user?: IUserBasic;
}

export class Profile implements IProfile {
  constructor(
    public id?: number,
    public aboutMe?: string,
    public education?: string,
    public experience?: string,
    public country?: string,
    public gender?: GenderType,
    public birthday?: Moment,
    public city?: string,
    public uf?: string,
    public publicProfile?: boolean,
    public publicRank?: boolean,
    public instagram?: string,
    public mobileNumber?: string,
    public lattes?: string,
    public facebook?: string,
    public hackerrank?: string,
    public uri?: string,
    public linkedin?: string,
    public user?: IUserBasic
  ) {
    this.publicProfile = this.publicProfile || false;
    this.publicRank = this.publicRank || false;
  }
}
