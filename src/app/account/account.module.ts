import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';



import { PasswordStrengthBarComponent } from './password/password-strength-bar.component';
import { RegisterComponent } from './register/register.component';
import { ActivateComponent } from './activate/activate.component';
import { PasswordComponent } from './password/password.component';
import { LoginPageComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { PasswordResetInitComponent } from './password-reset/init/password-reset-init.component';
import { PasswordResetFinishComponent } from './password-reset/finish/password-reset-finish.component';
import { SettingsComponent } from './settings/settings.component';
import { accountState } from './account.route';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angularx-social-login';
import { ActivatedDialogComponent } from './activate/activated-dialog/activated-dialog.component';
import {WokSharedModule} from "../shared/shared.module";
import {WokMatSharedModule} from "../shared/shared-mat.module";
import {WokUserSharedLibsModule} from "../shared/shared-libs.module";

const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: false,
  };
};
@NgModule({
  imports: [
    CommonModule,
    WokSharedModule,
    WokUserSharedLibsModule,
    ReactiveFormsModule,
    SocialLoginModule,
    NgxMaskModule.forRoot(maskConfigFunction),
    RouterModule.forChild(accountState),
  ],
  declarations: [
    ActivateComponent,
    RegisterComponent,
    PasswordComponent,
    PasswordStrengthBarComponent,
    PasswordResetInitComponent,
    PasswordResetFinishComponent,
    SettingsComponent,
    LoginPageComponent,
    ProfileComponent,
    ActivatedDialogComponent,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '153023146681-bj3uib5r6k5dmmgp36ggec1crgdjabjb.apps.googleusercontent.com'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('1287072914999068'),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
})
export class AccountModule {}
