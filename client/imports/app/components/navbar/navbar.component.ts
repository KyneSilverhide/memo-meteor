import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Meteor} from 'meteor/meteor';
import {MeteorUserService} from "../../shared/services/meteor-user.service";
import {Router} from "@angular/router";
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faTasks } from '@fortawesome/free-solid-svg-icons';
import { faFolder } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'navbar-component',
    templateUrl: 'navbar.component.html',
    styleUrls: ['navbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {

    user: Meteor.User;
    navbarOpen = false;
    signOutIcon = faSignOutAlt;
    folderIcon = faFolder;
    taskIcon = faTasks;

    constructor(private meteorUserService: MeteorUserService, private router: Router, private cd: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.meteorUserService.updateUser();
        this.meteorUserService.getUserSubscription().subscribe(user => {
            this.user = user;
            this.cd.detectChanges();
        });
    }

    toggleNavbar() {
        this.navbarOpen = !this.navbarOpen;
        this.cd.detectChanges();
    }

    logout() {
        Accounts.logout(() => {
            this.meteorUserService.clearUser();
            this.router.navigate(['login']);
        });
    }
}
