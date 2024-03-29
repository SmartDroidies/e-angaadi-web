import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs';

declare const gtag: (config: string, gid: string, path: { page_path: string }) => void;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'E-Angaadi';

  constructor(translate: TranslateService, private router: Router) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('ta');
  }

  ngOnInit(): void {
    this.setUpAnalytics();
  }

  setUpAnalytics() {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        gtag('config', 'G-775VE7JS7V', { page_path: event.urlAfterRedirects });
      });
  }
}
