import { ISubmissionFileBasic } from './basic-dto/submission-file-basic.model';

export interface ISubmissionPost {
  entryPoint?:string;
  files?: ISubmissionFileBasic[];
  languageId?: string;
  userTeamId?: number;
}

export class SubmissionPost implements ISubmissionPost {
  constructor(
    public entryPoint?:string,
    public files?: ISubmissionFileBasic[],
    public languageId?: string,
    public userTeamId?: number
  ) {}
}
