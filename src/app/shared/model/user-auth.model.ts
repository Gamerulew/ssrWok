
export interface IUserAuth {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  myCustomData?: string;
}

export class UserAuth implements IUserAuth {
  constructor(
    public uid: string,
    public email: string,
    public photoURL?: string,
    public displayName?: string,
    public myCustomData?: string
  ) {}
}
