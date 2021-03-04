import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {SessionStorageService} from 'ngx-webstorage';
import {Observable, of, ReplaySubject} from 'rxjs';
import {catchError, shareReplay, tap} from 'rxjs/operators';
import {StateStorageService} from "./state-storage.service";
import {SERVER_API_URL} from "../../app.constants";
import {IUserStorage} from "../../shared/model/userStorage.model";
import {Authority} from "../../shared/constants/authority.constants";
import {Account} from "../user/account.model";


// const REFRESH_INTERVAL = 10000;

@Injectable({providedIn: 'root'})
export class AccountService {
  private userIdentity: any | null = null;
  private authenticationState = new ReplaySubject<Account | null>(1);
  private accountCache$?: Observable<Account | null>;
  public teste: number;

  constructor(
    private sessionStorage: SessionStorageService,
    private http: HttpClient,
    private stateStorageService: StateStorageService,
    private router: Router
  ) {
    this.teste = Math.random();
  }

  getTest(): void {
    console.warn(this.teste);
  }

  save(account: Account): Observable<{}> {
    return this.http.post(SERVER_API_URL + 'api/account', account);
  }

  authenticate(identity: Account | null): void {
    this.sessionStorage.store('account', identity); // Salva Dados na sessão
    this.userIdentity = identity; // atribui para a variável na variável interna
    this.authenticationState.next(this.userIdentity);
  }

  hasAnyAuthority(authorities: string[] | string): boolean {
    const storageUser: IUserStorage = this.sessionStorage.retrieve('account');
    if (
      (!this.userIdentity || !this.userIdentity.authorities) &&
      !storageUser?.authorities
    ) {
      return false;
    }
    if (!Array.isArray(authorities)) {
      authorities = [authorities];
    }
    if (storageUser?.authorities) {
      if (!Array.isArray(storageUser?.authorities)) {
        storageUser.authorities = [storageUser?.authorities];
      }
      return storageUser?.authorities.some((authority: string) =>
        authorities.includes(authority)
      );
    }
    if (
      this.userIdentity &&
      this.userIdentity.authorities &&
      !storageUser?.authorities
    ) {
      return this.userIdentity.authorities.some((authority: string) =>
        authorities.includes(authority)
      );
    } else {
      return false;
    }
  }

  identity(force?: boolean): Observable<Account | null> {
    if (!this.accountCache$ || force || !this.isAuthenticated()) {

      this.accountCache$ = this.fetch()?.pipe(
        catchError(() => {
          return of(null);
        }),
        tap((account: any | null) => {
          this.authenticate(account);
          // After retrieve the account info, the language will be changed to
          // the user-team's preferred language configured in the account setting
          if (account && account.langKey) {
            const langKey =
              this.sessionStorage.retrieve('locale') || account.langKey;
          }

          if (account) {
            this.navigateToStoredUrl();
          }
        }),
        shareReplay(1)
      );
    }
    return this.accountCache$;
  }

  isAuthenticated(): boolean {
    if (this.userIdentity === null) {
      this.userIdentity = this.sessionStorage.retrieve('account');
    }
    return this.userIdentity !== null;
  }

  getAuthenticationState(): Observable<Account | null> {
    return this.authenticationState.asObservable();
  }

  getImageUrl(): string {
    return this.userIdentity ? this.userIdentity.imageUrl : '';
  }

  getLogin(): string {
    return this.userIdentity ? this.userIdentity.login : '';
  }

  getEmail(): string {
    return this.userIdentity ? this.userIdentity.email : '';
  }

  getId(): number {
    return this.userIdentity as number ? this.userIdentity.id : 0;
  }

  getFirstName(): string {
    return this.userIdentity ? this.userIdentity.firstName : '';
  }

  public isAdmin(): boolean {
    return this.hasAnyAuthority(Authority.ADMIN);
  }

  public isTeacher(): boolean {
    return this.hasAnyAuthority(Authority.TEACHER);
  }

  public isUser(): boolean {
    return this.hasAnyAuthority(Authority.USER);
  }

  private fetch(): Observable<Account> {
    return this.http.get<Account>(SERVER_API_URL + 'api/account');
  }

  private navigateToStoredUrl(): void {
    // previousState can be set in the authExpiredInterceptor and in the userRouteAccessService
    // if login is successful, go to stored previousState and clear previousState
    const previousUrl = this.stateStorageService.getUrl();
    if (previousUrl) {
      this.stateStorageService.clearUrl();
      this.router.navigateByUrl(previousUrl);
    }
  }
}
