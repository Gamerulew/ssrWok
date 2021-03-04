import { IUserBasic } from './basic-dto/user-basic.model';
import { ILanguageBasic } from './basic-dto/language-basic.model';

export interface IUserLanguage {
  id?: number;
  itemorder?: boolean;
  cacheProblemsCorrect?: number;
  cacheProblemsSubmited?: number;
  user?: IUserBasic;
  language?: ILanguageBasic;
}

export class UserLanguage implements IUserLanguage {
  constructor(
    public id?: number,
    public itemorder?: boolean,
    public cacheProblemsCorrect?: number,
    public cacheProblemsSubmited?: number,
    public user?: IUserBasic,
    public language?: ILanguageBasic
  ) {
    this.itemorder = this.itemorder || false;
  }
}
