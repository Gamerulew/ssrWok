export interface ISkillBasic {
  id?: number;
  name?: string;
  slug?: string;
  description?: string;
  color?:string;
}

export class SkillBasic implements ISkillBasic {
  constructor(
    public id?: number,
    public name?: string,
    public slug?: string,
    public description?: string,
    public color?:string,
    public imageUrl?:string
  ) {}
}
