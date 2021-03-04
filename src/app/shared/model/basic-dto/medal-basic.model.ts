export interface IMedalBasic {
  id?: number;
  name?: string;
  description?: string;
  points?: number;
}

export class MedalBasic implements IMedalBasic {
  constructor(public id?: number, public name?: string, public description?: string, public points?: number) {}
}
