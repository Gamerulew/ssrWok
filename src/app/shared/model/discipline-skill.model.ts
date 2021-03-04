import { IDifficultyLevelBasic } from './basic-dto/difficultyLevel-basic.model';
import { ISkillBasic } from './basic-dto/skill-basic.model';

export interface IDisciplineSkill {
  points?: number;
  difficultyLevelId?: string;
  skill?: ISkillBasic;
}

export class DisciplineSkill {
  constructor(public points?: number, public difficultyLevelId?: string, public skill?: ISkillBasic) {}
}
