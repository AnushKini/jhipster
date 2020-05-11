import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IAppUsers } from 'app/shared/model/app-users.model';
import { AppUsersService } from './app-users.service';
import { IRole } from 'app/shared/model/role.model';
import { RoleService } from 'app/entities/role';

@Component({
    selector: 'jhi-app-users-update',
    templateUrl: './app-users-update.component.html'
})
export class AppUsersUpdateComponent implements OnInit {
    appUsers: IAppUsers;
    isSaving: boolean;

    roles: IRole[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected appUsersService: AppUsersService,
        protected roleService: RoleService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ appUsers }) => {
            this.appUsers = appUsers;
        });
        this.roleService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IRole[]>) => mayBeOk.ok),
                map((response: HttpResponse<IRole[]>) => response.body)
            )
            .subscribe((res: IRole[]) => (this.roles = res), (res: HttpErrorResponse) => this.onError(res.message));
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

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackRoleById(index: number, item: IRole) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}
