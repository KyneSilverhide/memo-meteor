import {Injectable} from '@angular/core';
import {BehaviorSubject, interval, Observable} from "rxjs";
import {Meteor} from "meteor/meteor";
import {skipWhile, takeWhile} from "rxjs/operators";

@Injectable({
    providedIn: 'root',
})
export class MeteorUserService {

    protected authenticatedUser: BehaviorSubject<Meteor.User> = new BehaviorSubject<Meteor.User>(null);

    constructor() {
    }

    public updateUser(): void {
        this.getUserNow().subscribe(user => {
            this.authenticatedUser.next(user);
        })
    }

    public getUserNow(): Observable<Meteor.User> {
        return new Observable<Meteor.User>(subscriber => {
            const waitForUser = interval(100);
            const subscription = waitForUser.subscribe(() => {
                if(!Meteor.loggingIn()) {
                    subscription.unsubscribe();
                    subscriber.next(Meteor.user());
                    subscriber.complete();
                }
            });
        })
    }

    public clearUser(): void {
        this.authenticatedUser.next(null);
    }

    public getUserSubscription(): Observable<Meteor.User> {
        return this.authenticatedUser;
    }
}