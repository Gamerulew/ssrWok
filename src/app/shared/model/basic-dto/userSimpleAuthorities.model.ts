export interface IUserSimpleAuthorities {
  id?: number;
  authorities?: string[];
  activated?: boolean;
}

export class UserSimpleAuthorities implements IUserSimpleAuthorities {
  constructor(
    public id?: number,
    public authorities?: string[],
    public activated?: boolean
  ) {
  }
}
