import {DOCUMENT} from '@angular/common';
import {Component, ElementRef, Inject, OnInit, Renderer2} from '@angular/core';
import {ROUTES} from '../sidebar/sidebar-items';


import {Router} from '@angular/router';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import {LANGUAGES} from "../../core/language/language.constants";
import {RouteInfo} from "../sidebar/sidebar.metadata";
import {RightSidebarService} from "../../shared/services/rightsidebar.service";
import {AccountService} from "../../core/auth/account.service";
import {LoginService} from "../../core/login/login.service";
import {SharedFunctions} from "../../shared/shared.functions";
import {Authority} from "../../shared/constants/authority.constants";
import {environment} from "../../../environments/environment";

// const document: any = window.document;

@Component({
  selector: 'wok-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  languages = LANGUAGES;
  showProfileImg = true;
  envMode?: string = undefined;
  notifications: any[] = [
    // {
    //   userImg: 'https://apiteste.mundodocodigo.com.br/storage/avatars/ava_00-m.png',
    //   userName: 'Sarah Smith',
    //   time: '14 mins ago',
    //   message: 'Please check your mail'
    // },
    // {
    //   userImg: 'https://apiteste.mundodocodigo.com.br/storage/avatars/ava_00-m.png',
    //   userName: 'Airi Satou',
    //   time: '22 mins ago',
    //   message: 'Work Completed !!!'
    // },
    // {
    //   userImg: 'https://apiteste.mundodocodigo.com.br/storage/avatars/ava_00-m.png',
    //   userName: 'John Doe',
    //   time: '3 hours ago',
    //   message: 'kindly help me for code.'
    // },
    // {
    //   userImg: 'https://apiteste.mundodocodigo.com.br/storage/avatars/ava_00-m.png',
    //   userName: 'Ashton Cox',
    //   time: '5 hours ago',
    //   message: 'Lets break for lunch...'
    // },
    // {
    //   userImg: 'https://apiteste.mundodocodigo.com.br/storage/avatars/ava_00-m.png',
    //   userName: 'Sarah Smith',
    //   time: '14 mins ago',
    //   message: 'Please check your mail'
    // },
    // {
    //   userImg: 'https://apiteste.mundodocodigo.com.br/storage/avatars/ava_00-m.png',
    //   userName: 'Airi Satou',
    //   time: '22 mins ago',
    //   message: 'Work Completed !!!'
    // },
    // {
    //   userImg: 'https://apiteste.mundodocodigo.com.br/storage/avatars/ava_00-m.png',
    //   userName: 'John Doe',
    //   time: '3 hours ago',
    //   message: 'kindly help me for code.'
    // }
  ];

  public adminMenuItems: RouteInfo[];

  constructor(
    @Inject(DOCUMENT) private document: any,
    private renderer: Renderer2,
    public elementRef: ElementRef,
    private dataService: RightSidebarService,
    public accountService: AccountService,
    // private languageService: JhiLanguageService,
    private sessionStorage: SessionStorageService,
    public loginService: LoginService,
    private router: Router,
    public sharedFunctions: SharedFunctions,
    private localStorageService: LocalStorageService
  ) {
    this.adminMenuItems = ROUTES.filter(item => item.title.indexOf('menu.menu') > 0 && item.submenu?.length);
  }

  ngOnInit(): void {
    this.envMode = environment.NODE_ENV;
    console.warn(this.envMode);
    this.setStartupStyles();
  }

  changeLanguage(languageKey: string): void {
    this.sessionStorage.store('locale', languageKey);
  }

  setStartupStyles(): void {
    // set theme on startup
    if (this.localStorageService.retrieve('theme')) {
      this.renderer.removeClass(this.document.body, 'dark');
      this.renderer.removeClass(this.document.body, 'light');
      this.renderer.addClass(this.document.body, this.localStorageService.retrieve('theme') as string);
    } else {
      this.renderer.addClass(this.document.body, 'light');
    }
    // set light sidebar menu on startup
    if (this.localStorageService.retrieve('menuOption')) {
      this.renderer.addClass(this.document.body, this.localStorageService.retrieve('menuOption') as string);
    } else {
      this.renderer.addClass(this.document.body, 'menu_light');
    }
    // set logo color on startup
    if (this.localStorageService.retrieve('choose_logoheader')) {
      this.renderer.addClass(this.document.body, this.localStorageService.retrieve('choose_logoheader') as string);
    } else {
      this.renderer.addClass(this.document.body, 'logo-white');
    }
  }

  callFullscreen(): void {
    const document = this.document;

    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }

  mobileMenuSidebarOpen(event: any, className: string): void {
    const hasClass = event.target.classList.contains(className);
    if (hasClass) {
      this.renderer.removeClass(this.document.body, className);
    } else {
      this.renderer.addClass(this.document.body, className);
    }
  }

  callSidemenuCollapse(): void {
    const hasClass = this.document.body.classList.contains('side-closed');
    if (hasClass) {
      this.renderer.removeClass(this.document.body, 'side-closed');
      this.renderer.removeClass(this.document.body, 'submenu-closed');
    } else {
      this.renderer.addClass(this.document.body, 'side-closed');
      this.renderer.addClass(this.document.body, 'submenu-closed');
    }
  }

  public toggleRightSidebar(): void {
    this.dataService.changeMsg((this.dataService.currentStatus._isScalar = !this.dataService.currentStatus._isScalar));
  }

  register(): void {
    // this.activeModal.dismiss('to state register');
    this.router.navigate(['/account/register']);
  }

  // login(): void {
  //   // this.activeModal.dismiss('to state register');
  //   this.router.navigate(['/account/login']);
  // }
  public isAdmin(): boolean {
    return this.accountService.hasAnyAuthority(Authority.ADMIN);
  }

  logout(): void {
    this.loginService.logout();
  }
}
