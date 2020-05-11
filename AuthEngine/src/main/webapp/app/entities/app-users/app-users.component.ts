import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAppUsers } from 'app/shared/model/app-users.model';
import { AccountService } from 'app/core';
import { AppUsersService } from './app-users.service';

@Component({
    selector: 'jhi-app-users',
    templateUrl: './app-users.component.html'
})
export class AppUsersComponent implements OnInit, OnDestroy {
    appUsers: IAppUsers[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected appUsersService: AppUsersService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.appUsersService
            .query()
            .pipe(
                filter((res: HttpResponse<IAppUsers[]>) => res.ok),
                map((res: HttpResponse<IAppUsers[]>) => res.body)
            )
            .subscribe(
                (res: IAppUsers[]) => {
                    this.appUsers = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAppUsers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAppUsers) {
        return item.id;
    }

    registerChangeInAppUsers() {
        this.eventSubscriber = this.eventManager.subscribe('appUsersListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
