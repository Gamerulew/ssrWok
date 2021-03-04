import {Injectable} from '@angular/core';
import {mergeMap} from 'rxjs/operators';


import {Login} from './login.model';
import {Router} from '@angular/router';
import {AccountService} from "../auth/account.service";
import {AuthServerProvider} from "../auth/auth-jwt.service";
import {Observable} from "rxjs";
import {Account} from "../user/account.model";

@Injectable({providedIn: 'root'})
export class LoginService {
  constructor(
    private accountService: AccountService,
    private authServerProvider: AuthServerProvider,
    private router: Router
  ) {
  }

  login(credentials: Login): Observable<Account | null> {
    return this.authServerProvider
      .login(credentials)
      .pipe(mergeMap(() => this.accountService.identity(true)));
  }

  logout(): void {
    this.authServerProvider.logout().subscribe({
      next: undefined,
      error: undefined,
      complete: () => {
        this.accountService.authenticate(null);
        this.router.navigate(['/home']);
      },
    });
  }
}
