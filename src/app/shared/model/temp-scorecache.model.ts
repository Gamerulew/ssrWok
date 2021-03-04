export interface ITempScorecache {
  id?: number;
  cid?: number;
  teamid?: number;
  probid?: number;
  submissionsRestricted?: number;
  pendingRestricted?: number;
  solvetimeRestricted?: number;
  isCorrectRestricted?: boolean;
  submissionsPublic?: number;
  pendingPublic?: number;
  solvetimePublic?: number;
  isCorrectPublic?: boolean;
  isFirstToSolve?: boolean;
}

export class TempScorecache implements ITempScorecache {
  constructor(
    public id?: number,
    public cid?: number,
    public teamid?: number,
    public probid?: number,
    public submissionsRestricted?: number,
    public pendingRestricted?: number,
    public solvetimeRestricted?: number,
    public isCorrectRestricted?: boolean,
    public submissionsPublic?: number,
    public pendingPublic?: number,
    public solvetimePublic?: number,
    public isCorrectPublic?: boolean,
    public isFirstToSolve?: boolean
  ) {
    this.isCorrectRestricted = this.isCorrectRestricted || false;
    this.isCorrectPublic = this.isCorrectPublic || false;
    this.isFirstToSolve = this.isFirstToSolve || false;
  }
}
