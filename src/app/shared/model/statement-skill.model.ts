import { IStatementBasic } from './basic-dto/statement-basic.model';
import { ISkillBasic } from './basic-dto/skill-basic.model';

export interface IStatementSkill {
  id?: number;
  points?: number;
  statement?: IStatementBasic;
  skill?: ISkillBasic;
}

export class StatementSkill implements IStatementSkill {
  constructor(public id?: number, public points?: number, public statement?: IStatementBasic, public skill?: ISkillBasic) {}
}
