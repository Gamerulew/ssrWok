import {IDifficultyLevelBasic} from "./difficultyLevel-basic.model";
import {LanguageKey} from "../enumerations/language-key.model";


export interface IStatementBasic {
  id?: number;
  slug?: string;
  html?: any;
  language?: LanguageKey;
  difficultyLevel?: IDifficultyLevelBasic;
}

export class StatementBasic implements IStatementBasic {
  constructor(
    public id?: number,
    public slug?: string,
    public html?: any,
    public language?: LanguageKey,
    public difficultyLevel?: IDifficultyLevelBasic
  ) {
  }
}
