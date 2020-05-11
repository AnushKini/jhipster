import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IAppUsers } from 'app/shared/model/app-users.model';
import { AppUsersService } from './app-users.service';

@Component({
    selector: 'jhi-app-users-update',
    templateUrl: './app-users-update.component.html'
})
export class AppUsersUpdateComponent implements OnInit {
    appUsers: IAppUsers;
    isSaving: boolean;

    constructor(protected appUsersService: AppUsersService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ appUsers }) => {
            this.appUsers = appUsers;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.appUsers.id !== undefined) {
            this.subscribeToSaveResponse(this.appUsersService.update(this.appUsers));
        } else {
            this.subscribeToSaveResponse(this.appUsersService.create(this.appUsers));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IAppUsers>>) {
        result.subscribe((res: HttpResponse<IAppUsers>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
