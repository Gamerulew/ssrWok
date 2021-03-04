export interface ISolutionBasic {
  id?: number;
  name?: string;
  slug?: string;
}

export class SolutionBasic implements ISolutionBasic {
  constructor(
    public id?: number,
    public name?: string,
    public slug?: string,
  ) {}
}
