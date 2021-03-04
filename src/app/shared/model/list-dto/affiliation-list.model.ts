export interface IAffiliationList {
  id: number;
  name?: string;
  country?: string;
}

export class Affiliation implements IAffiliationList {
  constructor(public id: number, public name?: string, public country?: string) {}
}
