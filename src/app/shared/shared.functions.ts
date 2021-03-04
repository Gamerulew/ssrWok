import {Injectable} from '@angular/core';
import {AccountService} from "../core/auth/account.service";
import {SERVER_API_IMAGE_URL} from "../app.constants";
import {Authority} from "./constants/authority.constants";

@Injectable()
export class SharedFunctions {
  // tslint:disable-next-line:variable-name
  private readonly _imageDir: string = '';

  constructor(public accountService: AccountService) {
    if (SERVER_API_IMAGE_URL) {
      this._imageDir = SERVER_API_IMAGE_URL?.toString();
    }
    /* todo: Mudar para buscar a URL dinamicamente do servidor
      console.warn(SERVER_API_URL + 'storage/files/baseUrl');
      this.http.get<string>(SERVER_API_URL + 'storage/files/baseUrl',  { observe: 'response'})
      .pipe(map((res: HttpResponse<string>) => this._imageDir = res.body!.toString()));
     */
  }

  get imageDir(): string {
    return this._imageDir;
  }

  getImageDir(): string {
    return this._imageDir;
  }

  public isAdmin(): boolean {
    return this.accountService.hasAnyAuthority(Authority.ADMIN);
  }

  public isTeacher(): boolean {
    return this.accountService.hasAnyAuthority(Authority.TEACHER);
  }

  public isUser(): boolean {
    return this.accountService.hasAnyAuthority(Authority.USER);
  }
}
