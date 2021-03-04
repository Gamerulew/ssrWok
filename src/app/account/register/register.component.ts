import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {FormBuilder, Validators} from '@angular/forms';


import {RegisterService} from './register.service';

import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {SessionStorageService} from 'ngx-webstorage';
import {AffiliationBasic, IAffiliationBasic} from "../../shared/model/basic-dto/affiliation-basic.model";
import {AffiliationService} from "../../shared/services/affiliation.service";
import {LoginModalService} from "../../core/login/login-modal.service";
import {AccountService} from "../../core/auth/account.service";
import {EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE} from "../../shared/constants/error.constants";

// import { AuthServiceService } from 'app/shared/auth/auth-service.service';

@Component({
  selector: 'wok-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  @ViewChild('login', {static: false})
  filteredAffiliations?: IAffiliationBasic[];
  selectedAffiliation?: IAffiliationBasic;
  strengthPassword = false;
  login?: ElementRef;
  affiliations?: IAffiliationBasic[];
  doNotMatch = false;
  error = false;
  errorEmailExists = false;
  errorUserExists = false;
  success = false;

  hide = true;
  chide = true;

  registerForm = this.fb.group({
    login: [
      '',
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.pattern(
          '^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'
        ),
      ],
    ],
    email: [
      '',
      [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(254),
        Validators.email,
      ],
    ],
    password: [
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(50)],
    ],
    confirmPassword: ['', [Validators.required]],
    affiliation: ['', [Validators.required]],
    agreeTerms: ['', [Validators.required]],
  });

  constructor(
    private affiliationService: AffiliationService,
    private loginModalService: LoginModalService,
    private registerService: RegisterService,
    private fb: FormBuilder,
    private router: Router,
    private sessionStorage: SessionStorageService,
    private accountService: AccountService,
    private toastService: ToastrService // public authService: AuthServiceService
  ) {
    this.hide = true;
    this.chide = true;
  }

  ngOnInit(): void {
    this.accountService.getTest();
    if (this.sessionStorage.retrieve('account')) {
      this.router.navigate(['/account/profile']);
    } else {
      this.getAllAffiliation();
      if (this.login) {
        this.login.nativeElement.focus();
      }
    }
    this.registerForm.get(['affiliation']).valueChanges.subscribe((value) => {
      if (value) {
        this.filteredAffiliations = this._filterAffiliations(value);
      } else {
        this.filteredAffiliations = this.affiliations;
      }
      this.selectAffiliation();
    });
  }

  private _filterAffiliations(value: string): IAffiliationBasic[] | undefined {
    const filterValue = value ? value?.toLowerCase() : '';
    if (this.affiliations) {
      return this.affiliations.filter(option => option?.name?.toLowerCase().indexOf(filterValue) === 0);
    } else {
      return undefined;
    }
  }

  register(): void {
    if (!this.registerForm.invalid) {
      this.doNotMatch = false;
      this.error = false;
      this.errorEmailExists = false;
      this.errorUserExists = false;
      if (!this.selectedAffiliation || (!this.getIdAffiliationByName() || this.getIdAffiliationByName() === -1)) {
        this.toastService.error('Universidade não encontrada');
        return;
      }
      if (!this.strengthPassword) {
        this.toastService.error('Senha muito fraca. Tente adicionar letras minúsculas e maiúsculas');
        return;
      }
      const password = this.registerForm.get(['password']).value;
      if (password !== this.registerForm.get(['confirmPassword']).value) {
        this.doNotMatch = true;
        this.toastService.error('Senhas não coincidem');
      } else {
        const login = this.registerForm.get(['login']).value;
        const email = this.registerForm.get(['email']).value;
        const agreeTerms = this.registerForm.get(['agreeTerms']).value;
        const company = {
          ...new AffiliationBasic(
            this.getIdAffiliationByName()
          ),
        };
        this.registerService
          .save({
            login,
            email,
            password,
            company,
            agreeTerms,
            langKey: 'PT',
          })
          .subscribe(
            () => {
              this.toastService.success('Registered successfully');
              this.success = true;
              this.router.navigate(['account/login'], {queryParams: {justSignedUp: 'true'}});
            },
            (response) => this.processError(response)
          );
      }
    }
  }

  openLogin(): void {
    this.loginModalService.open();
  }

  private processError(response: HttpErrorResponse): void {
    if (
      response.status === 400 &&
      response.error.type === LOGIN_ALREADY_USED_TYPE
    ) {
      this.errorUserExists = true;
    } else if (
      response.status === 400 &&
      response.error.type === EMAIL_ALREADY_USED_TYPE
    ) {
      this.errorEmailExists = true;
    } else {
      this.error = true;
    }
  }

  getAllAffiliation(): void {
    const options = {
      size: 1000,
    };
    this.affiliationService
      .getAllAffiliation(options)
      .subscribe((res: HttpResponse<IAffiliationBasic[]>) => {
        this.affiliations = res.body || [];
        this.filteredAffiliations = res.body || [];
      });
  }

  selectAffiliation(): void {
    if (this.filteredAffiliations && this.filteredAffiliations?.length === 1) {
      this.selectedAffiliation = this.filteredAffiliations[0];
    } else {
      this.selectedAffiliation = undefined;
    }
  }

  getIdAffiliationByName(): number {
    let id = -1;
    this.affiliations?.forEach(affiliation => {
      if (affiliation?.name === this.selectedAffiliation?.name) {
        id = affiliation?.id;
      }
    });
    return id;
  }
}
