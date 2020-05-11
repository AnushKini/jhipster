import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAppUsers } from 'app/shared/model/app-users.model';

@Component({
    selector: 'jhi-app-users-detail',
    templateUrl: './app-users-detail.component.html'
})
export class AppUsersDetailComponent implements OnInit {
    appUsers: IAppUsers;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ appUsers }) => {
            this.appUsers = appUsers;
        });
    }

    previousState() {
        window.history.back();
    }
}
