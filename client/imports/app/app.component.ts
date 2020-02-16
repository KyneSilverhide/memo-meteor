import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app',
  templateUrl: 'app.html'
})
export class AppComponent implements OnInit {
  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    const safeLanguage = this.getSafeLanguage();
    this.translate.setDefaultLang('en');
    this.translate.use(safeLanguage);
  }

  getSafeLanguage(): string {
    if (this.translate.getBrowserLang() == 'fr') {
      return 'fr';
    } else {
      return 'en';
    }
  }
}
