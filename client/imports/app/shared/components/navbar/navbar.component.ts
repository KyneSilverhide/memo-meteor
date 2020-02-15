import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { Meteor } from 'meteor/meteor';
import { Router } from '@angular/router';
import { Accounts } from 'meteor/accounts-base';
import { faFolder, faSignOutAlt, faTasks } from '@fortawesome/free-solid-svg-icons';
import { MeteorUserService } from '../../services/meteor-user.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'navbar-component',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {
  user: Meteor.User;
  navbarOpen = false;
  currLanguage: string;

  signOutIcon = faSignOutAlt;
  folderIcon = faFolder;
  taskIcon = faTasks;
  supportedLanguages = ['fr', 'en'];

  constructor(
    private meteorUserService: MeteorUserService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private zone: NgZone,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.currLanguage = this.translate.currentLang;
    this.meteorUserService.updateUser();
    this.meteorUserService.getUserSubscription().subscribe(user => {
      this.user = user;
      this.cd.detectChanges();
    });
  }

  toggleNavbar(): void {
    this.navbarOpen = !this.navbarOpen;
    this.cd.detectChanges();
  }

  logout(): void {
    Accounts.logout(() => {
      this.meteorUserService.clearUser();
      this.zone.run(() => {
        this.router.navigate(['login']);
      });
    });
  }

  useLanguage(lang: string): void {
    this.currLanguage = lang;
    this.translate.use(lang);
  }
}
