import { Moment } from 'moment';

export interface ILanguage {
  id?: number;
  langid?: string;
  name?: string;
  extensions?: string;
  requireEntryPoint?: boolean;
  entryPointDescription?: string;
  allowSubmit?: boolean;
  allowJudge?: boolean;
  timeFactor?: number;
  filterCompilerFiles?: boolean;
  createdDate?: Moment;
  lastModifiedDate?: Moment;
  compileScriptId?: number;
}

export class Language implements ILanguage {
  constructor(
    public id?: number,
    public langid?: string,
    public name?: string,
    public extensions?: string,
    public requireEntryPoint?: boolean,
    public entryPointDescription?: string,
    public allowSubmit?: boolean,
    public allowJudge?: boolean,
    public timeFactor?: number,
    public filterCompilerFiles?: boolean,
    public createdDate?: Moment,
    public lastModifiedDate?: Moment,
    public compileScriptId?: number
  ) {
    this.requireEntryPoint = this.requireEntryPoint || false;
    this.allowSubmit = this.allowSubmit || false;
    this.allowJudge = this.allowJudge || false;
    this.filterCompilerFiles = this.filterCompilerFiles || false;
  }
}
