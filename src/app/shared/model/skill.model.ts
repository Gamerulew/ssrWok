import { Moment } from 'moment';

export interface ISkill {
  id?: number;
  name?: string;
  slug?: string;
  description?: string;
  thematic?: boolean;
  computacional?: boolean;
  structure?: boolean;
  createdDate?: Moment;
  lastModifiedDate?: Moment;
  skillIdRoot?: number;
  skillType?: string;
  imageUrl?: string;
  color?: string;
}

export class Skill implements ISkill {
  constructor(
    public id?: number,
    public name?: string,
    public slug?: string,
    public description?: string,
    public thematic?: boolean,
    public computacional?: boolean,
    public structure?: boolean,
    public createdDate?: Moment,
    public lastModifiedDate?: Moment,
    public skillIdRoot?: number,
    public skillType?: string,
    public imageUrl?: string,
    public color?: string
  ) {
    this.thematic = this.thematic || false;
    this.computacional = this.computacional || false;
    this.structure = this.structure || false;
  }
}
