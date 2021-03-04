import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {ToastrService} from "ngx-toastr";
import {LoginService} from "../../core/login/login.service";
import {CourseService} from "../services/course.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Authority} from "../constants/authority.constants";
import {RegisterComponent} from "../register/register.component";
import {RegistrationService} from "../services/registration.service";

interface DialogData {
  prefix: string;
  courseId: number;
  passcode: string;
}

@Component({
  selector: 'wok-login-modal',
  templateUrl: './login.component.html'
})
export class LoginModalComponent implements OnInit {
  @ViewChild('username', {static: false})
  username?: ElementRef;
  hide = true;
  authenticationError = false;
  registrationError = false;
  loginForm = this.fb.group({
    username: [null, [Validators.required]],
    password: [null, [Validators.required]],
    rememberMe: [false]
  });

  constructor(
    private loginService: LoginService,
    private courseService: CourseService,
    private registrationService: RegistrationService,
    private toastService: ToastrService,
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<LoginModalComponent>
  ) {
  }

  ngOnInit(): void {
    if (this.username) {
      this.username.nativeElement.focus();
    }
  }

  cancel(): void {
    this.authenticationError = false;
    this.loginForm.patchValue({
      username: '',
      password: ''
    });
    this.onNoClick();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  login(): void {
    if (this.loginForm.valid) {
      this.loginService
        .login({
          username: this.loginForm.get('username').value,
          password: this.loginForm.get('password').value,
          rememberMe: this.loginForm.get('rememberMe').value
        })
        .subscribe(
          (res) => {
            this.authenticationError = false;
            // this.onNoClick()
            if (this.data) {
              if (res?.id) {
                this.registrationService.createPublicRegistration(this.data.passcode, res?.id).subscribe(() => {
                  this.toastService.success('Registered successfully');
                  this.router.navigate([this.data.prefix]);
                }, () => this.registrationError = true);
              }
            } else {
              if (
                this.router.url === '/account/register' ||
                this.router.url.startsWith('/account/activate') ||
                this.router.url.startsWith('/account/reset/')
              ) {
                this.router.navigate(['']);
              } else {
                if (res.authorities.includes(Authority.ADMIN)) {
                  this.router.navigate(['/admin/dashboard']);
                } else {
                  this.router.navigate(['/account/dashboard']);
                }
              }
            }
            this.onNoClick();
          },
          () => (this.authenticationError = true)
        );
    }
  }

  register(): void {
    this.onNoClick();
    this.router.navigate(['/account/register']);
  }

  openRegisterDialog(): void {
    this.onNoClick();
    this.dialog.open(RegisterComponent, {width: '500px'});
  }


  requestResetPassword(): void {
    this.onNoClick();
    this.router.navigate(['/account/reset', 'request']);
  }
}
