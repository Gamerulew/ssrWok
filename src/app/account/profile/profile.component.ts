import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {ProfileService} from './profile.service';
import {HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import * as moment from 'moment';
import {IUserSkill} from "../../shared/model/user-skill.model";
import {LANGUAGES} from "../../core/language/language.constants";
import {IUsersUser, UsersUser} from "../../shared/model/users-user.model";
import {ICountry} from "./countries";
import {IUserScore} from "../../shared/userScores.model";
import {PasswordService} from "../password/password.service";
import {AccountService} from "../../core/auth/account.service";
import {SharedFunctions} from "../../shared/shared.functions";
import {UsersUserService} from "../../shared/services/users-user.service";
import {ToastrService} from "ngx-toastr";
import {WindowRef} from "../../shared/windowRef.service";
import {isPlatformBrowser} from "@angular/common";
import {IProfile, Profile} from "../../shared/model/profile.model";
import {DATE_FORMAT, DATE_TIME_FORMAT} from "../../shared/constants/input.constants";
import {Account} from "../../core/user/account.model";


@Component({
  selector: 'wok-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  account!: Account;
  // profile!: Profile;
  userSkills?: IUserSkill[][];
  userSkillsArray?: IUserSkill[];
  userBetterSkills?: IUserSkill[];
  isSaving = false;
  doNotMatch = false;
  error = false;
  successPasswordChange = false;
  successAccountSettings = false;
  birthdayDp: any;
  debug: any;
  saved = false;
  languages = LANGUAGES;
  userPic: File | null = null;
  user?: IUsersUser;
  countries?: ICountry[] = [];
  login?: string;
  userScores?: IUserScore;
  editForm = this.fb.group({
    aboutMe: [null, [Validators.maxLength(255)]],
    education: [null, [Validators.maxLength(255)]],
    experience: [null, [Validators.maxLength(255)]],
    country: [null, [Validators.required, Validators.maxLength(3)]],
    gender: [null, [Validators.required]],
    birthday: [null, [Validators.required]],
    city: [null, [Validators.required, Validators.maxLength(64)]],
    uf: [null, [Validators.required, Validators.maxLength(3)]],
    publicProfile: [null, [Validators.required]],
    publicRank: [null, [Validators.required]],
    instagram: [null, [Validators.maxLength(32)]],
    lattes: [null, [Validators.maxLength(64)]],
    facebook: [null, [Validators.maxLength(32)]],
    hackerrank: [null, [Validators.maxLength(32)]],
    mobileNumber: [
      null,
      [Validators.required, Validators.minLength(18), Validators.maxLength(20)],
    ],
    uri: [null, [Validators.maxLength(32)]],
    linkedin: [null, [Validators.maxLength(32)]],
  });

  passwordForm = this.fb.group({
    currentPassword: ['', [Validators.required]],
    newPassword: [
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(50)],
    ],
    confirmPassword: [
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(50)],
    ],
  });

  settingsForm = this.fb.group({
    firstName: [
      undefined,
      [Validators.required, Validators.minLength(1), Validators.maxLength(50)],
    ],
    lastName: [
      undefined,
      [Validators.required, Validators.minLength(1), Validators.maxLength(50)],
    ],
    email: [
      undefined,
      [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(254),
        Validators.email,
      ],
    ],
    langKey: [undefined],
  });

  photoUploadForm = this.fb.group({
    photoUpload: [null, [Validators.required]],
  });
  isBrowser = false;
  constructor(
    private profileService: ProfileService,
    protected router: Router,
    private fb: FormBuilder,
    private passwordService: PasswordService,
    private accountService: AccountService,
    public sharedFunctions: SharedFunctions,
    protected userService: UsersUserService,
    // private locationStrategy: LocationStrategy,
    private toastService: ToastrService,
    protected activatedRoute: ActivatedRoute,
    private windowRef: WindowRef,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      if (params.login) {
        this.login = params.login;
        this.getProfileByLogin();
        this.getUserSkillsByLogin();
      } else {
        this.countries = this.countries.sort();
        this.getAccount();
        // this.getProfile();
        this.getAccountScores();
        this.getUser();
        this.getUserSkills();
      }
    });
  }

  getProfileByLogin(): void {
    if (this.login) {
      this.userService.getProfileByLogin(this.login).subscribe({
        next: (res: IProfile) => {
          this.user = new UsersUser();
          this.user.profile = res;
          console.warn(this.user);
        },
      });
    }
  }

  getUser(): void {
    this.userService
      .getUserByAccount()
      .subscribe((res: HttpResponse<IUsersUser>) => {
        this.user = res.body || {};
        if (this?.user?.profile) {
          this.updateForm(this.user.profile);
        }
      });
  }

  updateForm(profile: IProfile): void {
    this.editForm.patchValue({
      aboutMe: profile.aboutMe,
      education: profile.education,
      experience: profile.experience,
      country: profile.country,
      gender: profile.gender,
      birthday: profile.birthday ? profile.birthday?.format(DATE_FORMAT) : null,
      city: profile.city,
      uf: profile.uf,
      publicProfile: profile.publicProfile,
      publicRank: profile.publicRank,
      instagram: profile.instagram,
      lattes: profile.lattes,
      facebook: profile.facebook,
      hackerrank: profile.hackerrank,
      uri: profile.uri,
      linkedin: profile.linkedin,
      mobileNumber: profile.mobileNumber,
    });
  }

  // getProfile(): any {
  //   this.profileService.getProfile().subscribe(user-team => {
  //     this.user-team = user-team;
  //   });
  // }

  // getProfile(): void {
  //   this.profileService
  //     .getProfile()
  //     .subscribe((res: HttpResponse<IProfile>) => this.onSuccess(res.body));
  // }

  // protected onSuccess(data: IProfile | null): void {
  //   this.router.navigate["/profile"];
  //   this.profile = data || {};
  //   this.debug = this.profile;
  //   alert(this.profile.birthday);
  //   this.updateForm(this.profile);
  // }

  save(): void {
    this.isSaving = true;
    const profile = this.createFromForm();
    // this.debug = profile;
    // stop;
    if (profile.id !== undefined) {
      this.subscribeToSaveResponse(this.profileService.update(profile));
    }
  }

  private createFromForm(): IProfile {
    return {
      ...new Profile(),
      id: this.user?.profile?.id,
      aboutMe: this.editForm.get(['aboutMe']).value,
      education: this.editForm.get(['education']).value,
      experience: this.editForm.get(['experience']).value,
      country: this.editForm.get(['country']).value,
      gender: this.editForm.get(['gender']).value,
      birthday: this.editForm.get(['birthday']).value
        ? moment(this.editForm.get(['birthday']).value, DATE_TIME_FORMAT)
        : undefined,
      city: this.editForm.get(['city']).value,
      uf: this.editForm.get(['uf']).value,
      publicProfile: this.editForm.get(['publicProfile']).value,
      publicRank: this.editForm.get(['publicRank']).value,
      instagram: this.editForm.get(['instagram']).value,
      lattes: this.editForm.get(['lattes']).value,
      facebook: this.editForm.get(['facebook']).value,
      hackerrank: this.editForm.get(['hackerrank']).value,
      uri: this.editForm.get(['uri']).value,
      linkedin: this.editForm.get(['linkedin']).value,
      user: this.user?.profile?.user,
      mobileNumber: this.editForm.get(['mobileNumber']).value,
    };
  }

  protected subscribeToSaveResponse(
    result: Observable<HttpResponse<IProfile>>
  ): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  previousState(): void {
    this.toastService.success('Settings saved');
    this.getUser();
  }

  changePassword(): void {
    this.error = false;
    this.successPasswordChange = false;
    this.doNotMatch = false;

    const newPassword = this.passwordForm.get(['newPassword']).value;
    if (newPassword === this.passwordForm.get(['confirmPassword']).value) {
      this.doNotMatch = true;
    } else {
      this.passwordService
        .save(newPassword, this.passwordForm.get(['currentPassword']).value)
        .subscribe(
          () => (this.successPasswordChange = true),
          () => (this.error = true)
        );
    }
  }

  getAccount(): void {
    this.accountService.identity().subscribe((account) => {
      if (account) {this.settingsForm.patchValue({
        firstName: account.firstName,
        lastName: account.lastName,
        email: account.email,
        langKey: account.langKey,
      });

      }
    });
  }

  saveAccountSettings(): void {
    this.successAccountSettings = false;

    this.account.firstName = this.settingsForm.get('firstName').value;
    this.account.lastName = this.settingsForm.get('lastName').value;
    this.account.email = this.settingsForm.get('email').value;
    this.account.langKey = this.settingsForm.get('langKey').value;

    this.accountService.save(this.account).subscribe(() => {
      this.successAccountSettings = true;
      this.accountService.authenticate(this.account);
    });
  }

  uploadPhoto(): void {
    if (this.userPic) {
      this.profileService.imageUpload(this.userPic).subscribe({
        next: () => {
          this.toastService.success('Save successfully');
          if (this.windowRef) {
            this.windowRef.nativeWindow.location.reload();
          }
        },
      });
    }
  }

  handleFileInput(target: any): void {
    this.userPic = target.files.item(0);
    console.warn(this.userPic);
  }

  getUserSkills(): void {
    this.userService
      .getUserSkills()
      .subscribe((res: HttpResponse<IUserSkill[][]>) => {
        this.userSkills = res.body || [];
        this.userSkills = Object.keys(this.userSkills).map((key) =>
          this.userSkills ? this.userSkills[key] : []
        );
        this.convertSkillsToArray();
      });
  }

  getUserSkillsByLogin(): void {
    if (this.login) {
      this.userService
        .getUserSkillsByLogin(this.login)
        .subscribe((res: HttpResponse<IUserSkill[][]>) => {
          this.userSkills = res.body || [];
          this.userSkills = Object.keys(this.userSkills).map((key) =>
            this.userSkills ? this.userSkills[key] : []
          );
          this.convertSkillsToArray();
        });
    }
  }

  getAccountScores(): void {
    this.userService.getAccountScores().subscribe({
      next: (res: IUserScore) => {
        if (res) {
          this.userScores = res;
        }
      },
    });
  }

  convertSkillsToArray(): void {
    if (this.userSkills) {
      this.userSkillsArray = this.userSkills.reduce(
        (acc, val) => acc.concat(val),
        []
      );
      if (this.userSkillsArray && this.userSkillsArray?.length > 0) {
        for (let i = 0; i < this.userSkillsArray?.length; i++) {
          for (let j = i + 1; j < this.userSkillsArray?.length - 1; j++) {
            if (
              this.userSkillsArray[i]?.point &&
              this.userSkillsArray[j]?.point
            ) {
              if (
                this.userSkillsArray[i].point <= this.userSkillsArray[j].point
              ) {
                const aux = this.userSkillsArray[i];
                this.userSkillsArray[i] = this.userSkillsArray[j];
                this.userSkillsArray[j] = aux;
              }
            }
            this.sortUserBetterSkills();
          }
        }
      }
    }
  }

  getPercent(points?: number, maxPoint?: number, round?: boolean): number {
    if (points && maxPoint) {
      return round
        ? Math.round((points / maxPoint) * 100)
        : (points / maxPoint) * 100;
    }
    return 0;
  }

  sortUserBetterSkills(): void {
    if (this.userSkillsArray && this.userSkillsArray.length > 0) {
      for (let i = 0; i < this.userSkillsArray.length; i++) {
        for (let j = i + 1; j < this.userSkillsArray.length - 1; j++) {
          if (this.userSkillsArray[i] && this.userSkillsArray[i]?.point) {
            if (
              (this.userSkillsArray[i]?.point || 0) <
              (this.userSkillsArray[j]?.point || 0)
            ) {
              const aux = this.userSkillsArray[i]?.point;
              this.userSkillsArray[i].point = this.userSkillsArray[j]?.point;
              this.userSkillsArray[j].point = aux;
            }
          }
        }
      }
    }
  }

  preventBackButton(): void {
    // history.pushState(null, '', location.href);
    // this.locationStrategy.onPopState(() => {
    //   history.pushState(null, '', location.href);
    // });
  }
}
