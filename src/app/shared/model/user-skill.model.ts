import { IUserBasic } from './basic-dto/user-basic.model';
import { ISkillBasic } from './basic-dto/skill-basic.model';

export interface IUserSkill {
  user?: IUserBasic;
  skill?: ISkillBasic;
  classification?: number;
  point: number;
  maxPoint?: number;
  nameSkill?: string;
  idSkill?: number;
  imageUrlSkill?: string;
  colorSkill?: string;
  slugSkill?: string;
}

export class UserSkill implements IUserSkill {
  constructor(
    public point: number,
    public user?: IUserBasic,
    public skill?: ISkillBasic,
    public classification?: number,
    public maxPoint?: number,
    public nameSkill?: string,
    public idSkill?: number,
    public imageUrlSkill?: string,
    public colorSkill?: string,
    public slugSkill?: string
  ) {}
}
