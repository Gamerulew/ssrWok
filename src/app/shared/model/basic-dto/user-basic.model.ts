export interface IUserBasic {
  id?: number;
  login?: string;
  email?: string;
  imageUrl?: string;
  activated?: boolean;
}

export class UserBasic implements IUserBasic {
  constructor(
    public id?: number,
    public login?: string,
    public email?: string,
    public imageUrl?: string,
    public activated?: boolean) {
  }
}
