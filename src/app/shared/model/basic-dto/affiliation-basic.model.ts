export interface IAffiliationBasic {
  id: number;
  name?: string;
  slug?: string;
  description?: string;
  country?: string;
  imageUrl?: string;
}

export class AffiliationBasic implements IAffiliationBasic {
  constructor(
    public id: number,
    public name?: string,
    public slug?: string,
    public description?: string,
    public imageUrl?: string,
    public country?: string
  ) {}
}
