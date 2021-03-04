import {AfterViewInit, Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';

import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {FormBuilder, Validators} from '@angular/forms';
import {AffiliationBasic, IAffiliationBasic} from "../model/basic-dto/affiliation-basic.model";
import {LoginModalService} from "../../core/login/login-modal.service";
import {RegisterService} from "../../account/register/register.service";
import {ToastrService} from "ngx-toastr";
import {LoginModalComponent} from "../login/login.component";
import {EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE} from "../constants/error.constants";
import {AffiliationService} from "../services/affiliation.service";


interface DialogData {
  prefix: string;
  courseId: number;
  passcode: string;
}

@Component({
  selector: 'wok-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements AfterViewInit {
  @ViewChild('login', {static: false})
  login?: ElementRef;

  doNotMatch = false;
  error = false;
  errorEmailExists = false;
  errorUserExists = false;
  success = false;

  hide = true;
  chide = true;
  affiliations?: IAffiliationBasic[];

  registerForm = this.fb.group({
    login: [
      '',
      [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$')
      ]
    ],
    email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    agreeTerms: ['', [Validators.required]],
    affiliation: ['', [Validators.required]]
  });

  constructor(
    private loginModalService: LoginModalService,
    private registerService: RegisterService,
    private affiliationService: AffiliationService,
    public dialogRef: MatDialogRef<RegisterComponent>,
    private fb: FormBuilder,
    private toastService: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog
  ) {
    this.hide = true;
    this.chide = true;
  }

  ngAfterViewInit(): void {
    if (this.login) {
      this.login.nativeElement.focus();
    }
    this.getAllAffiliation();
  }

  register(): void {
    this.doNotMatch = false;
    this.error = false;
    this.errorEmailExists = false;
    this.errorUserExists = false;

    const password = this.registerForm.get(['password']).value;
    if (password !== this.registerForm.get(['confirmPassword']).value) {
      this.doNotMatch = true;
    } else {
      const login = this.registerForm.get(['login']).value;
      const email = this.registerForm.get(['email']).value;
      const agreeTerms = this.registerForm.get(['agreeTerms']).value;
      const company = {...new AffiliationBasic(this.registerForm.get(['affiliation']).value)};
      this.registerService.save({
        login,
        email,
        password,
        agreeTerms,
        company,
        langKey: 'PT'
      }).subscribe(
        () => {
          this.success = true;
          this.toastService.success('Registered successfully');
          this.openLogin(this.data);
        },
        response => this.processError(response)
      );
    }
  }

  openLogin(data?: DialogData): void {
    this.onNoClick();
    this.dialog.open(LoginModalComponent, {
      width: '500px',
      data
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  private processError(response: HttpErrorResponse): void {
    if (response.status === 400 && response.error.type === LOGIN_ALREADY_USED_TYPE) {
      this.errorUserExists = true;
    } else if (response.status === 400 && response.error.type === EMAIL_ALREADY_USED_TYPE) {
      this.errorEmailExists = true;
    } else {
      this.error = true;
    }
  }

  getAllAffiliation(): void {
    const options = {
      size: 1000
    };
    this.affiliationService.getAllAffiliation(options).subscribe((res: HttpResponse<IAffiliationBasic[]>) => {
      this.affiliations = res.body || [];
    });
  }
}
