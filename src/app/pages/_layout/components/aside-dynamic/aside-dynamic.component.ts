import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { LayoutService, DynamicAsideMenuService } from '../../../../_metronic/core';

@Component({
  selector: 'app-aside-dynamic',
  templateUrl: './aside-dynamic.component.html',
  styleUrls: ['./aside-dynamic.component.scss']
})
export class AsideDynamicComponent implements OnInit, OnDestroy {
  menuConfig: any;
  subscriptions: Subscription[] = [];

  disableAsideSelfDisplay: boolean;
  headerLogo: string;
  brandSkin: string;
  ulCSSClasses: string;
  asideMenuHTMLAttributes: any = {};
  asideMenuCSSClasses: string;
  asideMenuDropdown;
  brandClasses: string;
  asideMenuScroll = 1;
  asideSelfMinimizeToggle = false;

  currentUrl: string;

  constructor(
    private layout: LayoutService,
    private router: Router,
    private menu: DynamicAsideMenuService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    // load view settings
    this.disableAsideSelfDisplay =
      this.layout.getProp('aside.self.display') === false;
    this.brandSkin = this.layout.getProp('brand.self.theme');
    this.headerLogo = this.getLogo();
    this.ulCSSClasses = this.layout.getProp('aside_menu_nav');
    this.asideMenuCSSClasses = this.layout.getStringCSSClasses('aside_menu');
    this.asideMenuHTMLAttributes = this.layout.getHTMLAttributes('aside_menu');
    this.asideMenuDropdown = this.layout.getProp('aside.menu.dropdown') ? '1' : '0';
    this.brandClasses = this.layout.getProp('brand');
    this.asideSelfMinimizeToggle = this.layout.getProp(
      'aside.self.minimize.toggle'
    );
    this.asideMenuScroll = this.layout.getProp('aside.menu.scroll') ? 1 : 0;
    // this.asideMenuCSSClasses = `${this.asideMenuCSSClasses} ${this.asideMenuScroll === 1 ? 'scroll my-4 ps ps--active-y' : ''}`;

    // router subscription
    this.currentUrl = this.router.url.split(/[?#]/)[0];
    const routerSubscr = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentUrl = event.url;
      this.cdr.detectChanges();
    });
    this.subscriptions.push(routerSubscr);

    // menu load
    const menuSubscr = this.menu.menuConfig$.subscribe(res => {
      this.menuConfig = res;
      this.cdr.detectChanges();
    });
    this.subscriptions.push(menuSubscr);
  }

  private getLogo() {
    // if (this.brandSkin === 'light') {
    //   return './assets/media/logos/logo-dark.png';
    // } else {
    //   return './assets/media/logos/logo-light.png';
    // }
    
    if (this.brandSkin === 'light') {
      // return './assets/media/logos/logo-dark.png';
      return './assets/media/logos/myGolf2u.svg';
    } else {
      return './assets/media/logos/myGolf2u.svg';
    }
  }

  isMenuItemActive(path) {
    if (!this.currentUrl || !path) {
      return false;
    }

    if (this.currentUrl === path) {
      return true;
    }

    if (this.currentUrl.indexOf(path) > -1) {
      return true;
    }

    return false;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  isMenuShowAll() {
    return this.layout.getProp('aside.menu.showAll')
  }

  isMenuEntered(path) {
    console.log("is menu item entered : path -  ", path)
    console.log("is menu item entered : current Url -  ", this.currentUrl)
    console.log("is menu item entered : current Url indexOf-  ", this.currentUrl.indexOf(path) )

    // let _path = path;
    if(path) console.log("is menu item entered : path split  ", path.split("/",2))
    let _path;
    let _currentUrl;
    if(path) _path = path.split("/",2)[1];
    if(this.currentUrl) _currentUrl = this.currentUrl.split("/",2)[1];
    if(this.currentUrl) console.log("is menu item entered : current Url split  ", this.currentUrl.split(/[?#]/)[0] )
    // if(path) _path = path.split(/[?#]/)[0];
    if(path === '/')
      return true
    else if( path === '/dashboard')
      return true
    else if (path === '/builder')
      return true
    // else return this.currentUrl.indexOf(_path)
    else return _currentUrl === _path
  }
}
