import {DOCUMENT, isPlatformBrowser} from '@angular/common';
import {Component, ElementRef, HostListener, Inject, OnInit, PLATFORM_ID, Renderer2} from '@angular/core';
import {ROUTES} from './sidebar-items';
import {AccountService} from "../../core/auth/account.service";
import {LoginService} from "../../core/login/login.service";
import {SharedFunctions} from "../../shared/shared.functions";
import {WindowRef} from "../../shared/windowRef.service";
import {VERSION} from "../../app.constants";


@Component({
  selector: 'wok-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  public sidebarItems: any[];
  showMenu = '';
  showSubMenu = '';
  public innerHeight: any;
  public bodyTag: any;
  listMaxHeight: string;
  listMaxWidth: string;
  headerHeight = 60;
  version: string;
  showProfileImg = true;
  isBrowser = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public elementRef: ElementRef,
    public accountService: AccountService,
    public loginService: LoginService,
    public sharedFunctions: SharedFunctions,
    private windowRef: WindowRef,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.sidebarItems = ROUTES.filter((sidebarItem) => sidebarItem);
    this.listMaxHeight = '';
    this.listMaxWidth = '';
    this.version = VERSION
      ? VERSION.toLowerCase().startsWith('v')
        ? VERSION
        : 'v' + VERSION
      : '';
  }

  /* eslint-disable */
  @HostListener('window:resize', ['$event'])
  windowResizecall(event: any): void {
    this.setMenuHeight();
    this.checkStatuForResize({firstTime: false});
  }

  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: any): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.renderer.removeClass(this.document.body, 'overlay-open');
    }
  }

  callMenuToggle(event: any, element: any, submenu?: number): void {
    if (!submenu || submenu === 0) {
      this.renderer.removeClass(this.document.body, 'overlay-open');
    }
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
    const hasClass = event.target.classList.contains('toggled');
    if (hasClass) {
      this.renderer.removeClass(event.target, 'toggled');
    } else {
      this.renderer.addClass(event.target, 'toggled');
    }
  }

  callSubMenuToggle(element: any): void {
    this.renderer.removeClass(this.document.body, 'overlay-open');
    if (element === this.showSubMenu) {
      this.showSubMenu = '0';
    } else {
      this.showSubMenu = element;
    }
  }

  ngOnInit(): void {
    this.sidebarItems = ROUTES.filter((sidebarItem) => sidebarItem);
    this.initLeftSidebar();
    this.bodyTag = this.document.body;
  }

  initLeftSidebar(): void {
    // const _this = this;
    // Set menu height
    this.setMenuHeight();
    this.checkStatuForResize({firstTime: true});
    // Set Waves
    // Waves.attach('.menu .list a', ['waves-block']);
    // Waves.init();
  }

  setMenuHeight(): void {
    if (this.isBrowser) {
      this.innerHeight = this.windowRef.nativeWindow.innerHeight;
      const height = this.innerHeight - this.headerHeight;
      this.listMaxHeight = height + '';
      this.listMaxWidth = '500px';
    }
  }

  isOpen(): any {
    return this.bodyTag.classList.contains('overlay-open');
  }

  checkStatuForResize(firstTime: any): void {
    if (this.isBrowser) {
      if (this.windowRef.nativeWindow.innerWidth < 1170) {
        this.renderer.addClass(this.document.body, 'ls-closed');
      } else {
        this.renderer.removeClass(this.document.body, 'ls-closed');
      }
    }
  }

  mouseHover(e: any): void {
    const body = this.elementRef.nativeElement.closest('body');
    if (body.classList.contains('submenu-closed')) {
      this.renderer.addClass(this.document.body, 'side-closed-hover');
      this.renderer.removeClass(this.document.body, 'submenu-closed');
    }
  }

  mouseOut(e: any): void {
    const body = this.elementRef.nativeElement.closest('body');
    if (body.classList.contains('side-closed-hover')) {
      this.renderer.removeClass(this.document.body, 'side-closed-hover');
      this.renderer.addClass(this.document.body, 'submenu-closed');
    }
  }

  logout(): void {
    this.loginService.logout();
  }
}
