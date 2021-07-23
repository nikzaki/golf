import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../../_metronic/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
})
export class AsideComponent implements OnInit {
  disableAsideSelfDisplay: boolean;
  headerLogo: string;
  brandSkin: string;
  ulCSSClasses: string;
  location: Location;
  asideMenuHTMLAttributes: any = {};
  asideMenuCSSClasses: string;
  asideMenuDropdown;
  brandClasses: string;
  asideMenuScroll = 1;
  asideSelfMinimizeToggle = false;
  currentUrl: string = "/"

  constructor(private layout: LayoutService, private loc: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute)
   { }

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
    // Routing
    this.location = this.loc;

    // console.log("activated route : ", this.activatedRoute.component);
    // console.log("current route url : ", this.router.url)
  }

  ngAfterContentChecked() {
    
    // console.log("Content Check activated route : ", this.activatedRoute.url);
    // console.log("Content Check activated route parent : ", this.activatedRoute.parent);
    // console.log("Content Check current route url : ", this.router.url);
    if(this.router.url) 
      this.currentUrl = this.router.url.split(/[?#]/)[0];
    
    console.log("Current Url: ", this.currentUrl);
      // this.currentUrl = this.router.url;
    
    
    // if(this.router && this.router.getCurrentNavigation())
    //   console.log("Content Check current route extracted url : ", this.router.getCurrentNavigation().extractedUrl.fragment)
  }

  private getLogo() {
    if (this.brandSkin === 'light') {
      return './assets/media/logos/logo-dark.png';
    } else {
      return './assets/media/logos/myGolf2u.svg';
    }
  }
}
