import {DOCUMENT, isPlatformBrowser} from '@angular/common';
import {Component, ElementRef, Inject, OnInit, PLATFORM_ID, Renderer2} from '@angular/core';
import {RightSidebarService} from '../../shared/services/rightsidebar.service';
import {LocalStorageService} from "ngx-webstorage";
import {WindowRef} from "../../shared/windowRef.service";

@Component({
  selector: 'wok-right-sidebar',
  templateUrl: './right-sidebar.component.html'
})
export class RightSidebarComponent implements OnInit {
  selectedBgColor = 'white';
  maxHeight: string;
  maxWidth: string;
  showpanel = false;
  isOpenSidebar: boolean;
  isDarkSidebar = false;
  isDarTheme = false;
  isBrowser = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public elementRef: ElementRef,
    private dataService: RightSidebarService,
    private localStorageService: LocalStorageService,
    @Inject(PLATFORM_ID) platformId: object,
    private windowRef: WindowRef
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.maxHeight = '';
    this.maxWidth = '';
    this.isOpenSidebar = true;
  }
  ngOnInit(): void {
    this.dataService.currentStatus.subscribe((data: boolean) => {
      this.isOpenSidebar = data;
    });
    this.setRightSidebarWindowHeight();
    this.setRightSidebarButtonOnStartUp();
    // set header color on startup
    if (this.localStorageService.retrieve('choose_skin')) {
      this.renderer.addClass(this.document.body, this.localStorageService.retrieve('choose_skin') as string);
      this.selectedBgColor = this.localStorageService.retrieve('choose_skin_active') as string;
    } else {
      this.renderer.addClass(this.document.body, 'theme-' + this.selectedBgColor);
    }
  }
  selectTheme(e: any): void {
    this.selectedBgColor = e;
    const prevTheme = this.elementRef.nativeElement.querySelector('.right-sidebar .demo-choose-skin li.actived').getAttribute('data-theme');
    this.renderer.removeClass(this.document.body, 'theme-' + prevTheme);
    this.renderer.addClass(this.document.body, 'theme-' + this.selectedBgColor);
    this.localStorageService.store('choose_skin', 'theme-' + this.selectedBgColor);
    this.localStorageService.store('choose_skin_active', this.selectedBgColor);
  }
  lightSidebarBtnClick(): void {
    this.renderer.removeClass(this.document.body, 'menu_dark');
    this.renderer.removeClass(this.document.body, 'logo-black');
    this.renderer.addClass(this.document.body, 'menu_light');
    this.renderer.addClass(this.document.body, 'logo-white');
    const menuOption = 'menu_light';
    this.localStorageService.store('choose_logoheader', 'logo-white');
    this.localStorageService.store('menuOption', menuOption);
  }
  darkSidebarBtnClick(): void {
    this.renderer.removeClass(this.document.body, 'menu_light');
    this.renderer.removeClass(this.document.body, 'logo-white');
    this.renderer.addClass(this.document.body, 'menu_dark');
    this.renderer.addClass(this.document.body, 'logo-black');
    const menuOption = 'menu_dark';
    this.localStorageService.store('choose_logoheader', 'logo-black');
    this.localStorageService.store('menuOption', menuOption);
  }
  lightThemeBtnClick(): void {
    this.renderer.removeClass(this.document.body, 'dark');
    this.renderer.removeClass(this.document.body, 'submenu-closed');
    this.renderer.removeClass(this.document.body, 'menu_dark');
    this.renderer.removeClass(this.document.body, 'logo-black');
    if (this.localStorageService.retrieve('choose_skin')) {
      this.renderer.removeClass(this.document.body, this.localStorageService.retrieve('choose_skin') as string);
      this.renderer.addClass(this.document.body, 'theme-white');
    }

    this.renderer.addClass(this.document.body, 'light');
    this.renderer.addClass(this.document.body, 'submenu-closed');
    this.renderer.addClass(this.document.body, 'menu_light');
    this.renderer.addClass(this.document.body, 'logo-white');
    const theme = 'light';
    const menuOption = 'menu_light';
    this.selectedBgColor = 'white';
    this.isDarkSidebar = false;
    this.localStorageService.store('choose_logoheader', 'logo-white');
    this.localStorageService.store('choose_skin', 'theme-white');
    this.localStorageService.store('theme', theme);
    this.localStorageService.store('menuOption', menuOption);
  }

  darkThemeBtnClick(): void {
    this.renderer.removeClass(this.document.body, 'light');
    this.renderer.removeClass(this.document.body, 'submenu-closed');
    this.renderer.removeClass(this.document.body, 'menu_light');
    this.renderer.removeClass(this.document.body, 'logo-white');
    if (this.localStorageService.retrieve('choose_skin')) {
      this.renderer.removeClass(this.document.body, this.localStorageService.retrieve('choose_skin') as string);
      this.renderer.addClass(this.document.body, 'theme-black');
    }
    this.renderer.addClass(this.document.body, 'dark');
    this.renderer.addClass(this.document.body, 'submenu-closed');
    this.renderer.addClass(this.document.body, 'menu_dark');
    this.renderer.addClass(this.document.body, 'logo-black');
    const theme = 'dark';
    const menuOption = 'menu_dark';
    this.selectedBgColor = 'black';
    this.isDarkSidebar = true;
    this.localStorageService.store('choose_logoheader', 'logo-black');
    this.localStorageService.store('choose_skin', 'theme-black');
    this.localStorageService.store('theme', theme);
    this.localStorageService.store('menuOption', menuOption);
  }
  setRightSidebarWindowHeight(): void {
    if (this.isBrowser) {
      const height = this.windowRef.nativeWindow.innerHeight - 137;
      this.maxHeight = height + '';
      this.maxWidth = '500px';
    }
  }
  onClickedOutside(event: Event): void {
    const button = event.target as HTMLButtonElement;
    if (button.id !== 'settingBtn') {
      if (this.dataService.currentStatus._isScalar === true) {
        this.toggleRightSidebar();
      }
    }
  }
  toggleRightSidebar(): void {
    this.dataService.changeMsg((this.dataService.currentStatus._isScalar = !this.dataService.currentStatus._isScalar));
  }

  setRightSidebarButtonOnStartUp(): void {
    if (this.localStorageService.retrieve('menuOption') === 'menu_dark') {
      this.isDarkSidebar = true;
    } else if (this.localStorageService.retrieve('menuOption') === 'menu_light') {
      this.isDarkSidebar = false;
    } else {
      this.isDarkSidebar = false;
    }

    if (this.localStorageService.retrieve('theme') === 'dark') {
      this.isDarTheme = true;
    } else if (this.localStorageService.retrieve('theme') === 'light') {
      this.isDarTheme = false;
    } else {
      this.isDarTheme = false;
    }
  }
}
