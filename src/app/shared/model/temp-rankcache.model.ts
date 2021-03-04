export interface ITempRankcache {
  id?: number;
  cid?: number;
  teamid?: number;
  pointsRestricted?: number;
  totaltimeRestricted?: number;
  pointsPublic?: number;
  totaltimePublic?: number;
}

export class TempRankcache implements ITempRankcache {
  constructor(
    public id?: number,
    public cid?: number,
    public teamid?: number,
    public pointsRestricted?: number,
    public totaltimeRestricted?: number,
    public pointsPublic?: number,
    public totaltimePublic?: number
  ) {}
}
