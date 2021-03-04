export interface IUsersUserBasic {
  id?: number;
  login?: string;
  email?: string;
  activated?:boolean;
  imageUrl?:string;
}

export class UsersUserBasic implements IUsersUserBasic {
  constructor(
    public id?: number,
    public login?: string,
    public email?: string,
    public activated?:boolean,
    public imageUrl?:string
  ) {}
}
