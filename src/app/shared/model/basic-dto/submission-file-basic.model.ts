export interface ISubmissionFileBasic {
  id?: number;
  name?: string;
  extension?: string;
  solutionFile?: string;
}

export class SubmissionFileBasic implements ISubmissionFileBasic {
  constructor(
    public id?: number,
    public name?: string,
    public extension?: string,
    public solutionFile?: string,
  ) {}
}
