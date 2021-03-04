import {Component, Inject, OnInit, PLATFORM_ID, Renderer2, RendererFactory2} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRouteSnapshot, Event, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {AccountService} from '../../core/auth/account.service';
import {isPlatformBrowser} from "@angular/common";
import {WindowRef} from "../../shared/windowRef.service";

@Component({
  selector: 'wok-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {
  private renderer: Renderer2;
  currentUrl: string;
  showLoadingIndicatior = true;
  isBrowser = false;
  constructor(
    private accountService: AccountService,
    private titleService: Title,
    private router: Router,
    private translateService: TranslateService,
    rootRenderer: RendererFactory2,
    private windowRef: WindowRef,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      this.renderer = rootRenderer.createRenderer(document.querySelector('html'), null);
    }
    this.currentUrl = '';

    this.router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.showLoadingIndicatior = true;
        // location.onPopState(() => {
        //  window.location.reload();
        // });
        this.currentUrl = routerEvent.url.substring(routerEvent.url.lastIndexOf('/') + 1);
      }
      if (routerEvent instanceof NavigationEnd) {
        this.showLoadingIndicatior = false;
      }
      if (this.isBrowser) {
        windowRef.nativeWindow.scrollTo(0, 0);
      }
    });
  }

  ngOnInit(): void {
    // try to log in automatically
    this.accountService.identity().subscribe();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateTitle();
      }
      if (event instanceof NavigationError && event.error.status === 404) {
        this.router.navigate(['/404']);
      }
    });

    this.translateService.onLangChange.subscribe((langChangeEvent: LangChangeEvent) => {
      this.updateTitle();
      if (this.isBrowser) {
        this.renderer.setAttribute(document.querySelector('html'), 'lang', langChangeEvent.lang);
      }
    });
  }

  private getPageTitle(routeSnapshot: ActivatedRouteSnapshot): string {
    let title: string = routeSnapshot.data && routeSnapshot.data.pageTitle ? routeSnapshot.data.pageTitle : '';
    if (routeSnapshot.firstChild) {
      title = this.getPageTitle(routeSnapshot.firstChild) || title;
    }
    return title;
  }

  private updateTitle(): void {
    let pageTitle = this.getPageTitle(this.router.routerState.snapshot.root);
    if (!pageTitle) {
      pageTitle = 'global.title';
    }
    this.translateService.get(pageTitle).subscribe(title => this.titleService.setTitle(title));
  }
}
