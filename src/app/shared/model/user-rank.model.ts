export interface IUserRank {
  activated: boolean;
  email: string;
  login: string;
  imageUrl: string;
  idUser: number;
  point?: number;
  description?: string;
  average?: number;
  totalSub?: number;
}

export class UserRank implements IUserRank {
  constructor(
    public activated: boolean,
    public email: string,
    public login: string,
    public imageUrl: string,
    public idUser: number,
    public point?: number,
    public description?: string,
    public average?: number,
    public totalSub?: number
  ) {}
}
