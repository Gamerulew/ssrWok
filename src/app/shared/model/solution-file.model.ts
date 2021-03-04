import { ILanguageBasic } from './basic-dto/language-basic.model';
import { ISolution } from './solution.model';

export interface ISolutionFile {
  id?: number;
  fileName?: string;
  fileMd5?: string | Int32Array;
  file?: string;
  language?: ILanguageBasic;
  solution?: ISolution;
}

export class SolutionFile implements ISolutionFile {
  constructor(
    public id?: number,
    public fileName?: string,
    public fileMd5?: string | Int32Array,
    public file?: string,
    public language?: ILanguageBasic,
    public solution?: ISolution
  ) {}
}
