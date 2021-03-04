import { Moment } from 'moment';

export interface ILanguageBasic {
  id?: string;
  langid?: string;
  name?: string;
  extensions?: Array<string>;
  requireEntryPoint?: boolean;
  entryPointDescription?: string;
  allowSubmit?: boolean;
  allowJudge?: boolean;
  timeFactor?: number;
  filterCompilerFiles?: boolean;
  createdDate?: Moment;
  lastModifiedDate?: Moment;
  compileScriptId?: string;
}

export class LanguageBasic implements ILanguageBasic {
  constructor(
    public id?: string,
    public langid?: string,
    public name?: string,
    public extensions?: Array<string>,
    public requireEntryPoint?: boolean,
    public entryPointDescription?: string,
    public allowSubmit?: boolean,
    public allowJudge?: boolean,
    public timeFactor?: number,
    public filterCompilerFiles?: boolean,
    public createdDate?: Moment,
    public lastModifiedDate?: Moment,
    public compileScriptId?: string
  ) {
    this.requireEntryPoint = this.requireEntryPoint || false;
    this.allowSubmit = this.allowSubmit || false;
    this.allowJudge = this.allowJudge || false;
    this.filterCompilerFiles = this.filterCompilerFiles || false;
  }
}
