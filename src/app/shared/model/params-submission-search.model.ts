
export interface IParamsSubmissionSearch {
  moduleId?:number;
  topicId?:number;
  exerciseId?:number;
}

export class ParamsSubmissionSearch implements IParamsSubmissionSearch {
  constructor(
    public moduleId?:number,
    public topicId?:number,
    public exerciseId?:number
  ) {
  }
}
