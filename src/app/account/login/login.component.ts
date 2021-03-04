import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser} from 'angularx-social-login';
import {SessionStorageService} from 'ngx-webstorage';
import {LoginService} from "../../core/login/login.service";
import {AccountService} from "../../core/auth/account.service";
import {Account} from "../../core/user/account.model";
import {Authority} from "../../shared/constants/authority.constants";
import {SERVER_API_URL} from "../../app.constants";

@Component({
  selector: 'wok-login',
  templateUrl: './login.component.html',
  styleUrls: ['login.scss'],
})
export class LoginPageComponent implements OnInit {
  @ViewChild('login1', {static: false})
  username?: ElementRef;
  hide = true;
  user: SocialUser;
  justSignedUp = false;
  loginForm = this.fb.group({
    username: [null, [Validators.required]],
    password: [null, [Validators.required]],
    rememberMe: [false],
  });

  constructor(
    private loginService: LoginService,
    private accountService: AccountService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: SocialAuthService,
    private sessionStorage: SessionStorageService,
    private fb: FormBuilder // private eventManager: JhiEventManager, // public authService: AuthServiceService
  ) {
  }

  cancel(): void {
    this.loginForm.patchValue({
      username: '',
      password: '',
    });
  }

  login(e: any): void {
    e.preventDefault();
    if (!this.loginForm.invalid) {
      this.loginService
        .login({
          username: this.loginForm.get('username').value,
          password: this.loginForm.get('password').value,
          rememberMe: this.loginForm.get('rememberMe').value,
        })
        .subscribe({
          next: () => {
            // this.activeModal.close();

            // this.eventManager.broadcast({
            //   name: 'authenticationSuccess',
            //   content: 'Sending Authentication Success'
            // });

            if (
              this.router.url === '/account/register' ||
              this.router.url.startsWith('/account/activate') ||
              this.router.url.startsWith('/account/reset/')
            ) {
              this.router.navigate(['']);
            } else {
              this.accountService.identity().subscribe((account: Account) => {
                if (account.authorities.includes(Authority.ADMIN)) {
                  this.router.navigate(['/admin/dashboard']);
                } else {
                  this.router.navigate(['/account/dashboard']);
                }
              });
            }
          },
          error: undefined,
        });
    }
  }

  register(): void {
    // this.activeModal.dismiss('to state register');
    this.router.navigate(['/account/register']);
  }

  requestResetPassword(): void {
    // this.activeModal.dismiss('to state requestReset');
    this.router.navigate(['/account/reset', 'request']);
  }

  async signInWithGoogle(): Promise<void> {
    console.warn(
      await this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
    );
  }

  async signInWithFB(): Promise<void> {
    console.warn(this.user);
    try {
      await this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    } catch (e) {
      console.warn('Falha ao fazer login');
    }

    // console.warn(await this.authService.signIn(FacebookLoginProvider.PROVIDER_ID));
  }

  async signOut(): Promise<void> {
    await this.authService.signOut();
    console.warn(this.user);
  }

  ngOnInit(): void {
    console.warn(SERVER_API_URL);
    this.accountService.getTest();
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.justSignedUp = params.get('justSignedUp') === 'true';
    });
    if (this.sessionStorage.retrieve('account')) {
      this.router.navigate(['/account/profile']);
    }
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.warn(this.user);
    });
  }
}
